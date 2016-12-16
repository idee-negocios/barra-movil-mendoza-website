var HandlebarsLayouts = require('handlebars-layouts');
var moment = require('moment');

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

  Handlebars.registerHelper('if_even', function(conditional, options) {
    if((conditional % 2) == 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  Handlebars.registerHelper('if_odd', function(conditional, options) {
    if((conditional % 2) != 0) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

};
