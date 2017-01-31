const globby = require('globby');
const join = require('path').join;

function onlyFilenames(arr) {
  return arr.map(el =>
                 el.indexOf('/') === -1
                 ? el
                 : el.substring(el.lastIndexOf('/') + 1, el.length));
}

// Paths
const prefix = process.env.PREFIX || '/'; // can be set from package.json
const img = 'img';
const icons = join(img, 'icons');

const scripts = 'assets';
const styles = 'assets';

// Pages
const pages = [
  {url: '/', name: 'Inicio'},
  {url: '/patio-cervecero.html', name: 'Patio cervecero'},
  {url: '/barra-sin-alcohol.html', name: 'Barra sin alcohol'},
  {url: '/eventos-empresariales.html', name: 'Eventos empresariales'},
  {url: '/bodas-y-fiestas.html', name: 'Bodas y fiestas'}
].map(p => {
  p.url = join(prefix, p.url);
  return p;
});

module.exports = {
  site: {
    root: "/",
    url: "https://barrasmovilesmendoza.com.ar",
    title: "John Jarana",
    author: "Alan Boglioli",
    logo: 'logo.png'
  },
  assets: {
    img: join(prefix, img),
    icons: join(prefix, icons),
    scripts: join(prefix, scripts),
    styles: join(prefix, styles)
  },
  files: {
    brandIcons: onlyFilenames(globby.sync(['./sources/img/icons/brands/*']))
  },
  pages,
  contact: [
    {icon: 'phone', text: 'johnjarana@gmail.com'},
    {icon: 'envelope', text: '555 5555'},
    {icon: 'map-marker', text: 'Mapa'}
  ]
}
