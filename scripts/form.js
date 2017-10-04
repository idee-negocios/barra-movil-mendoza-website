import * as firebase from 'firebase';
import * as axios from 'axios';

export function init() {
  // elements
  const messageEl = $('#mensaje');
  const contactFormEl = $('#contact-form');
  const contactMessageEl = $('#contact-message');

  // submit form
  contactFormEl.submit((e) => {
    e.preventDefault();

    let contactData = contactFormEl.serializeArray();

    let ok = contactData.every(function(item) {
      return item.value !== '';
    });

    if(!ok) {
      alert('Algunos campos están vacíos. Por favor, completalos.');
    } else {
      contactData = contactData.reduce((data, item) => {
        data[item.name] = item.value;
        return data;
      }, {});

      axios.post(contactUrl, contactData)
        .then(res => {
          // Send to Analytics
          ga('send', {
            hitType: 'event',
            eventCategory: 'formularios',
            eventAction: 'consulta',
            eventLabel: page,
            eventValue: 1
          });

          // Send to Facebook
          fbq('track', 'FormularioEnviado');

          // Thanks
          contactFormEl.hide(500);
          contactMessageEl.show(1000);
        });
    }
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

function thanks(name) {
}
