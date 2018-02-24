import MobileDetect from 'mobile-detect';

export function init() {
  const whatsapp = $(`<a href="intent://send/2615752841#Intent;scheme=smsto;package=com.whatsapp;action=android.intent.action.SENDTO;end">261 5752841</a>`);

  const md = new MobileDetect(window.navigator.userAgent);

  if(md.mobile()) {
    $('#phone').text('');
    $('#phone').append(whatsapp);
  }
}
