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
 * the archetype, their answers, the peer statistics and the disclaimers. It
 * carries no fee, no service description, no pitch and no projection. The
 * internal alert carries the raw answers, because it is not client-facing.
 *
 * .mjs, not .js: package.json has no "type":"module", so ESM in a .js file
 * would fail to parse.
 *
 * Env vars (Netlify -> Site settings -> Environment variables):
 *   RESEND_API_KEY     Resend API key
 *   MAIL_FROM          "CapitalVue <noreply@capitalvue.com.au>" (verified domain)
 *   MAIL_TO_INTERNAL   where lead alerts go, e.g. info@capitalvue.com.au
 *   MAIL_REPLY_TO      optional; defaults to brad@capitalvue.com.au (reply-to and unsubscribe)
 *   MAIL_BCC           optional; defaults to brad@capitalvue.com.au (copy of every lead email)
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
const VERSION = "1.3.1";
const BUILD = "2026-10-21";
const BASED_ON = "1.0.0";
const HARDENING = ["origin-allowlist", "honeypot", "field-length-caps"];
/* Configured but NOT enforcing. Netlify rate limiting was set up two ways on
   2026-08-10 (config.rateLimit on this function, and a rate_limit block on the
   /api/snapshot-submit redirect in netlify.toml). Both were tested with 16
   rapid POSTs from one IP and produced zero 429s, so the feature is not active
   on this site's plan. The config is left in place so it starts working if the
   plan changes. Do not list it as active until a burst test returns 429. */
const PENDING = ["rate-limit (configured, not enforcing on this plan)"];

/* 1.3.0 (spec "Snapshot Email - Function Spec - 21 Oct 2026"): four archetypes
   (ready_mover removed, "Ready to move" is derived), answers block, peer stats
   keyed on purpose, archetype link, Brad's closing, "Book a time" button, BCC
   copy to Brad, plain-text part, Spam Act footer. No illustration, no fee, no
   service description in the lead's copy.
   1.3.1: reflection branches on answers.missed (searching vs starting). */

const SITE = "https://www.capitalvue.com.au/";
const ABN = "56 671 085 028";
const LICENCES = "QLD 4769773 · SA 335016";
const DEFAULT_PERSON = "brad@capitalvue.com.au";

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

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
const isAuMobile = (v) =>
  /^(?:\+?61|0)4\d{8}$/.test(String(v || "").replace(/[\s()-]/g, ""));

/* Archetype copy is held server-side so the emailed copy cannot drift from
   what the page displayed. Mirrors ARCHETYPES in content/readiness-funnel.src.html.
   Change both together. */
