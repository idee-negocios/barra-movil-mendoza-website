export function init() {
  const navbarEl = $('.navbar');
  const iconEl = $('.menu > .icon');
  const buttonEl = $('#toggle-navbar');

  let navbarClosed = true;

  buttonEl.click(_ => {
    if(navbarClosed) {
      // iconEl.slideToggle('fast', _ => {
      //   navbarEl.slideToggle('fast');
      // });

      iconEl.slideToggle(500, () => {
        navbarEl.slideToggle();
      });

    } else {
      // navbarEl.slideToggle('fast', () => {
      //   iconEl.slideToggle('fast');
      // });
      navbarEl.slideToggle(500, () => {
        iconEl.slideToggle();
      });
    }

    navbarClosed = !navbarClosed;
  });
}
