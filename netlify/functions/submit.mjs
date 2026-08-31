/**
 * POST /.netlify/functions/submit
 *
 * Emails the lead their readiness snapshot, and the team an internal alert.
 *
 * Deliberately does NOT write to HubSpot. CRM capture happens on the page via
 * the existing HubSpot Forms API submission. A second write path here would
 * create duplicate contacts from two sources of truth. Do not re-add it, and
 * do not add a HUBSPOT_TOKEN env var: it would do nothing and imply otherwise.
 *
 * The two emails carry different content by design. The lead's copy contains
 * the archetype, the illustrative-only projection and the disclaimers. It must
 * NEVER contain the investing-experience tag or any cross-asset commentary.
 * The internal alert may, because it is not client-facing.
 *
 * .mjs, not .js: package.json has no "type":"module", so ESM in a .js file
 * would fail to parse.
 *
 * Env vars (Netlify -> Site settings -> Environment variables):
 *   RESEND_API_KEY     Resend API key
 *   MAIL_FROM          "CapitalVue <noreply@capitalvue.com.au>" (verified domain)
 *   MAIL_TO_INTERNAL   where lead alerts go, e.g. info@capitalvue.com.au
 *   BRAND_NAME         "CapitalVue"
 *   BRAND_PRIVACY_URL  privacy policy URL for the email footer
 *   ALLOWED_ORIGIN     optional override; defaults to the capitalvue.com.au origins
 */

/* Versioned so you can prove what is actually deployed:
     GET /.netlify/functions/submit  ->  {ok, version, build, basedOn, hardening}
   1.2.0 = 1.1.0 plus a platform rate limit. 1.1.0 = upstream 1.0.0 plus the
   origin allowlist, honeypot and length caps.
   Upstream 1.0.0 accepts any POST and emails any address in the body, which
   makes it an open relay on a verified sending domain. Do not "upgrade" back
   to a build without these three controls. */
const VERSION = "1.2.0";
const BUILD = "2026-08-10";
const BASED_ON = "1.0.0";
const HARDENING = ["origin-allowlist", "honeypot", "field-length-caps"];
/* Configured but NOT enforcing. Netlify rate limiting was set up two ways on
   2026-08-10 (config.rateLimit on this function, and a rate_limit block on the
   /api/snapshot-submit redirect in netlify.toml). Both were tested with 16
   rapid POSTs from one IP and produced zero 429s, so the feature is not active
   on this site's plan. The config is left in place so it starts working if the
   plan changes. Do not list it as active until a burst test returns 429. */
const PENDING = ["rate-limit (configured, not enforcing on this plan)"];

const RATE = 0.05;
const YEARS = 10;

/* Origins permitted to trigger a send. This endpoint emails an arbitrary
   address supplied in the request body, so without a gate it is an open relay
   that would burn the sending domain's reputation. Browsers send Origin on
   POST even same-origin, so this costs nothing legitimate. */
const DEFAULT_ORIGINS = [
  "https://www.capitalvue.com.au",
  "https://capitalvue.com.au",
];

const MAX = { firstName: 80, email: 254, mobile: 24 };

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

const money = (n) => "$" + Math.round(n).toLocaleString("en-AU");
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
const isAuMobile = (v) =>
  /^(?:\+?61|0)4\d{8}$/.test(String(v || "").replace(/[\s()-]/g, ""));

/* Archetype copy is held server-side so the emailed copy cannot drift from
   what the page displayed. Mirrors ARCHETYPES in the funnel. */
const ARCHETYPES = {
  ready_mover: {
    name: "Ready Mover",
    tagline: "You're set up to move, and timing is your main question.",
    reflection:
      "From what you told us, your position is largely sorted and you're looking to act in the near term. People at this stage are usually less worried about whether they can buy, and more focused on buying well.",
  },
  growth_investor: {
    name: "Growth-Focused Investor",
    tagline: "You're building for the long term and thinking in years, not months.",
    reflection:
      "You told us your focus is long-term growth through property rather than a quick result. People with this mindset tend to care most about buying assets that hold and build value over time.",
  },
  foundation_builder: {
    name: "Foundation Builder",
    tagline: "You're getting the groundwork in place for your first move.",
    reflection:
      "You told us you're earlier in the journey and building toward your first purchase. Most people at this stage benefit most from clarity about what's realistic and what the path looks like.",
  },
  strategic_upgrader: {
    name: "Strategic Upgrader",
    tagline: "You have a base already, and you're planning your next step up.",
    reflection:
      "You told us you already own and you're thinking about your next move. People in this position often weigh up timing and how to make the next purchase a genuine improvement.",
  },
  portfolio_expander: {
    name: "Portfolio Expander",
    tagline: "You already hold property and you're looking to keep building.",
    reflection:
      "You told us you hold one or more properties and want to keep growing. Experienced investors at this stage usually focus on where the next opportunity is.",
  },
};

