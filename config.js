var data = require('./data');

module.exports = {
  "vendor": {
    "scripts": "./vendor/js/**/*.js",
    "styles": "./vendor/css/**/*.css"
  },
  "scripts": {},
  "styles": {
    "prefix": ["> 1%", "last 2 versions", "IE >= 9"],
    "include": ['./node_modules']
  },
  "metalsmith": {
    "metadata": data,
    "config": {
      "contentRoot": "./content",
      "assetRoot": "./sources",
      "scriptRoot": "./scripts",
      "styleRoot": "./styles",
      "layoutRoot": "./layouts",
      "destRoot": "./build"
    },
    "plugins": {
      "metalsmith-drafts": {},
      "metalsmith-markdown": {
        "smartypants": true,
        "smartLists": true,
        "gfm": true,
        "tables": true
      },
      "metalsmith-excerpts": {},
      "metalsmith-permalinks": {
        "pattern": ":collection/:title"
      },
      "metalsmith-collections": {
        "blog": {
          "sortBy": "date",
          "reverse": true
        }
      },
      "metalsmith-pagination": {
        "collections.blog": {
          "perPage": 6,
          "layout": "blog.html",
          "first": "blog/index.html",
          "noPageOne": true,
          "path": "blog/:num/index.html"
        }
      },
      "metalsmith-layouts": {
        "engine": "handlebars",
        "directory": "./layouts",
        "partials": "./layouts/partials"
      },
      "metalsmith-assets": {
        "source": "./sources",
        "destination": "./"
      },
      "metalsmith-html-minifier": {
        "_metalsmith_if": "production",
        "removeAttributeQuotes": false,
        "keepClosingSlash": true
      },
      "metalsmith-metadata": {
      }
    }
  }
}
