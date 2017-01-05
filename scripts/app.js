import $ from 'jquery'

$(document).ready(() => {
  $('#mensaje').focus(() => {
    const el = $('#mensaje');
    if(el.val() === 'Mensaje') {
      el.val('');
    }
  });

  $('#mensaje').blur(() => {
    const el = $('#mensaje');
    if(el.val() === '') {
      el.val('Mensaje');
    }
  });
})
