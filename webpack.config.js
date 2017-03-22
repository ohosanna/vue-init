var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    projectRoot = path.resolve(__dirname, '../'),
    buildPath = path.resolve(__dirname, 'build'),
    IS_ENV = process.env.NODE_ENV == 'production';

module.exports = {
  context: path.resolve('src'),
  entry: [
    './main.js'
  ],
  devtool: 'source-map',
  output: {
    path: buildPath,
    filename: '[name].js?[hash]',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.scss$/,
        //loader: ExtractTextPlugin.extract('css!sass')
        //生成独立的 CSS 文件
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader", options: {
                sourceMap: true
              }
            },
            {
              loader: "sass-loader", options: {
                sourceMap: true
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  externals: {
  },
  resolve: {
    extensions: ['.js', '.vue', 'json'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'  //为了使用 template 选项，使用独立构建
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({filename: 'style.css', allChunks: true }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: buildPath + '/index.html', //生成的html存放路径
      template: './index.html', //html模板路径
    })
  ]
}
