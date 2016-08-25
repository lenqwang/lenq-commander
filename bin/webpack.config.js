var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(entry, opts) {
	return {
		entry: Array.isArray(entry) ? entry : path.resolve(process.cwd(), entry),

		output: Object.assign({
			path: path.resolve(process.cwd(), ''),
			publicPath: '/'
		}, opts.output),

		module: {
			loaders: [{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
				}
			}, {
				test: /\.css$/,
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader']
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: ['style-loader', 'css-loader', 'autoprefixer-loader?{browsers: ["last 2 version", "IE >= 9", "Firefox 15"]}', 'sass-loader']
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader'
			}, {
				test: /\.(jpg|png|gif)$/,
				loaders: [
					'file-loader',
					'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
				]
			}, {
				test: /\.json$/,
				loader: 'json-loader'
			}, {
				test: /\.(mp4|webm)$/,
				loader: 'url-loader?limit=10000'
			}]
		},

		plugins: opts.plugins.concat([
			// new webpack.ProvidePlugin({
			//           fetch: 'exports?self.fetch!whatwg-fetch'
			//       }),

			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV)
				}
			})
		]),

		resolve: {
			extensions: ['', '.js'],
			packageMains: ['main']
		},

		devtool: 'cleap-source-map',

		target: 'web',

		stats: false,

		cache: false,

		progress: true
	}
}