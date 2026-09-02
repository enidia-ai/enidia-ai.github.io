/* Enidia cookie consent — loads Google Analytics only after explicit consent.
   No third-party CMP, no cookies set before a choice is made. */
(function () {
  var GA_ID = 'G-38CCXVVLH0';
  var KEY = 'enidia-consent';   // 'granted' | 'denied'
  var loaded = false;

  function loadGA() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  function store(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  function read() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }

  function banner() {
    if (document.getElementById('cookie-banner')) {
      document.getElementById('cookie-banner').classList.add('open');
      return;
    }
    var el = document.createElement('div');
    el.id = 'cookie-banner';
    el.className = 'cookie-banner open';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie choice');
    el.innerHTML =
      '<p>We use analytics cookies only if you agree to them. Nothing is loaded until you decide. ' +
      '<a href="privacy.html">Privacy &amp; Cookie Policy</a></p>' +
      '<div class="cookie-actions">' +
      '<button type="button" data-consent="denied" class="cookie-btn cookie-btn-ghost">Decline</button>' +
      '<button type="button" data-consent="granted" class="cookie-btn cookie-btn-solid">Accept</button>' +
      '</div>';
    el.addEventListener('click', function (e) {
      var v = e.target.getAttribute && e.target.getAttribute('data-consent');
      if (!v) return;
      store(v);
      el.classList.remove('open');
      if (v === 'granted') loadGA();
    });
    document.body.appendChild(el);
  }

  window.EnidiaConsent = {
    reopen: function () { banner(); },
    revoke: function () { store('denied'); }
  };

  var choice = read();
  if (choice === 'granted') loadGA();
  else if (choice !== 'denied') banner();
})();

/* --- lightweight event tracking + CTA intent routing ------------------- */
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }
  window.enidiaTrack = track;

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    // CTA clicks — every element carrying data-cta reports its location.
    document.addEventListener('click', function (e) {
      var el = e.target.closest && e.target.closest('[data-cta]');
      if (!el || el.tagName === 'FORM') return;
      var href = el.getAttribute('href') || '';
      track('cta_click', {
        cta_location: el.getAttribute('data-cta'),
        cta_label: (el.textContent || '').trim().slice(0, 80),
        destination: href.indexOf('calendar.app.google') > -1 ? 'calendar'
                   : href.charAt(0) === '#' ? 'onpage_form' : href
      });
      // An ask with a stated intent preselects it in the contact form.
      var intent = el.getAttribute('data-intent');
      if (intent) {
        var sel = document.getElementById('c-intent');
        var src = document.getElementById('c-source');
        if (sel) sel.value = intent;
        if (src) src.value = el.getAttribute('data-cta');
      }
    });

    // Form sent. contact-form.js raises this once the backend has accepted the
    // message, so a failed send is not counted as a lead.
    document.addEventListener('enidia:lead', function (e) {
      track('generate_lead', { intent: (e.detail && e.detail.intent) || 'unknown',
                               cta_location: (document.getElementById('c-source') || {}).value || 'direct' });
    });

    // Video plays — first play per film.
    Array.prototype.forEach.call(document.querySelectorAll('video'), function (v) {
      var once = false;
      v.addEventListener('play', function () {
        if (once) return;
        once = true;
        track('video_play', { film: (v.currentSrc || v.src || '').split('/').pop() });
      });
    });

    // Scroll depth.
    var marks = [25, 50, 75, 90], hit = {};
    window.addEventListener('scroll', function () {
      var h = document.documentElement;
      var pct = (h.scrollTop + window.innerHeight) / h.scrollHeight * 100;
      marks.forEach(function (m) {
        if (!hit[m] && pct >= m) { hit[m] = true; track('scroll_depth', { percent: m }); }
      });
    }, { passive: true });
  });
})();
