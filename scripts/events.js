export function attach() {
  // hide slick while it's loading
  $('.slide').hide();

  $('.slide').on('init', () => {
    $('.slide').show();
  });
}
