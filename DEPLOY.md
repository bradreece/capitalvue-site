# Deploying CapitalVue

Two ways to publish. Once GitHub is connected, use option A and forget option B
exists except as an emergency fallback.

---

## Option A: push to GitHub, Netlify builds and publishes

This is the target setup. You edit, you commit, the site updates. No Node on
your machine, no zip files, no drag and drop.

```bash
git add -A
git commit -m "what changed"
git push
```

Netlify sees the push, clones the repo, runs `node build.js`, and publishes.
Takes about a minute. Watch it under Deploys.

`netlify.toml` holds the whole configuration:

```toml
[build]
  command = "node build.js"
  publish = "."
  functions = "netlify/functions"
```

You can edit `build.js` or anything in `content/` directly in GitHub's web
editor and commit from the browser. Netlify rebuilds the same way. That is the
whole point of this setup.

---

## Option B: drag and drop, no git

Fallback if GitHub or the Netlify build is broken and something must ship now.

```bash
node build.js
```

Then zip the folder and drop it on Netlify → Deploys. Netlify runs no build in
this mode, so the HTML must already be built. Forget the build step and you
publish stale pages that look fine.

---

## After every deploy, check the function

```
https://www.capitalvue.com.au/.netlify/functions/submit
```

Expect `{"ok":true,"version":"1.2.0",...}` including a `hardening` array. A
missing `hardening` array means an older, unhardened function has overwritten
the good one. Roll back.

---

## Rolling back

Netlify → Deploys → pick any earlier deploy → **Publish deploy**. Instant, and
it does not touch the repo. Fix the repo afterwards.

---

## Things that will catch you out

**Never hardcode an absolute path in `build.js`.** `const DIR = __dirname`
must stay relative or the Netlify build writes to the wrong place and silently
publishes nothing. This was broken until 31 August 2026.

**Netlify project visibility stays Public.** That setting controls the live
website, not the repo. Setting it Private puts capitalvue.com.au behind a team
login and takes the site off the internet. The GitHub repo is the thing that
should be private.

**The publish directory is the repo root.** Anything committed here is served
publicly, including `build.js`. There is no such thing as a private folder;
`_private/` was readable by anyone for five weeks. Do not commit anything you
would not publish.

**The build fails loudly on a WA licence claim.** That is deliberate. If the
build exits 1 with a licensure error, fix the copy, do not remove the guard.
