import $ from 'jquery'

$(document).ready(() => {
  console.log('--- Metalsmith + Gulp + Webpack ---');

  const hi = 'Hello from <em>scripts/app.js</em>!'
  $('footer').prepend(`<p>${hi}</p>`)
})
