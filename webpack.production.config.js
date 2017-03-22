var webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    path = require('path'),
    buildPath = path.resolve(__dirname, 'build');

module.exports = {
  context: path.resolve('src'),
  entry: [
    './main.js'
  ],
  output: {
    path: buildPath,
    filename: '[name].js?[hash]'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: "css-loader", options: {
                sourceMap: false
              }
            },
            {
              loader: "sass-loader", options: {
                sourceMap: false
              }
            }
          ]
        })
        //loaders: ["style", "css?sourceMap", "sass?sourceMap"]
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
    extensions: ['.js', '.vue'],
    alias: {
      'vue$': 'vue/dist/vue.common.js'  //为了使用 template 选项，使用独立构建
    }
  },
  plugins: [
    new ExtractTextPlugin({filename: 'style.css', allChunks: true }),
    new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
      filename: buildPath + '/index.html', //生成的html存放路径
      template: './index.html', //html模板路径
    }),
    //生产环境配置
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    //删除代码块内的警告语句
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
