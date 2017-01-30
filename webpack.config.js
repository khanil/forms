var path = require('path');
var webpack = require('webpack');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var ContextReplacementPlugin = webpack.ContextReplacementPlugin;
var env = process.env.WEBPACK_ENV;

var libraryName = 'react-super-forms';
var plugins = [], outputFile;

plugins.push(new ContextReplacementPlugin(/moment[\\\/]locale$/, /^\.\/(ru)$/));

if (env == 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
  devtool = null;
} else {
  outputFile = libraryName + '.js';
  devtool = 'eval';
}

var config = {
  entry: __dirname + '/src/index.js',
  devtool: devtool,
  output: {
    path: __dirname + '/dist',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;