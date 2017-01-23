import $ from 'jquery';

import * as Navbar from './navbar';
import * as Form from './form';

$(document).ready(() => {
  Navbar.init();
  Form.init();
});
