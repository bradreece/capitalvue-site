/**
 * POST /.netlify/functions/evalneg-backup
 *
 * Backup alert for Evaluate and Negotiate leads. Emails the TEAM ONLY a plain
 * copy of what the visitor typed, including the email address exactly as typed.
 *
 * Why it exists: HubSpot accepts a Forms API submission and silently discards an
 * email address it dislikes, which leaves a submission with no contact and no
 * email anywhere. This copy means the address as typed is never lost.
 *
 * It is separate from submit.mjs on purpose. submit.mjs is the Snapshot's lead
 * path and is hardened; do not edit it for this. This function never emails the
 * visitor and never writes to HubSpot (the page does that, once). The only
 * recipient is MAIL_TO_INTERNAL, fixed server-side, so it cannot be used as a
 * relay to arbitrary addresses.
 *
 * .mjs, not .js: package.json has no "type":"module".
 *
 * Env vars (already set for submit.mjs): RESEND_API_KEY, MAIL_FROM,
 * MAIL_TO_INTERNAL, optional ALLOWED_ORIGIN.
 *
 * Origin allowlist matches submit.mjs, so it works on www.capitalvue.com.au and
 * is refused on Netlify preview URLs. Test it on the live site.
 *
 * GET /.netlify/functions/evalneg-backup -> {ok, fn, version, build, hardening}
 */
const VERSION = "1.0.0";
const BUILD = "2026-10-06";
const HARDENING = ["origin-allowlist", "honeypot", "field-length-caps", "fixed-recipient", "best-effort-throttle"];

const DEFAULT_ORIGINS = ["https://www.capitalvue.com.au", "https://capitalvue.com.au"];
const MAX_BODY = 4096;
const MAX = {
  stage: 12, firstName: 80, email: 254, mobileTyped: 40, mobile: 24,
  timeframe: 40, budget: 40, shortlist: 60, areas: 200, pageUrl: 500,
};

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

/* Single line, trimmed, hard-capped. Truncate rather than reject: this is a
   backup, so losing a lead to a strict check would defeat its purpose. */
const clean = (v, max) => String(v ?? "").replace(/[\r\n\t]+/g, " ").trim().slice(0, max);

/* Best-effort throttle per warm instance. Netlify's platform rate limit is not
   enforcing on this plan, so this stops casual flooding of the team inbox. It is
   not a security boundary: instances reset and the Origin header can be forged. */
const hits = new Map();
const WINDOW_MS = 60000;
const LIMIT = 10;
function throttled(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 500) for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k);
  return arr.length > LIMIT;
}

async function sendEmail({ to, subject, html, replyTo }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) throw new Error("Email not configured (RESEND_API_KEY / MAIL_FROM)");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
  return res.json();
}

const looksReplyable = (v) => /^[^\s@,;<>()"]+@[^\s@,;<>()"]+\.[^\s@,;<>()"]{2,}$/.test(v);

function bodyHtml(d) {
  const row = (k, v) =>
    `<tr><td style="padding:5px 14px 5px 0;color:#898781;white-space:nowrap;vertical-align:top;">${esc(k)}</td><td style="padding:5px 0;"><b>${esc(v || "—")}</b></td></tr>`;
  const detailsOnly = d.stage === "details";
  return `<div style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;color:#0b0b0b;line-height:1.5;">
    <h2 style="margin:0 0 4px;">${detailsOnly ? "Evaluate lead: extra details" : "New Evaluate lead"}: ${esc(d.firstName || "(no name)")}</h2>
    <div style="color:#898781;margin-bottom:16px;">Backup copy of what was typed. Email is shown exactly as entered.</div>
    <table cellpadding="0" cellspacing="0">
      ${row("Email as typed", d.email)}
      ${row("Mobile as typed", d.mobileTyped)}
      ${row("Mobile sent to HubSpot", d.mobile)}
      ${row("Timeframe", d.timeframe)}
      ${detailsOnly ? row("Budget range", d.budget) : ""}
      ${detailsOnly ? row("Shortlist status", d.shortlist) : ""}
      ${detailsOnly ? row("Areas", d.areas) : ""}
      ${row("Consent ticked", "yes")}
      ${row("Page", d.pageUrl)}
    </table>
    <p style="color:#898781;font-size:12px;margin-top:18px;">The CRM record is created by the page's HubSpot form (Evaluate and Negotiate enquiry (API)). If there is no contact for this person in HubSpot, find the submission in that form's Submissions list: HubSpot drops an email it rejects, and this copy still has it.</p>
  </div>`;
}

export default async (req) => {
  const allowed = process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : DEFAULT_ORIGINS;
  const reqOrigin = req.headers.get("origin") || "";
  const headers = {
    "Content-Type": "application/json",
    ...(allowed.includes(reqOrigin) ? { "Access-Control-Allow-Origin": reqOrigin } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
  const out = (status, obj) => new Response(JSON.stringify({ ...obj, version: VERSION }), { status, headers });

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (req.method === "GET")
    return new Response(JSON.stringify({ ok: true, fn: "evalneg-backup", version: VERSION, build: BUILD, hardening: HARDENING }), { status: 200, headers });
  if (req.method !== "POST") return out(405, { error: "Method not allowed" });

  if (reqOrigin && !allowed.includes(reqOrigin)) {
    console.warn("[evalneg-backup] rejected origin", reqOrigin);
    return out(403, { error: "Forbidden" });
  }

  const ip = req.headers.get("x-nf-client-connection-ip") || req.headers.get("x-forwarded-for") || "unknown";
  if (throttled(ip)) return out(429, { error: "Too many requests" });

  let raw;
  try { raw = await req.text(); } catch { return out(400, { error: "Invalid body" }); }
  if (raw.length > MAX_BODY) return out(413, { error: "Too large" });
  let p;
  try { p = JSON.parse(raw); } catch { return out(400, { error: "Invalid JSON" }); }
  if (!p || typeof p !== "object") return out(400, { error: "Invalid JSON" });

  // Honeypot: the page ships a hidden field that a real visitor never fills.
  if (p.website) {
    console.warn("[evalneg-backup] honeypot tripped");
    return out(200, { ok: true });
  }
  if (p.consent !== true) return out(400, { error: "Consent required" });

  const d = {};
  for (const k of Object.keys(MAX)) d[k] = clean(p[k], MAX[k]);
  if (!d.firstName && !d.email && !d.mobileTyped && !d.mobile) return out(400, { error: "Nothing to record" });
  if (d.stage !== "details") d.stage = "step2";

  const internalTo = process.env.MAIL_TO_INTERNAL;
  if (!internalTo) {
    console.error("[evalneg-backup] MAIL_TO_INTERNAL not set");
    return out(500, { ok: false });
  }
  const who = d.firstName || "(no name)";
  const subject =
    d.stage === "details"
      ? `Evaluate lead details: ${who}`
      : `Evaluate lead: ${who}${d.timeframe ? " (" + d.timeframe + ")" : ""}`;

  try {
    await sendEmail({
      to: internalTo,
      subject,
      html: bodyHtml(d),
      replyTo: looksReplyable(d.email) ? d.email : undefined,
    });
  } catch (e) {
    console.error("[evalneg-backup] send failed", String(e).slice(0, 300));
    return out(502, { ok: false });
  }
  return out(200, { ok: true });
};
