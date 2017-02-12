const HandlebarsLayouts = require('handlebars-layouts');
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const _ = require('lodash');

module.exports = function(Handlebars) {

  Handlebars.registerHelper(HandlebarsLayouts(Handlebars));

  Handlebars.registerHelper('json', function(obj) {
    return JSON.stringify(obj);
  });

  Handlebars.registerHelper('removeIndex', function(url) {
    return url.replace('index.html', '');
  });

  Handlebars.registerHelper('formatDate', function(context, options) {
    var format = options.hash.format || "YYYY-MM-DD";

    if (context === "now") {
      context = new Date();
    }

    return moment(context).format(format);
  });

  Handlebars.registerHelper('ifEven', function(conditional, options) {
    if((conditional % 2) == 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('ifOdd', function(conditional, options) {
    if((conditional % 2) != 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('ifCond', function (v1, operator, v2, options) {
      switch (operator) {
          case '==':
              return (v1 == v2) ? options.fn(this) : options.inverse(this);
          case '===':
              return (v1 === v2) ? options.fn(this) : options.inverse(this);
          case '!=':
              return (v1 != v2) ? options.fn(this) : options.inverse(this);
          case '!==':
              return (v1 !== v2) ? options.fn(this) : options.inverse(this);
          case '<':
              return (v1 < v2) ? options.fn(this) : options.inverse(this);
          case '<=':
              return (v1 <= v2) ? options.fn(this) : options.inverse(this);
          case '>':
              return (v1 > v2) ? options.fn(this) : options.inverse(this);
          case '>=':
              return (v1 >= v2) ? options.fn(this) : options.inverse(this);
          case '&&':
              return (v1 && v2) ? options.fn(this) : options.inverse(this);
          case '||':
              return (v1 || v2) ? options.fn(this) : options.inverse(this);
          default:
              return options.inverse(this);
      }
  });

  Handlebars.registerHelper('filesInDir', function(dirPath, ext, options) {
    let filenames = fs.readdirSync(dirPath);
    let regex = new RegExp(`^.*\.${ext}$`, 'gi');
    let res = '';

    filenames = ext === '*'
      ? filenames
      : filenames.filter((filename) => regex.test(filename));

    filenames.forEach((filename) => {
      res += options.fn(filename);
    });

    return res;
  });

  Handlebars.registerHelper('range', function(from, to, options) {
    if(from > to) {
      let temp = to;
      to = from;
      from = temp;
    }

    let res = '';
    for(var i = from; i <= to; i++) {
      res += options.fn(i);
    }

    return res;
  });

  Handlebars.registerHelper('difference', function(arr1, arr2, options) {
    let uniques = [];

    arr1.forEach(el1 => {
      let el2 = arr2.filter(arrEl => arrEl.name === el1.name)[0];

      uniques.push({
        name: el1.name,
        items: _.differenceWith(el1.items, el2.items, _.isEqual)
      });
    });

    return uniques;
  });

};
