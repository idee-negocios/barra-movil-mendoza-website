export function init() {
  // Scroll from header to contact section
  $("#home-btn, #patio-cervecero-btn").click(function() {
    $('html,body').animate({
      scrollTop: $("#contact").offset().top
    }, 'slow');
  });
}
