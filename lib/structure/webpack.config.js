var path = require('path');
var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

var baseDir = path.resolve(__dirname, 'src');
var distDir = path.resolve(__dirname, 'dist');

module.exports = {
	entry: {
		// materiallist: path.resolve(__dirname, 'static/js/res/app/materiallist.js'),
		// materialcreate: path.resolve(__dirname, 'static/js/res/app/materialcreate.js'),
		// materialupdate: path.resolve(__dirname, 'static/js/res/app/materialupdate.js'),
		// imageslist: path.resolve(__dirname, 'static/js/res/app/imageslist.js'),
		// voicelist: path.resolve(__dirname, 'static/js/res/app/voicelist.js'),
		// voicecreate: path.resolve(__dirname, 'static/js/res/app/voicecreate.js'),
		// voiceupdate: path.resolve(__dirname, 'static/js/res/app/voiceupdate.js'),
		// videolist: path.resolve(__dirname, 'static/js/res/app/videolist.js'),
		// videocreate: path.resolve(__dirname, 'static/js/res/app/videocreate.js'),
		// videoupdate: path.resolve(__dirname, 'static/js/res/app/videoupdate.js'),
		// textcreate: path.resolve(__dirname, 'static/js/res/app/textcreate.js'),
		// sy_sucai: path.resolve(__dirname, 'static/js/res/app/sy_sucai.js'),
		// textsent: path.resolve(__dirname, 'static/js/res/app/textsent.js')
		// main: path.resolve(__dirname, 'src/js/main.js')
		app: path.resolve(__dirname, 'src/js/app.js')
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/js/')
	},
	module: {
		loaders: [
			{
				test: /\.less$/,
				loader: 'style!css!less'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules|vue\/dist/,
				query: {
			      presets: ['es2015'],
			      plugins: ['transform-runtime'],
			      cacheDirectory: true
			    }
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.(png|jpg|gif|bmp)$/,
				loader: 'file-loader?name=[path][name].[ext]?[hash]'
			},
			{
				test: require.resolve('jquery'),
				loader: 'expose?$!expose?jQuery'
			}
		]
	},
	resolve: {
		// alias: {
		// 	webuploader: baseDir + '/js/res/vendors/webuploader/dist',
		// 	rescss: baseDir + '/css/dist'
		// }
	},
	// watch: true,
	cache: false
};

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins = [
 //  	new webpack.ProvidePlugin({
	// 	jQuery: 'jquery',
	// 	$: 'jquery',
	// 	'window.jQuery': 'jquery'
	// }),
	new CommonsChunkPlugin('common.js'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
} else {
  module.exports.devtool = '#source-map'
}