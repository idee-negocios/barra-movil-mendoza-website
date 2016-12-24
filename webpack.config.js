module.exports = (entry, dest, filename) => {
  return {
    entry: entry,
    output: {
      path: dest,
      filename: filename
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
    }
  };
};
