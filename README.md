# Metalsmith Base

A metalsmith base starter kit. Some features:

- [Metalsmith](http://metalsmith.io/)
- [Gulp](http://gulpjs.com/)
- [Webpack](https://github.com/webpack/webpack)
- [Bootstrap 4](https://github.com/twbs/bootstrap/tree/v4-dev)
- [jQuery](https://github.com/jquery/jquery)
- [Babel / ES6](https://babeljs.io/)
- [Development Server](https://github.com/aboglioli/metalsmith-base/blob/master/gulpfile.js#L179)
- [Static Site, Blog, Robots, Sitemap](https://github.com/aboglioli/metalsmith-base/tree/master/content)
- [MIT license](https://github.com/aboglioli/metalsmith-base/blob/master/LICENSE)

## Install

```
git clone git@github.com:aboglioli/metalsmith-base.git newproject
cd newproject
npm install
```
## Develop

This command will fully build a development version of the site, start the gulp
watchers, and setup a development server. The command output will list the
server address to open in your browser.

```
npm run start
```

## Build

```
npm run build
```

If you want to build your site for production.

```
npm run production
```

*The above command is used by TravisCi.*

## TravisCI and Surge

This project uses [TravisCI](https://travis-ci.org) as Continous Integration
system and [Surge](https://surge.sh) to publish the web site.

## Commands

1. `npm run dev` - Run a development build
1. `npm run start` - Run a development build, start the development server and watchers
1. `npm run debug` - Run a development build in debug mode
1. `npm run production` - Run a production build, compiles assets and minifies
1. `npm run build` - Run a production build and sync with git
1. `npm run watch` - Start the gulp watchers
1. `npm run vendor` - Copies over any vendor files from node_modules to metalsmith assets

All commands can be run directly with: `./node_modules/.bin/gulp`
