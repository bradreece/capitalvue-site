# CapitalVue: open work and known traps

Last updated 10 November 2026. Written as a handover so this does not live only
in a chat thread. Update it when you close something.

---

## 0. Bing and IndexNow, 10 November 2026

`main@834359c`. Bing Webmaster Tools property `capitalvue.com.au/` (apex) is
verified and accepts the www URLs; the www sitemap is submitted (33 URLs,
Success). No second www property is needed.

**IndexNow.** `build.js` writes the key file `/5aaf1e370a6b217927b613a9a8aad79c.txt`
(public by design, gitignored as build output). `netlify/functions/deploy-succeeded.mjs`
runs after every production deploy and submits every sitemap URL whose
`lastmod` is today or yesterday (Brisbane). Deploy previews and branch deploys
are skipped; outside POSTs get a 403. The key is hardcoded in both files;
change them together. Results show in the function log as `[indexnow]` and in
Bing Webmaster Tools under IndexNow.

**Sitemap lastmod.** Non-post pages no longer get the build date. `build.js`
hashes each page and keeps its date in `content/lastmod.json` until the HTML
changes. The manifest is committed, so run `node build.js` locally before
committing, as always. A page changed in GitHub's web editor without a local
build gets today's date on each Netlify build until the manifest is committed.
Posts still use `iso` / `updated`. The manifest was seeded at 2026-11-05, the
date the live sitemap already carried.

---

## 0b. Readiness funnel, snapshot email and HubSpot properties, 21 October 2026

Three deploys in one day. `main@45a538c`. Function health check returns
`"version":"1.4.0"` with the `hardening` array.

**Page.** Source is `content/readiness-funnel.src.html`. The committed
`property-readiness.html` is build output; never edit it. Four archetypes
(`strategic_upgrader`, `foundation_builder`, `growth_investor`,
`portfolio_expander`). `ready_mover` is gone; "Ready to move" is derived from
`timeframe` in (`now`, `3_6`) and `readiness === "ready"`. Each archetype has
`reflection_searching` (missed `multi` or `once`) and `reflection_starting`
(`not_yet`, `not_started`, absent). The first live lead got the wrong variant
before this branch existed; nothing to recall.

**Function** (`netlify/functions/submit.mjs`, v1.4.0) holds its own copy of
`ARCHETYPES`, `PEER` and the answer labels, mirroring the page. Change both
files together. `PEER_ASOF` is `2026-10-20`; refresh monthly from the
responses spreadsheet.

- Email: BCC and reply-to default to `brad@capitalvue.com.au` (env `MAIL_BCC`,
  `MAIL_REPLY_TO` override). `MAIL_FROM` is now
  `"Brad Reece, CapitalVue" <brad@capitalvue.com.au>`. Unsubscribe is a mailto
  with subject "Unsubscribe"; action within five working days.
- HubSpot: after the send, the function upserts the eleven `cv_` contact
  properties through the Contacts API (PATCH by email; 404 → 2s retry → create).
  Auth is a HubSpot **Service Key** (not a legacy private app) in env
  `HUBSPOT_TOKEN`, scopes `crm.objects.contacts.read` and `.write`. Option B
  from the spec: the page also calls the function at the contact step with
  `stage: "partial"`, which writes `cv_purpose`, `cv_timeframe_stated` and
  `cv_snapshot_status = partial`, no email; completion overwrites with the
  full set. The HubSpot Forms API payload on the page is unchanged and must
  stay that way (form `9f419495-...` carries none of the `cv_` fields).
- Verified live with two test contacts: all eleven values on a next-home run,
  ten on an investor run with `cv_sell_first` absent, `Just exploring` label,
  `cv_ready_now` derived correctly, partial flipping to completed.

**Still open from the three specs:**
- Confirm lists 44 to 51 pick up a new contact without a manual step.
- Confirm the BCC copies arrived at `brad@capitalvue.com.au` (four test sends
  went out on 21 October; they should be there).
- Delete the test contacts `roostergsd@gmail.com` and
  `roostergsd+investor@gmail.com`. The first shows a last name "Test" the
  function never sent; check what stamped it before deleting.

