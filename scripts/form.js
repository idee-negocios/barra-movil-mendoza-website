export function init() {
  // elements
  const messageEl = $('#mensaje');
  const contactFormEl = $('#contact-form');

  // submit form
  contactFormEl.submit((e) => {
    e.preventDefault();

    // Submit to Firebase
    // ...
  });

  // message textarea
  messageEl.focus(() => {
    const el = messageEl;
    if(el.val() === 'Mensaje') {
      el.val('');
    }
  });

  $('#mensaje').blur(() => {
    const el = messageEl;
    if(el.val() === '') {
      el.val('Mensaje');
    }
  });
}
