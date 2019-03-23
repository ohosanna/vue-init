const path = require('path'),
      webpack = require('webpack'),
      MiniCssExtractPlugin = require("mini-css-extract-plugin"),
      config = require('./webpack.config.base');

config.plugins.push(
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].min.css',
      chunkFilename: 'css/[id].css'
    }),
)

module.exports = config;
