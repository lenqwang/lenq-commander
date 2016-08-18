var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var dir = require('./config').compilePath;

module.exports = function(name) {
  var webpackCfg = webpackConfig(name, {
    output: {
      path: path.resolve(process.cwd(), dir),
      filename: '[name].js'
        // chunkFilename: '[name].chunk.js'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        children: true,
        minChunks: 2,
        async: true
      })
    ]
  });

  return webpackCfg;
};