**Env var changes need a redeploy.** Netlify snapshots env vars into the
deploy, so a variable added or changed in the UI is not visible to functions
until the next deploy. An empty commit pushed to `main` is the clean way.

---

## 1. Blocking the Meta campaign launch

Everything else on this list can wait. This cannot, because money is waiting
on it.

**Confirm the `Lead` event reaches Events Manager and reads as a standard
event.** GTM container version 8 is published with `Meta – Lead` firing on
`CE – HS Form Submitted`, and `Meta Pixel – Base Code` correctly paused. The
chain was verified end to end in the browser: the quiz pushes
`hs_form_submitted` at step 3, the trigger matches, the tag fires, `fbq` is
present. The only unverified link is whether Meta received it and typed it as
standard rather than custom. An ad set cannot optimise for a custom-typed
`Lead`.

**"Data sharing restrictions applied" on CV Pixel.** Events Manager reports
this against two datasets. Restricted-category setup strips custom parameters
and anything in a URL after the domain. That breaks the UTM scheme in campaign
pack section 4 and the `content_name` parameter on the Lead tag. Click
**Manage categories** and check the classification is correct before spending.
Read Meta spend performance in GA4, not Ads Manager, until it is resolved.

**Aggregated Event Measurement no longer exists as a configuration screen.**
Meta removed the tab and eliminated event prioritisation. Do not go looking for
it. Both domains are verified, which is still worth having for link previews
and brand safety, but it is not a launch gate.

---

## 2. Small fixes with real consequences

**`Meta – Lead` mislabels two thirds of leads.** The tag hardcodes
`content_name: 'Property Readiness Snapshot'`, but its trigger fires for all
three sources. Replace with the variable already built in v8:

```html
<script>
  if (typeof fbq === 'function') {
    fbq('track', 'Lead', {content_name: '{{DLV - form_source}}'});
  }
</script>
```

Moot if the data sharing restriction stands, since custom parameters get
stripped anyway.

**`Conversion Linker` is paused in GTM.** Harmless while Google Ads
`AW-16512276844` is dormant. Unpause it *before* switching Google Ads on, or
gclid attribution degrades silently.

**Meta description em dashes.** Every post's auto-generated meta description
contains an em dash, which breaks the brand rule and shows in search results.
One line in `build.js`, affects all 22 pages.

**Netlify rate limiting does not enforce on this plan.** Verified with 16
rapid POSTs, zero 429s. Both `config.rateLimit` on the function and the
`rate_limit` block on the forced redirect were tried. The function health check
honestly reports this under `pending` rather than `hardening`. Root cause
unknown: plan restriction, feature not enabled, or a validation error visible
only in deploy logs. The partial-stage call added on 21 October doubles the
function's call volume per lead; it sends no email, so the exposure is HubSpot
writes behind the same honeypot and origin gate.

**Committed HTML on `main` is stale.** The generated pages checked into the
repo lag `build.js` by weeks (missing the `_redirects` exclusion block, the
colour-scheme meta, seven whole pages). Netlify regenerates everything on push
so the live site is right, but anyone reading the repo's HTML is reading the
wrong thing. Either commit a fresh build or stop committing output.

---

## 3. Content and compliance debt

**Adelaide strata cost ranges.** The house-vs-unit yield gap article rests
entirely on $1,400 to $10,000 annual contributions for an Adelaide
two-bedroom. Sanity check against real SA schedules. If the range is wrong the
whole argument is wrong.

**Buying power calculator default interest rate is 6.2%** against a 4.35% cash
rate. Likely flattering borrowing capacity, which is the wrong direction for a
lead magnet feeding a buyers agency.

**Form 6 notice provisions.** The fees article says "check the term and the
notice provisions" rather than restating 30 days as flat fact, because the
blanket claim was never verified against sole and exclusive appointments.
Verify before making it specific.

**"Roughly three in ten of our clients are owner-occupiers"** appears in the
fees article and the brand skill says 30 per cent. It needs a dated evidence
file behind it, per the substantiation register rule.

**Privacy policy** does not list the email provider (Resend) in its overseas
disclosure list. DMARC is `p=none` with no `rua` address, so nobody is
receiving the reports.

**Team consent.** Confirm Andrew is comfortable being publicly named as
Harcourts QLD CEO, and Rebecca as practising at the Queensland Eye Institute.
Both currently appear on `team.html`.

