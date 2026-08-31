/**
 * snapshot-email.js
 * Drop-in add-on for the existing Property Readiness Snapshot page.
 *
 * Adds the emailed snapshot copy WITHOUT touching your HubSpot Forms
 * submission. Your existing HubSpot post stays exactly as it is and remains
 * the single CRM capture path. This only sends email.
 *
 * INSTALL
 *   1. Paste this whole file in a <script> block before </body>, or save it as
 *      /snapshot-email.js and include <script src="/snapshot-email.js"></script>.
 *   2. In your existing submit handler, AFTER your HubSpot post, add one line:
 *
 *        window.sendSnapshotEmail({
 *          contact:   { firstName, email, mobile },   // your existing values
 *          consent:   true,                            // the consent checkbox
 *          archetype: archetype,                       // e.g. "strategic_upgrader"
 *          readiness: { tag: experienceTag },          // optional
 *          answers:   answers                          // optional, for the team alert
 *        });
 *
 *      Call it fire-and-forget. Do not await it and do not let it block or
 *      alter your HubSpot submission.
 *
 * BEHAVIOUR
 *   - Renders a small status line so a failed send is never silent.
 *   - Offers a retry if the send fails.
 *   - Fires a beacon if the tab closes mid-flight so the lead is still recoverable.
 *   - Does nothing when opened from disk (file://), where browsers block the request.
 */
(function () {
  "use strict";

  var VERSION = "1.2.0";
  var ENDPOINT = "/api/snapshot-submit";   // rate-limited proxy to the function
  var DEV = new URLSearchParams(location.search).has("dev");

  var state = "idle";      // idle | sending | sent | failed
  var lastPayload = null;

  /* ---------- status UI ---------- */

  function styleOnce() {
    if (document.getElementById("snapmail-css")) return;
    var s = document.createElement("style");
    s.id = "snapmail-css";
    s.textContent =
      '.snapmail{margin:14px auto;max-width:760px;padding:11px 15px;border-radius:10px;' +
      'font:400 13.5px/1.5 system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;' +
      'background:#fcfcfb;border:1px solid rgba(11,11,11,.10);color:#52514e;}' +
      '.snapmail.ok{background:rgba(12,163,12,.08);border-color:rgba(12,163,12,.35)}' +
      '.snapmail.err{background:rgba(208,59,59,.07);border-color:rgba(208,59,59,.35)}' +
      '.snapmail b{color:#0b0b0b}' +
      '.snapmail button{font:inherit;font-weight:600;margin-left:8px;padding:5px 12px;' +
      'border-radius:8px;border:1px solid rgba(11,11,11,.15);background:#fff;color:#0b0b0b;cursor:pointer}';
    document.head.appendChild(s);
  }

  /* Where the status line appears. Override by putting an element with
     id="snapshot-email-status" wherever you want it on the page. */
  function slot() {
    var el = document.getElementById("snapshot-email-status");
    if (!el) {
      el = document.createElement("div");
      el.id = "snapshot-email-status";
      document.body.appendChild(el);
    }
    return el;
  }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function banner(kind, email) {
    styleOnce();
    var el = slot();
    if (kind === "sending") {
      el.className = "snapmail";
      el.textContent = "Sending your copy\u2026";
    } else if (kind === "sent") {
      el.className = "snapmail ok";
      el.innerHTML = "We\u2019ve emailed a copy to <b>" + esc(email) + "</b>.";
    } else if (kind === "failed") {
      el.className = "snapmail err";
      el.innerHTML =
        "We couldn\u2019t email your copy just now. Your snapshot is still on screen. " +
        '<button type="button" id="snapmail-retry">Try again</button>';
      var b = document.getElementById("snapmail-retry");
      if (b) b.addEventListener("click", function () { send(lastPayload); }, { once: true });
    } else {
      el.className = "";
      el.textContent = "";
    }
  }

  /* ---------- send ---------- */

  function send(payload) {
    // Pass the page honeypot through so the function can reject bots.
    try {
      var hp = document.getElementById("cv_hp2");
      if (hp && payload) payload.cv_hp2 = hp.value || "";
    } catch (e) {}
    if (!payload || !payload.contact || !payload.contact.email) {
      if (DEV) console.debug("[snapshot-email] no email in payload, skipping");
      return;
    }
    if (state === "sending" || state === "sent") return;
    if (location.protocol === "file:") {
      if (DEV) console.debug("[snapshot-email] file:// preview, not sending");
      return;
    }

    lastPayload = payload;
    state = "sending";
    banner("sending");

    fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        state = "sent";
        banner("sent", payload.contact.email);
      })
      .catch(function (err) {
        state = "failed";
        banner("failed");
        if (DEV) console.debug("[snapshot-email] failed", err);
      });
  }

  /* Last-ditch attempt if the tab closes before the request lands. */
  window.addEventListener("pagehide", function () {
    if (state === "sent" || !lastPayload) return;
    try {
      var body = JSON.stringify(
        Object.assign({}, lastPayload, { viaBeacon: true })
      );
      navigator.sendBeacon(
        ENDPOINT,
        new Blob([body], { type: "application/json" })
      );
    } catch (e) { /* nothing useful to do here */ }
  });

  window.sendSnapshotEmail = send;
  window.SNAPSHOT_EMAIL_VERSION = VERSION;
})();
