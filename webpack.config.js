const webpack = require('webpack'),
  path = require('path'),
  config = require('./webpack.base.config');

config.resolve.alias = {
  'vue$': 'vue/dist/vue.common.js'
}

module.exports = (env) => {
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
            }
        }),
    )
    return config
};


