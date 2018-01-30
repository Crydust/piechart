const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'piechart',
		libraryTarget: 'var'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env']
					}
				}
			}
		],
	},
	plugins: [
		new UglifyJsPlugin({
			sourceMap: true
		})
	],
	devtool: 'source-map'
};
