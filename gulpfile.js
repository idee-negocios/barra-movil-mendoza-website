// Common
var path = require('path');
var argv = require('minimist')(process.argv.slice(2));
var gulp = require('gulp');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');

var Metalsmith = require('metalsmith');

// Assets
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var webpack = require('webpack');

// Site
var config = require('./config');

// Handlebars
var Handlebars = require('handlebars');
var HandlebarsLib = require('./lib/handlebars')(Handlebars);

// Configuration
var args = {
  build: !!argv.build,
  production: !!argv.production
};

// Metalsmith
function setupMetalsmith(callback) {
  var ms = new Metalsmith(process.cwd());
  var msconfig = config.metalsmith || {};
  var msplugins = msconfig.plugins || {};

  ms.source(msconfig.config.contentRoot);
  ms.destination(msconfig.config.destRoot);
  ms.metadata(msconfig.metadata);

  Object.keys(msplugins).forEach(function(key) {
    var plugin = require(key);
    var options = msplugins[key];

    if (options._metalsmith_if !== undefined) {
      var condition = false;
      if (options._metalsmith_if === "production") {
        condition = argv.production;
      } else if (options._metalsmith_if === "build") {
        condition = argv.build;
      }

      if (condition) {
        options._metalsmith_if = undefined;
        delete options._metalsmith_if;
        ms.use(plugin(options));
      }
    } else {
      ms.use(plugin(options));
    }
  });

  ms.build(function(err) {
    if (err) {
      console.log(err);
      return callback(err);
    }

    callback();
  });
}

//Gulp tasks

gulp.task('metalsmith', function(callback) {
  setupMetalsmith(callback);
});

gulp.task('vendor-scripts', function() {
  return gulp.src(config.vendor.scripts)
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.join(__dirname, config.metalsmith.config.assetRoot, 'assets')));
});

gulp.task('vendor-styles', function() {
  return gulp.src(config.vendor.styles)
    .pipe(concat('vendor.css'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.join(__dirname, config.metalsmith.config.assetRoot, 'assets')));
});

gulp.task('vendor', ['vendor-scripts', 'vendor-styles']);

gulp.task('styles', function() {
  return gulp.src(path.join(__dirname, config.metalsmith.config.styleRoot, 'app.scss'))
    .pipe(sass({
      sourceComments: args.production ? false : true,
      outputStyle: args.production ? 'compressed' : 'expanded',
      includePaths: config.styles.include,
      errLogToConsole: true,
      onError: console.log
    }))
    .pipe(autoprefixer({
      browsers: config.styles.prefix,
      cascade: false
    }))
    .pipe(gulp.dest(path.join(__dirname, config.metalsmith.config.assetRoot, 'assets')));
});

gulp.task('webpack', function(callback) {
  var webpackPlugins = [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(args.production ? 'production' : 'development'),
        },
      })
  ];

  if (args.production) {
    webpackPlugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  }

  var webpackConfig = {
    context: path.join(__dirname, config.metalsmith.config.scriptRoot),
    entry: {
      app: './app.js',
      vendor: ['jquery']
    },
    output: {
      path: path.join(__dirname, config.metalsmith.config.assetRoot, 'assets'),
      filename: 'app.js'
    },
    resolveLoader: {
      root: path.join(__dirname, 'node_modules')
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader',
          query: {
            presets: ['es2015']
          }
        }
      ]
    },
    plugins: webpackPlugins
  };

  webpack(webpackConfig, function(err, stats) {
    if (err) {
      return callback(err);
    }

    //console.log(stats.toString({}));
    callback();
  });
});

gulp.task('scripts', ['webpack']);

gulp.task('watch', ['default'], function() {
  gulp.watch(['gulpfile.js', 'config.js'], ['default']);
  gulp.watch([config.metalsmith.config.styleRoot+'/**/*'], ['styles']);
  gulp.watch([config.metalsmith.config.scriptRoot+'/**/*'], ['scripts']);
  gulp.watch([
    config.metalsmith.config.contentRoot+'/**/*',
    config.metalsmith.config.layoutRoot+'/**/*',
    config.metalsmith.config.assetRoot+'/**/*'
  ], ['metalsmith']);
});

gulp.task('server', ['default', 'watch'], function(callback) {
  var http = require('http');
  var serveStatic = require('serve-static');
  var finalhandler = require('finalhandler');

  var serve = serveStatic(config.metalsmith.config.destRoot, {
    "index": ['index.html', 'index.htm']
  });

  var server = http.createServer(function(req, res){
    var done = finalhandler(req, res);
    serve(req, res, done);
  })

  var serverPort = 4000;
  if (argv.port) {
    serverPort = parseInt(argv.port);
  }

  server.listen(serverPort, function() {
    console.log("Server: http://localhost:%s", serverPort);
    callback();
  });
});

gulp.task('default', ['vendor', 'scripts', 'styles', 'metalsmith']);
