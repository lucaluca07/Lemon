const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');
const base = require('./webpack.base');

module.exports  = merge(base, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 9000,
  },
  performance: {
    hints: false,
  },
});