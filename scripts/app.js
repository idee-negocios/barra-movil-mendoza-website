import $ from 'jquery';
import * as slick from 'slick-carousel';

import * as Navbar from './navbar';
import * as Form from './form';
import * as Images from './images';
import * as Buttons from './buttons';
import * as Footer from './footer';

$(document).ready(() => {
  Navbar.init();
  Form.init();
  Images.init();
  Buttons.init();
  Footer.init();

  $('.slide').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  });
});
