const globby = require('globby');
const join = require('path').join;

function onlyFilenames(arr) {
  return arr.map(el =>
                 el.indexOf('/') === -1
                 ? el
                 : el.substring(el.lastIndexOf('/') + 1, el.length));
}

// Paths
const root = process.env.ROOT ? join('/', process.env.ROOT) : '/'; // must be set in console
const img = 'img';
const icons = join(img, 'icons');

const scripts = 'assets';
const styles = 'assets';

// Pages
const pages = [
  {url: '/', name: 'Inicio'},
  {url: '/casamientos-y-fiestas.html', name: 'Casamientos y fiestas'},
  {url: '/barra-sin-alcohol.html', name: 'Barra sin alcohol'},
  {url: '/eventos-privados.html', name: 'Eventos privados'},
  {url: '/patio-cervecero.html', name: 'Patio cervecero'}
].map(p => {
  p.url = join(root, p.url);
  return p;
});

module.exports = {
  site: {
    root,
    url: "https://barrasmovilesmendoza.com.ar",
    title: "John Jarana",
    author: "IDEE",
    logo: 'logo.png'
  },
  assets: {
    img: join(root, img),
    icons: join(root, icons),
    scripts: join(root, scripts),
    styles: join(root, styles)
  },
  files: {
    brandIcons: onlyFilenames(globby.sync(['./sources/img/icons/brands/*']))
  },
  pages,
  contact: [
    {icon: 'envelope', text: 'johnjaranabarras@gmail.com'},
    {icon: 'phone', text: `261 3830752`},
    {icon: 'facebook', text: '<a href="https://www.facebook.com/johnjaranabarras/">John Jarana Barras</a>'}
  ]
}
