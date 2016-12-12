var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var config = require('./config');
var dir = config.compilePath;

function resolveApp(relativePath) {
  return path.resolve(relativePath);
}

module.exports = function(name) {
  var webpackCfg = webpackConfig([
    require.resolve('webpack-dev-server/client') + '?/http://localhost:' + config.port,
    require.resolve('webpack/hot/dev-server'),
    require.resolve('./polyfills'),
    path.join(resolveApp('.'), name)
  ], {
    output: {
      path: path.resolve(process.cwd(), dir),
      filename: '[name].js'
        // chunkFilename: '[name].chunk.js'
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
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