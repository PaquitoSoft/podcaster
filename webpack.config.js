var webpack = require('webpack');

module.exports = {
	entry: './app/js/app.js',
	output: {
		path: './build/js',
		filename: 'podcaster-app.js'
	},
	// resolveLoader: {
	//	// I need this to allow using locally linked npm modules
	//	root: require('path').join(__dirname, 'node_modules')
	// },
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},

			{
				test: /\.html$/,
				loader: 'raw'
			}
		]
	},
	// This is to load polyfills (http://mts.io/2015/04/08/webpack-shims-polyfills/)
	plugins: [
		new webpack.ProvidePlugin({
			fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
			'es6-promise': 'es6-promise'
		})
	]
};