const ARCHETYPES = {
  strategic_upgrader: {
    name: "Strategic Upgrader",
    tagline: "You already own, and the next one has to be a step up, not a sideways move.",
    reflection_searching:
      "You told us you own and you're planning your next home. People in this position usually aren't short on effort. They've been to the inspections, they've watched a few go for more than they expected, and the question has shifted from \"can we buy\" to \"how do we stop losing the ones we want\".",
    reflection_starting:
      "You told us you own and you're thinking about the next home, without having started the search in earnest. That is the right order. The people who get hurt in an upgrade are the ones who fall for a house before they've worked out the sale, the borrowing and what they'd actually pay for it. You haven't done that yet, which means the sequencing is still yours to set.",
    next:
      "You'll want the sale and the purchase sequenced before you fall for anything, a clear read on what a place is worth from the sales evidence before you offer, and a plan for the one that matters so it isn't decided on the day.",
  },
  foundation_builder: {
    name: "Foundation Builder",
    tagline: "You're getting the groundwork in place for your first home.",
    reflection_searching:
      "You told us you're renting, working toward your first home, and you've already lost one or more. That is more common than it feels, and it is rarely about the offer. First-home buyers tend to lose on timing and on not knowing what a place is worth before the open home, and both of those are fixable before the next one.",
    reflection_starting:
      "You told us you're renting and working toward your first purchase. Most people at this stage benefit most from clarity: what's realistic, what to sort first, and what the path actually looks like from here to keys.",
    next:
      "You'll want finance taken to pre-approval rather than a conversation, the areas that fit your budget settled, and a way of knowing what a place is worth before you walk into the open home.",
  },
  growth_investor: {
    name: "Growth-Focused Investor",
    tagline: "You're buying for the long term and thinking in years, not months.",
    reflection_searching:
      "You told us your next move is your first investment property and you've already missed out at least once. For a first investment that usually means the budget or the finance wasn't settled before the search started, so the decision had to be made under pressure. The asset matters, but the order matters more.",
    reflection_starting:
      "You told us your next move is your first investment property. People with this mindset care most about buying an asset that holds and builds value, and about making the first one count.",
    next:
      "You'll want to be clear on what a strong long-term asset looks like for you, how it sits alongside your home and your borrowing, and a timeline that suits you rather than the market.",
  },
  portfolio_expander: {
    name: "Portfolio Expander",
    tagline: "You already hold property and you're looking to keep building.",
    reflection_searching:
      "You told us you hold property, you want to keep building, and you've lost one or more along the way. Experienced investors rarely lose on nerve. They lose on borrowing capacity that wasn't confirmed, or on a number that was set before the comparable sales were in. Both are worth checking before the next one.",
    reflection_starting:
      "You told us you hold property and want to keep growing. Experienced investors at this stage focus on where the next acquisition is, and on keeping momentum without overextending.",
    next:
      "You'll want your borrowing capacity confirmed before the next one rather than after, a clear view of where it sits against what you already hold, and a strategy that still makes sense as the portfolio grows.",
  },
};

/* Peer statistics keyed on answers.purpose. Mirrors PEER in the funnel page
   (PEER_ASOF 2026-10-20). Refresh both together, monthly, from the responses
   spreadsheet in the CapitalVue Content folder. No count or date in the email. */
const PEER = {
  next_home: {
    stats:
      "41% of people who've taken this are buying their next home. The biggest group we see. 7 in 10 want to move within six months. Fewer than 1 in 10 have pre-approval in hand.",
    line: "Most people in this group already own. Timing and the sale are usually the sticking points, not the deposit.",
  },
  first_home: {
    stats:
      "1 in 4 of people who've taken this are buying their first home. Nearly all are renting right now. About half have talked to a broker. A third haven't started on finance.",
    line: "Deposit is usually close. Finance is usually the thing that hasn't been done yet.",
  },
  first_ip: {
    stats:
      "Most first-time investors we see already own their home. 9 in 10 want to buy within six months. Fewer than half have spoken to a broker.",
    line: "The timeframe is short and the finance conversation hasn't happened. That gap is the one to close first.",
  },
  another_ip: {
    stats:
      "Half of the experienced investors we see are ready now. Most have equity sorted. 1 in 12 had pre-approval.",
    line: "Experience doesn't change the pattern: equity is ready, borrowing capacity hasn't been confirmed.",
  },
};
const PEER_SOURCE = "Source: CapitalVue Property Readiness Snapshot responses. Our own data, not a market statistic.";

const LINK = {
  strategic_upgrader: { t: "How we work with people buying their next home →", page: "evaluate-and-negotiate.html" },
  foundation_builder: { t: "How we work with first-home buyers →", page: "evaluate-and-negotiate.html" },
  growth_investor: { t: "How we work with investors →", page: "services.html" },
  portfolio_expander: { t: "How we work with investors →", page: "services.html" },
};

