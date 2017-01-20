const globby = require('globby');

function onlyFilenames(arr) {
  return arr.map(el =>
                 el.indexOf('/') === -1
                 ? el
                 : el.substring(el.lastIndexOf('/') + 1, el.length));
}

module.exports = {
  site: {
    root: "/",
    url: "https://barrasmovilesmendoza.com.ar",
    title: "John Jarana",
    author: "Alan Boglioli",
    logo: 'logo.png'
  },
  assets: {
    img: "/img",
    icons: "/img/icons"
  },
  files: {
    brandIcons: onlyFilenames(globby.sync(['./sources/img/icons/brands/*']))
  },
  pages: [
    {url: '/', name: 'Inicio'},
    {url: '/patio-cervecero.html', name: 'Patio cervecero'},
    {url: '/barra-sin-alcohol.html', name: 'Barra sin alcohol'},
    {url: '/eventos-empresariales.html', name: 'Eventos empresariales'},
    {url: '/bodas-y-fiestas.html', name: 'Bodas y fiestas'}
  ],
  contact: [
    {icon: 'phone', text: 'johnjarana@gmail.com'},
    {icon: 'envelope', text: '555 5555'},
    {icon: 'map-marker', text: 'Mapa'}
  ]
}
