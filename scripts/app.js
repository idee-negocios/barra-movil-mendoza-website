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
    lazyLoad: 'ondemand',
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 3
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});
