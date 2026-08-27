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
