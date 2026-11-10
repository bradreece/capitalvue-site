/**
 * Netlify event-triggered function: runs automatically after every successful
 * deploy (the file name is the trigger). Submits changed URLs to IndexNow, which
 * notifies Bing (and Yandex, Seznam, Naver) within minutes instead of waiting
 * for a crawl. Google does not use IndexNow.
 *
 * Which URLs: every sitemap entry whose lastmod is today or yesterday in
 * Brisbane. build.js only moves lastmod when a page's HTML changes (content-hash
 * manifest in content/lastmod.json) or a post's iso/updated date is set, so this
 * is the set of pages that actually changed. Yesterday is included so a deploy
 * just after midnight does not miss pages built the day before.
 *
 * Production deploys only. Deploy previews and branch deploys are skipped.
 * Never throws: a failed ping must not look like a failed deploy.
 *
 * The key must match INDEXNOW_KEY in build.js, which writes /<key>.txt.
 *
 * .mjs, not .js: package.json has no "type":"module".
 * Does not touch submit.mjs or evalneg-backup.mjs.
 */
const KEY = "5aaf1e370a6b217927b613a9a8aad79c";
const HOST = "www.capitalvue.com.au";
const SITE_ID = "14ebdca3-fa0f-4a80-bcd1-32a236412fd8";
const ENDPOINT = "https://api.indexnow.org/indexnow";

const bneDate = (offsetDays = 0) =>
  new Date(Date.now() + 10 * 3600 * 1000 - offsetDays * 86400 * 1000).toISOString().slice(0, 10);

const done = (status, body) => {
  console.log("[indexnow]", JSON.stringify(body));
  return { statusCode: status, body: JSON.stringify(body) };
};

export async function handler(event) {
  let payload = {};
  try { payload = JSON.parse(event.body || "{}").payload || {}; } catch (e) { payload = {}; }

  if (payload.site_id !== SITE_ID) return done(200, { skipped: "not this site" });
  if (payload.context !== "production") return done(200, { skipped: "context " + payload.context });

  try {
    const res = await fetch(`https://${HOST}/sitemap.xml?d=${encodeURIComponent(payload.id || Date.now())}`);
    if (!res.ok) return done(200, { error: "sitemap " + res.status });
    const xml = await res.text();

    const cutoff = bneDate(1);
    const urls = [];
    for (const m of xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)) {
      if (m[2] >= cutoff && m[1].startsWith(`https://${HOST}/`)) urls.push(m[1]);
    }
    if (!urls.length) return done(200, { submitted: 0, cutoff });

    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls.slice(0, 10000) }),
    });
    return done(200, { submitted: urls.length, indexnow_status: r.status, deploy: payload.id, urls });
  } catch (e) {
    return done(200, { error: String(e && e.message || e) });
  }
}
