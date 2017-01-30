import $ from 'jquery';

import * as Navbar from './navbar';
import * as Form from './form';
import * as Images from './images';

$(document).ready(() => {
  Navbar.init();
  Form.init();
  Images.init();
});
