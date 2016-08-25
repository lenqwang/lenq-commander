var path = require('path');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var dir = require('./config').buildPath;

module.exports = function(name) {
    var webpackCfg = webpackConfig(name, {
        output: {
            path: path.resolve(process.cwd(), dir),
            filename: '[name].[chunkhash].js',
            chunkFilename: '[name].[chunkhash].chunk.js'
        },
        plugins: [
            new ExtractTextPlugin('[name].[contenthash].css'),
            new webpack.optimize.OccurrenceOrderPlugin(true),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    screw_ie8: true,
                    warnings: false
                },
                mangle: {
                    screw_ie8: true
                },
                output: {
                    comments: false,
                    screw_ie8: true
                }
            })
        ]
    });

    return webpackCfg;
};