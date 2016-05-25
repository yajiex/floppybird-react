var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, './src/jsx/index.jsx'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /node_moduels/
      },
      {
        test: /\.(png|psd|)$/,
        loader: 'url-loader?limit=8192',
        exclude: /node_modules/
      },
      {
        test: /\.ogg$/,
        loader: 'file-loader',
        exclude: /node_modules/
      }
    ]
  },
};