/* Human labels for the "What you told us" block. Order matters. */
const ANSWER_ORDER = ["purpose", "timeframe", "position", "state", "readiness", "finance", "missed", "sell"];
const ANSWER_LABEL = {
  purpose: "Next move", timeframe: "Timeframe", position: "Situation", state: "Buying in",
  readiness: "Deposit or equity", finance: "Finance", missed: "Missed out", sell: "Sell first?",
};
const VALUE_LABEL = {
  purpose: { first_home: "Buy my first home", next_home: "Buy my next home", first_ip: "Buy my first investment property", another_ip: "Add another investment property" },
  timeframe: { now: "I'm ready now", "3_6": "In the next 3 to 6 months", "6_12": "In 6 to 12 months", "12plus": "12 months or more away", exploring: "Just exploring for now" },
  position: { renting: "Renting", own_home: "I own my home", own_home_ip: "I own my home and an investment property", rentvest: "Rentvesting" },
  state: { adelaide: "Adelaide", seq: "Brisbane or South East Queensland", other: "Somewhere else", unsure: "Not sure yet" },
  readiness: { ready: "Ready to go", mostly: "Mostly there", building: "Still building it up", unsure: "Not sure where I stand" },
  finance: { preapproved: "Formal pre-approval in place", equity: "Refinancing or drawing equity", broker: "Application in progress", cash: "Purchasing with cash", notyet: "Early stages, not started" },
  missed: { multi: "Yes, more than once", once: "Yes, once", not_yet: "Not yet, but looking", not_started: "Haven't started looking" },
  sell: { yes: "Need to sell first", no: "Can buy first", unsure: "Not sure yet" },
};

function answerRows(answers) {
  const out = [];
  for (const k of ANSWER_ORDER) {
    const v = answers[k];
    if (v === undefined || v === null || v === "") continue;
    const label = (VALUE_LABEL[k] && VALUE_LABEL[k][v]) || String(v);
    out.push([ANSWER_LABEL[k], label]);
  }
  return out;
}

/* Reflection variant (bug note 21 Oct 2026): chosen by answers.missed.
   not_yet, not_started and a missing answer take the starting variant. */
const searching = (a) => a.missed === "multi" || a.missed === "once";
const reflectionFor = (arch, a) => (searching(a) ? arch.reflection_searching : arch.reflection_starting);

/* Derived values (spec section 3). */
function derive(payload) {
  const a = payload.answers || {};
  const archetype = ARCHETYPES[payload.archetype] ? payload.archetype : "foundation_builder";
  return {
    archetype,
    readyNow: (a.timeframe === "now" || a.timeframe === "3_6") && a.readiness === "ready",
    peerKey: PEER[a.purpose] ? a.purpose : "first_home",
    rows: answerRows(a),
  };
}

const utm = (archetype) => `?utm_source=snapshot&utm_medium=email&utm_content=${encodeURIComponent(archetype)}`;
const lcFirst = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);

const CLOSING_1 = "Every property journey is different, and often the biggest value comes from having a sounding board as opportunities and questions pop up along the way.";
const CLOSING_2 = "If there is anything you want to talk through, reply to this email or book a time with me.";

function footerParts({ privacyUrl, unsubscribeTo }) {
  return {
    line1: `CapitalVue Pty Ltd, ABN ${ABN}. Licensed buyers agency, ${LICENCES}. This is general information, not financial, credit, tax or legal advice. You're receiving this because you asked for your snapshot at capitalvue.com.au.`,
    unsubscribe: `mailto:${unsubscribeTo}?subject=Unsubscribe`,
    privacy: privacyUrl || SITE + "privacy-policy.html",
  };
}