function leadEmailHtml({ firstName, archetype, brand, privacyUrl }) {
  const a = ARCHETYPES[archetype] || ARCHETYPES.foundation_builder;
  const start = 1000000;
  const end = start * Math.pow(1 + RATE, YEARS);

  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f9f9f7;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9f9f7;padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;padding:32px;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0b0b0b;line-height:1.55;">
  <tr><td style="font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#898781;padding-bottom:12px;">Your Property Readiness Snapshot</td></tr>
  <tr><td style="font-size:15px;color:#52514e;padding-bottom:4px;">Hi ${esc(firstName) || "there"}, based on your answers you look like a</td></tr>
  <tr><td style="font-size:28px;font-weight:700;letter-spacing:-0.01em;padding-bottom:8px;">${esc(a.name)}</td></tr>
  <tr><td style="font-size:17px;color:#52514e;padding-bottom:22px;">${esc(a.tagline)}</td></tr>
  <tr><td style="background:#fcfcfb;border:1px solid rgba(11,11,11,0.10);border-radius:12px;padding:20px;">
    <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#898781;padding-bottom:10px;font-weight:600;">What you told us</div>
    <div style="font-size:15px;">${esc(a.reflection)}</div>
  </td></tr>
  <tr><td style="height:16px;"></td></tr>
  <tr><td style="background:#fcfcfb;border:1px solid rgba(11,11,11,0.10);border-radius:12px;padding:20px;">
    <div style="font-size:16px;font-weight:700;padding-bottom:4px;">A general illustration</div>
    <div style="font-size:13px;color:#898781;padding-bottom:12px;">Fixed assumption of 5% growth per year. Not based on your answers.</div>
    <div style="font-size:15px;">A property valued at ${money(start)} today would be worth <b>${money(end)}</b> in ${YEARS} years at a fixed 5% per year.</div>
    <div style="margin-top:14px;background:#fff8ec;border-left:4px solid #eda100;border-radius:8px;padding:11px 14px;font-size:13px;color:#52514e;">
      <b style="color:#0b0b0b;">Illustration only.</b> This is a general mathematical example. It is not a forecast, not a valuation, and not based on your circumstances. Property values can fall as well as rise.
    </div>
  </td></tr>
  <tr><td style="height:26px;"></td></tr>
  <tr><td style="font-size:15px;">If you'd like to talk it through, just reply to this email and we'll find a time.</td></tr>
  <tr><td style="padding-top:26px;border-top:1px solid rgba(11,11,11,0.10);">
    <div style="font-size:11px;line-height:1.6;color:#898781;padding-top:16px;">
      <b>General information only.</b> This email provides general information about residential property and does not take into account your objectives, financial situation or needs. It is not financial product advice, credit assistance, or a recommendation to buy, sell or finance any property or financial product. Consider seeking advice suited to your circumstances before making any decision.
      <br><br>
      ${esc(brand)} Pty Ltd is a licensed buyers agency (QLD 4769773, SA 335016). You received this because you requested a property readiness snapshot from ${esc(brand)}.${privacyUrl ? ` <a href="${esc(privacyUrl)}" style="color:#14548c;">Privacy Policy</a>.` : ""}
    </div>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function internalEmailHtml(payload) {
  const { contact = {}, answers = {}, archetype, readiness = {}, source, viaBeacon } = payload;
  const row = (k, v) =>
    `<tr><td style="padding:5px 14px 5px 0;color:#898781;white-space:nowrap;">${esc(k)}</td><td style="padding:5px 0;"><b>${esc(v ?? "—")}</b></td></tr>`;
  const assets = Array.isArray(answers.assets) ? answers.assets.join(", ") : answers.assets;

  return `<div style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;color:#0b0b0b;line-height:1.5;">
    <h2 style="margin:0 0 4px;">New lead: ${esc(contact.firstName)}</h2>
    <div style="color:#898781;margin-bottom:16px;">
      ${esc(ARCHETYPES[archetype]?.name || archetype || "—")}
      ${viaBeacon ? '<span style="color:#d03b3b;"> · recovered via beacon (tab closed early)</span>' : ""}
    </div>
    <table cellpadding="0" cellspacing="0">
      ${row("Email", contact.email)}
      ${row("Mobile", contact.mobile)}
      ${row("Purpose", answers.purpose)}
      ${row("Timeframe", answers.timeframe)}
      ${row("Position", answers.position)}
      ${row("Existing IPs", answers.existingIPs)}
      ${row("Deposit/equity", answers.readiness)}
      ${row("Finance", answers.finance)}
      ${row("Invested in", assets)}
      ${row("Experience tag", readiness.tag)}
      ${row("Consent given", payload.consent ? "yes" : "NO")}
      ${row("Source", source)}
    </table>
    <p style="color:#898781;font-size:12px;margin-top:18px;">CRM record is captured separately by the HubSpot form on the page. This alert is email only.</p>
  </div>`;
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

export default async (req) => {
  const allowed = process.env.ALLOWED_ORIGIN
    ? [process.env.ALLOWED_ORIGIN]
    : DEFAULT_ORIGINS;
  const reqOrigin = req.headers.get("origin") || "";
  const headers = {
    "Content-Type": "application/json",
    ...(allowed.includes(reqOrigin) ? { "Access-Control-Allow-Origin": reqOrigin } : {}),
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers });
  // GET is a health check: confirms which build is actually deployed.
  // `hardening` stays public because its absence is how a silent downgrade to an
  // older, unhardened build gets caught. `pending` does NOT go in the response:
  // naming the control that is missing tells an unauthenticated caller exactly
  // where to push. It goes to the function log, where the operator reads it.
  if (req.method === "GET") {
    if (PENDING.length) console.info("[submit] pending controls:", PENDING.join("; "));
    return new Response(
      JSON.stringify({ ok: true, version: VERSION, build: BUILD, basedOn: BASED_ON, hardening: HARDENING }),
      { status: 200, headers }
    );
  }
  if (req.method !== "POST")
    return new Response(JSON.stringify({ error: "Method not allowed", version: VERSION }), { status: 405, headers });

  // Origin gate. Not a security boundary (a script can forge the header) but it
  // stops drive-by bots turning this into a free mailer on a verified domain.
  if (reqOrigin && !allowed.includes(reqOrigin)) {
    console.warn("[submit] rejected origin", reqOrigin);
    return new Response(JSON.stringify({ error: "Forbidden", version: VERSION }), { status: 403, headers });
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON", version: VERSION }), { status: 400, headers });
  }

  // Honeypot. The page ships a hidden field; a real user never fills it.
  if (payload.cv_hp2) {
    console.warn("[submit] honeypot tripped");
    return new Response(JSON.stringify({ ok: true, version: VERSION }), { status: 200, headers });
  }

  const contact = payload.contact || {};

  // Validate server-side. Never trust the client's own checks.
  if (
    !contact.firstName ||
    String(contact.firstName).length > MAX.firstName ||
    !isEmail(contact.email) ||
    String(contact.email).length > MAX.email ||
    !isAuMobile(contact.mobile) ||
    String(contact.mobile).length > MAX.mobile
  ) {
    return new Response(JSON.stringify({ error: "Invalid contact details", version: VERSION }), { status: 400, headers });
  }
  // No consent, no contact. Hard stop.
  if (payload.consent !== true) {
    return new Response(JSON.stringify({ error: "Consent required", version: VERSION }), { status: 400, headers });
  }

  const brand = process.env.BRAND_NAME || "CapitalVue";
  const privacyUrl = process.env.BRAND_PRIVACY_URL || "";
  const internalTo = process.env.MAIL_TO_INTERNAL;

  // Run independently. One failing must not lose the other.
  const results = await Promise.allSettled([
    sendEmail({
      to: contact.email,
      subject: `${contact.firstName}, your property readiness snapshot`,
      html: leadEmailHtml({ firstName: contact.firstName, archetype: payload.archetype, brand, privacyUrl }),
      replyTo: internalTo,
    }),
    internalTo
      ? sendEmail({
          to: internalTo,
          subject: `New lead: ${contact.firstName} (${ARCHETYPES[payload.archetype]?.name || "unknown"})`,
          html: internalEmailHtml(payload),
          replyTo: contact.email,
        })
      : Promise.resolve({ skipped: true }),
  ]);

  const [leadMail] = results;
  const failures = results
    .map((r, i) => (r.status === "rejected" ? ["leadEmail", "teamEmail"][i] : null))
    .filter(Boolean);

  if (failures.length) console.error("[submit] partial failure", failures, results);

  // The lead's copy is what the page promised. If that failed, report failure so
  // the page shows its retry path. Team failures are logged, not surfaced.
  if (leadMail.status === "rejected") {
    return new Response(JSON.stringify({ ok: false, failed: failures, version: VERSION }), { status: 502, headers });
  }
  return new Response(JSON.stringify({ ok: true, degraded: failures, version: VERSION }), { status: 200, headers });
};

/* Netlify platform rate limit. Enforced at the edge before this function runs,
   aggregated on the real client IP, so it needs no state of our own and cannot
   be bypassed by forging an Origin header. Available on all Netlify plans.
   Deliberately no `path` key here: setting one would change the function URL.
   10/min is generous for a human (one submit, plus retries) and useless to a
   spammer. Exceeding it returns 429. */
export const config = {
  rateLimit: {
    windowLimit: 10,
    windowSize: 60,
    aggregateBy: ["ip"],
  },
};
