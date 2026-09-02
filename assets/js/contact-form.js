/* Contact form — submits to Formward, an EU-hosted form backend.
   No page navigation: the form posts with fetch and reports the result in place. */
(function () {
  var ENDPOINT = 'https://forms.formward.eu/f/172ce1fc-1566-4583-ab34-9fa1bbeb36c0';

  var INTENT_SUBJECT = {
    trial:     'Enidia website: free trial request',
    demo:      'Enidia website: demonstration request',
    librarian: 'Enidia website: the Librarian on own hardware',
    numbers:   'Enidia website: costs and savings',
    question:  'Enidia website: question'
  };

  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var button = document.getElementById('c-submit');
    var status = document.getElementById('c-status');
    var buttonLabel = button.textContent;

    function say(kind, text) {
      status.textContent = text;
      status.className = 'form-status form-status-' + kind;
      status.hidden = false;
    }

    function clearStatus() {
      status.hidden = true;
      status.textContent = '';
    }

    function messageForStatus(code, error) {
      if (code === 402) {
        return 'Our form has reached its limit for this month. Please write to info@enidia.ai and we will answer just as quickly.';
      }
      if (code === 429) {
        return 'That was a lot of messages in a short time. Please wait a minute and try again, or write to info@enidia.ai.';
      }
      if (error) return error;
      return 'We could not send your message. Please try again, or write to info@enidia.ai.';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearStatus();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      // Fields Formward reads: a subject line for the notification email, and a
      // reply-to address so answering the notification answers the sender.
      var intent = document.getElementById('c-intent').value;
      document.getElementById('c-subject').value =
        INTENT_SUBJECT[intent] || 'Enidia website enquiry';
      document.getElementById('c-replyto').value =
        document.getElementById('c-email').value.trim();

      button.disabled = true;
      button.textContent = 'Sending…';

      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      }).then(function (res) {
        return res.json().catch(function () { return {}; })
          .then(function (data) { return { code: res.status, data: data }; });
      }).then(function (r) {
        if (r.data && r.data.ok) {
          form.reset();
          say('ok', 'Thank you. Your message has reached us and we reply within a working day.');
          // Analytics, if the visitor accepted it. Fires on a real send, not an attempt.
          document.dispatchEvent(new CustomEvent('enidia:lead', { detail: { intent: intent } }));
        } else {
          say('error', messageForStatus(r.code, r.data && r.data.error));
        }
      }).catch(function () {
        say('error', 'We could not reach the server. Please check your connection and try again, or write to info@enidia.ai.');
      }).then(function () {
        button.disabled = false;
        button.textContent = buttonLabel;
      });
    });
  });
})();
