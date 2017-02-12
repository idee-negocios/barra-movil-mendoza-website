function toggleButtons() {
  $('.toggle-btn').click(function() {
    let btn = $(this);
    let dataToggle = btn.data('toggle');

    $('#' + dataToggle).toggle('slow', function() {
      let el = $(this);

      let isShown = el.data('shown');
      isShown = !isShown;
      el.data('shown', isShown);

      btn.empty();
      if(isShown) {
        btn.append($('<i class="fa fa-chevron-up"></i>'));
      } else {
        btn.append($('<i class="fa fa-chevron-down"></i>'));
      }
    });
  });
}

export function init() {
  // Scroll from header to contact section
  $("#home-btn, #patio-cervecero-btn").click(function() {
    $('html,body').animate({
      scrollTop: $("#contact").offset().top
    }, 'slow');
  });

  toggleButtons();
}