function leadEmailHtml({ firstName, payload, privacyUrl, unsubscribeTo }) {
  const d = derive(payload);
  const a = ARCHETYPES[d.archetype];
  const peer = PEER[d.peerKey];
  const lk = LINK[d.archetype];
  const f = footerParts({ privacyUrl, unsubscribeTo });
  const bookUrl = SITE + "contact.html" + utm(d.archetype) + "#book";
  const linkUrl = SITE + lk.page + utm(d.archetype);
  const box = 'background:#f6f8fb;border:1px solid #dde3ec;border-radius:12px;padding:20px;';
  const lbl = 'font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#57687f;padding-bottom:10px;font-weight:600;';

  return `<!DOCTYPE html><html lang="en-AU"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your Property Readiness Snapshot</title></head>
<body style="margin:0;padding:0;background:#f6f8fb;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6f8fb;padding:28px 12px;">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;font-family:-apple-system,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#071f38;line-height:1.55;">
  <tr><td style="background:#092a4b;padding:18px 32px;"><img src="${SITE}assets/logo-white.png" alt="CapitalVue" height="26" style="height:26px;width:auto;display:block;border:0;"></td></tr>
  <tr><td style="padding:32px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr><td style="font-size:15px;color:#33465f;padding-bottom:18px;">Hi ${esc(firstName)}, thanks for taking the snapshot. Here's your copy.</td></tr>
      <tr><td style="font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:700;letter-spacing:-0.01em;padding-bottom:6px;">${esc(a.name)}</td></tr>
      ${d.readyNow ? '<tr><td style="padding-bottom:8px;"><span style="display:inline-block;font-size:12.5px;font-weight:600;color:#092a4b;background:#e8edf3;border-radius:99px;padding:4px 12px;">Ready to move</span></td></tr>' : ""}
      <tr><td style="font-size:17px;color:#33465f;padding-bottom:22px;">${esc(a.tagline)}</td></tr>
      <tr><td style="${box}">
        <div style="${lbl}">What you told us</div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:15px;">
          ${d.rows.map(([k, v]) => `<tr><td style="padding:3px 14px 3px 0;color:#57687f;white-space:nowrap;vertical-align:top;">${esc(k)}</td><td style="padding:3px 0;">${esc(v)}</td></tr>`).join("")}
        </table>
      </td></tr>
      <tr><td style="height:18px;"></td></tr>
      <tr><td style="font-size:15px;">${esc(reflectionFor(a, payload.answers || {}))}</td></tr>
      <tr><td style="height:18px;"></td></tr>
      <tr><td style="${box}">
        <div style="${lbl}">People in your position</div>
        <div style="font-size:15px;">${esc(peer.stats)}</div>
        <div style="font-size:15px;padding-top:10px;">${esc(peer.line)}</div>
        <div style="font-size:12px;color:#57687f;padding-top:10px;">${esc(PEER_SOURCE)}</div>
      </td></tr>
      <tr><td style="height:18px;"></td></tr>
      <tr><td style="font-size:15px;"><b>Where you go from here:</b> ${esc(lcFirst(a.next))}</td></tr>
      <tr><td style="font-size:15px;padding-top:10px;"><a href="${esc(linkUrl)}" style="color:#148f8f;font-weight:600;text-decoration:none;">${esc(lk.t)}</a></td></tr>
      <tr><td style="height:22px;"></td></tr>
      <tr><td style="font-size:15px;">${esc(CLOSING_1)}</td></tr>
      <tr><td style="font-size:15px;padding-top:12px;">${esc(CLOSING_2)}</td></tr>
      <tr><td style="padding:22px 0 6px;"><a href="${esc(bookUrl)}" style="display:inline-block;background:#092a4b;color:#ffffff;font-weight:600;font-size:16px;padding:13px 26px;border-radius:10px;text-decoration:none;">Book a time</a></td></tr>
      <tr><td style="font-size:15px;padding-top:18px;">Regards,<br>Brad</td></tr>
      <tr><td style="padding-top:26px;">
        <div style="border-top:1px solid #dde3ec;padding-top:16px;font-size:11px;line-height:1.6;color:#57687f;">
          ${esc(f.line1)} <a href="${esc(f.unsubscribe)}" style="color:#57687f;">Unsubscribe</a> · <a href="${esc(f.privacy)}" style="color:#57687f;">Collection notice</a>
        </div>
      </td></tr>
    </table>
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}

function leadEmailText({ firstName, payload, privacyUrl, unsubscribeTo }) {
  const d = derive(payload);
  const a = ARCHETYPES[d.archetype];
  const peer = PEER[d.peerKey];
  const lk = LINK[d.archetype];
  const f = footerParts({ privacyUrl, unsubscribeTo });
  const bookUrl = SITE + "contact.html" + utm(d.archetype) + "#book";
  const linkUrl = SITE + lk.page + utm(d.archetype);
  const L = [];
  L.push(`Hi ${firstName}, thanks for taking the snapshot. Here's your copy.`, "");
  L.push(a.name.toUpperCase());
  if (d.readyNow) L.push("Ready to move");
  L.push(a.tagline, "");
  L.push("WHAT YOU TOLD US");
  d.rows.forEach(([k, v]) => L.push(`${k}: ${v}`));
  L.push("", reflectionFor(a, payload.answers || {}), "");
  L.push("PEOPLE IN YOUR POSITION", peer.stats, peer.line, PEER_SOURCE, "");
  L.push(`Where you go from here: ${lcFirst(a.next)}`);
  L.push(`${lk.t} ${linkUrl}`, "");
  L.push(CLOSING_1, "", CLOSING_2, "");
  L.push(`Book a time: ${bookUrl}`, "");
  L.push("Regards,", "Brad", "");
  L.push("--", f.line1, `Unsubscribe: ${f.unsubscribe}`, `Collection notice: ${f.privacy}`);
  return L.join("\n");
}

