import $ from 'jquery';

import * as Navbar from './navbar';
import * as Form from './form';
import * as Images from './images';
import * as Buttons from './buttons';

$(document).ready(() => {
  Navbar.init();
  Form.init();
  Images.init();
  Buttons.init();
});
