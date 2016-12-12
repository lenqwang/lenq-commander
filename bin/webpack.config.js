var path = require('path');
var webpack = require('webpack');
var es3ifyPlugin = require('es3ify-webpack-plugin');

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
				loader: 'babel',
				exclude: /node_modules/,
				query: {
					presets: ['es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
				}
			}, {
				test: /\.css$/,
				exclude: /node_modules/,
				loaders: ['style', 'css']
			}, {
				test: /\.scss$/,
				exclude: /node_modules/,
				loaders: [
					'style', 
					'css', 
					{
						loader: 'autoprefixer',
						query: {
							browsers: ["last 2 version", "IE >= 9", "Firefox 15"]
						}
					}, 
					'sass'
				]
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file'
			}, {
				test: /\.(jpg|png|gif)$/,
				loaders: [
					'file',
					'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
				]
			}, {
				test: /\.json$/,
				loader: 'json'
			}, {
				test: /\.(mp4|webm)$/,
				loader: 'url',
				query: {
					limit: 10000
				}
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
			}),
			new es3ifyPlugin()
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