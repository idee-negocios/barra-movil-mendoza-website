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
  {url: '/casamientos.html', name: 'Casamientos'},
  // {url: '/barra-sin-alcohol.html', name: 'Barra sin alcohol'},
  {url: '/eventos-personalizados.html', name: 'Eventos Personalizados'},
  // {url: '/patio-cervecero.html', name: 'Patio cervecero'}
].map(p => {
  p.url = join(root, p.url);
  return p;
});

module.exports = {
  site: {
    root,
    url: "https://barramovilmendoza.com.ar",
    title: "BARTENDER GROUP",
    author: "IDEE",
    logo: 'logo.svg',
    contactUrl: 'https://ideenegocios.com.ar:3001/barra-movil-mendoza'
  },
  assets: {
    img: join(root, img),
    icons: join(root, icons),
    scripts: join(root, scripts),
    styles: join(root, styles)
  },
  files: {
    brandIcons: onlyFilenames(globby.sync(['./sources/img/icons/brands/*'])),
    photos: onlyFilenames(globby.sync(['./images/fotos/*']))
  },
  pages,
  contact: [
    {icon: 'envelope', text: 'bartender.group@gmail.com'},
    {icon: 'phone', text: `261 3830752`},
    {icon: 'facebook', text: '<a href="https://www.facebook.com/PVHeventos/">Bartender Group</a>'}
  ]
}
