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
  plugins: [
     new UglifyJsPlugin({
      sourceMap: true
    })
  ],
  devtool: 'source-map'
};