---

## 4. Off-site WA removal, unfinished

The site itself is clean and a build guard enforces it. These are not:

Google Business Profile · HubSpot-hosted pages · Instagram bio · LinkedIn
company page · ad geo-targeting and ad copy · email signatures · agency
agreement templates.

The last one is a legal question, not a copy edit.

---

## 5. Housekeeping

- Export the GSC "Not found (404)" drilldown, 39 URLs. This is the last unknown
  in the redirect map. Old spam product URLs must keep returning 404 and must
  never be redirected, because redirecting them passes spam signals into the
  real site.
- Request indexing for `post-buyers-agent-fees-australia.html` and the three
  earlier URLs.
- Delete the HubSpot test contacts, including `test@test.com`,
  `roostergsd@gmail.com` and `roostergsd+investor@gmail.com`.
- Second GBP post for the fees article, 7 to 10 days after the first, using the
  1080x1080 GST comparison card.
- Save `capitalvue-brand` v1.2 to the account. It corrects the GBP card size
  (`square`, not `gmb`, because Google centre-crops post images and destroys
  bar charts with edge labels).
- Seven Meta datasets exist, five near-dormant. Tidy or deliberately ignore.

---

## 6. Built but not deployed

**HubSpot to portal lead poller.** Drizzle schema, message parser and a
scheduled job were written for the Replit portal (Express 5, Drizzle, Neon,
autoscale). Not installed. Key design points if picked up:

- Cursor on `lastmodifieddate`, never `createdate`. The quiz POSTs twice per
  lead, at step 3 and again on completion. A `createdate` cursor permanently
  captures the partial record with no archetype.
- Floor date and cursor are separate values. The floor never moves, so old
  leads stay out even if the cursor is reset.
- Advance the cursor to the newest record seen, not the wall clock, because
  HubSpot's search index is eventually consistent.
- The structured answers now live in the eleven `cv_` contact properties
  (since 21 October 2026), so the poller can read those directly instead of
  parsing the `message` field. The `message` block is still written by the
  Forms post for older tooling.

---

## Traps that have already cost time

**Netlify serves everything in the publish root.** `_private/` is not private.
A handover doc, a 6MB zip of the site source, and a complete stale duplicate of
16 pages were publicly readable from July until 31 August 2026. `_headers` and
`_redirects` did not block any of them. `route53-cutover.json`,
`services.png`, `team.png` and `tracker.png` are still public. Nothing
underscore-prefixed is protected.

**Static files shadow ordinary redirect rules.** A redirect that appears to do
nothing needs `301!` to force it. `_redirects` is first-match-wins, so forced
rules must be prepended, not appended.

**Pretty URLs.** Turning the Netlify setting off made every trailing-slash URL
serve 200 instead of 301, which broke every relative link on `/blog/`. Nineteen
forced rules now handle it in `_redirects`.

**Do not link any `/blog/` path.** Posts live at the root as
`post-[slug].html`.

**`package.json` has no `"type":"module"`,** so the Netlify function must stay
`.mjs`. Renaming it to `.js` fails to parse.

**The nav burger breakpoint is 960px** and its media block must sit *after* the
base `.burger{display:none}` rule, or source order wins and 641 to 960px gets
no navigation at all.

**Never replace `netlify/functions/submit.mjs` with a regenerated file.** The
upstream version was an open relay that accepted any POST and emailed any
address. The deployed build adds an origin allowlist, a honeypot and field
length caps. If a health check comes back without the `hardening` array, it is
a downgrade.

**Never add fields to the page's HubSpot Forms payload.** Form
`9f419495-172c-4c2b-9578-e0e87d37fbbe` has none of the `cv_` fields; the Forms
API rejects the whole submission when the payload names one, and lead capture
breaks. Properties go through the Contacts API in the function.

**The readiness page is a built page, not a source file.** A copy of
`property-readiness.html` pulled from the live site or the repo carries 19 head
lines that `build.js` injects. Dropping it straight into
`content/readiness-funnel.src.html` duplicates all of them. Strip from
`<meta name="description"` through the GTM `<script>` first.

**Client names and street addresses never publish.** Suburb plus figures only,
in the results tables and everywhere else.