function internalEmailHtml(payload) {
  const { contact = {}, answers = {}, archetype, source, viaBeacon } = payload;
  const d = derive(payload);
  const row = (k, v) =>
    `<tr><td style="padding:5px 14px 5px 0;color:#57687f;white-space:nowrap;">${esc(k)}</td><td style="padding:5px 0;"><b>${esc(v ?? "—")}</b></td></tr>`;

  return `<div style="font-family:-apple-system,'Segoe UI',Roboto,Arial,sans-serif;font-size:14px;color:#071f38;line-height:1.5;">
    <h2 style="margin:0 0 4px;">New lead: ${esc(contact.firstName)}</h2>
    <div style="color:#57687f;margin-bottom:16px;">
      ${esc(ARCHETYPES[archetype]?.name || archetype || "—")}${d.readyNow ? " · ready to move" : ""}
      ${viaBeacon ? '<span style="color:#d03b3b;"> · recovered via beacon (tab closed early)</span>' : ""}
    </div>
    <table cellpadding="0" cellspacing="0">
      ${row("Email", contact.email)}
      ${row("Mobile", contact.mobile)}
      ${d.rows.map(([k, v]) => row(k, v)).join("")}
      ${row("Raw answers", JSON.stringify(answers))}
      ${row("Consent given", payload.consent ? "yes" : "NO")}
      ${row("Source", source)}
    </table>
    <p style="color:#57687f;font-size:12px;margin-top:18px;">CRM record is captured separately by the HubSpot form on the page. This alert is email only. The lead's copy is BCC'd to ${esc(process.env.MAIL_BCC || DEFAULT_PERSON)}.</p>
  </div>`;
}

async function sendEmail({ to, subject, html, text, replyTo, bcc }) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!key || !from) throw new Error("Email not configured (RESEND_API_KEY / MAIL_FROM)");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from, to: [to], subject, html,
      ...(text ? { text } : {}),
      ...(replyTo ? { reply_to: replyTo } : {}),
      ...(bcc ? { bcc: [bcc] } : {}),
    }),
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

  const privacyUrl = process.env.BRAND_PRIVACY_URL || "";
  const internalTo = process.env.MAIL_TO_INTERNAL;
  // Reply-to and BCC are a person, not info@. Replies are the CTA and Brad
  // holds a copy of what every lead received (spec section 2).
  const replyTo = process.env.MAIL_REPLY_TO || DEFAULT_PERSON;
  const bcc = process.env.MAIL_BCC || DEFAULT_PERSON;
  const firstName = String(contact.firstName).trim();

  // Run independently. One failing must not lose the other.
  const results = await Promise.allSettled([
    sendEmail({
      to: contact.email,
      subject: `Your Property Readiness Snapshot, ${firstName}`,
      html: leadEmailHtml({ firstName, payload, privacyUrl, unsubscribeTo: replyTo }),
      text: leadEmailText({ firstName, payload, privacyUrl, unsubscribeTo: replyTo }),
      replyTo,
      bcc,
    }),
    internalTo
      ? sendEmail({
          to: internalTo,
          subject: `New lead: ${firstName} (${ARCHETYPES[payload.archetype]?.name || "unknown"})`,
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
