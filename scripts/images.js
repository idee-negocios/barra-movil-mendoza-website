import Blazy from 'blazy';

export function init() {
  let bLazy = new Blazy({
    offset: 100,
    success(el) {
      console.log('Image loaded!');
    },
    error(el, msg) {
      console.log(msg);
    }
  });
}
