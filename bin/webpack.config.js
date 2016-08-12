var path = require('path');
var webpack = require('webpack');

module.exports = function(entry, opts) {
	return {
		entry: path.resolve(process.cwd(), entry),

		output: Object.assign({
			path: path.resolve(process.cwd(), ''),
			publicPath: '/'
		}, opts.output),

		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader',
					exclude: /node_modules/,
					query: {
						presets: ['es2015', 'stage-0', 'stage-1', 'stage-2', 'stage-3']
					}
				}
			]
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