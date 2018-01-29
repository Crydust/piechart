const path = require('path');

module.exports = {
  entry: {
    piechart: './src/piechart.js',
    datelinechart: './src/datelinechart.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
