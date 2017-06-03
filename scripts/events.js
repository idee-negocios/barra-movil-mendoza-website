export function attach() {
  // when slick while it's loaded
  $('.slide').on('init', () => {
    $('.slide').show();
  });
}
