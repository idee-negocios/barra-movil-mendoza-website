import * as firebase from 'firebase';
import moment from 'moment';
import 'moment/locale/es';

moment.locale('es');

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAERhm4hw0QCBBXS_-IL2pcxvv-ZUqrdMk",
  authDomain: "contact-form-91ea2.firebaseapp.com",
  databaseURL: "https://contact-form-91ea2.firebaseio.com",
  storageBucket: "contact-form-91ea2.appspot.com",
  messagingSenderId: "862668692236"
};
const firebaseContact = firebase.initializeApp(config);

const firebaseEnabled = true;


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

      contactData.date = moment().format('MMMM Do YYYY, h:mm:ss a');

      // Submit to Firebase
      if(firebaseEnabled) {
        firebase.auth().signInAnonymously().catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
        });

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            firebaseContact.database().ref('/contact').push(contactData);
          }
        });
      }

      // Send to Analytics
      ga('send', {
        hitType: 'event',
        eventCategory: 'Formularios',
        eventAction: 'consulta',
        eventLabel: page
      });

      // Thanks
      contactFormEl.hide(500);
      contactMessageEl.show(1000);
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
