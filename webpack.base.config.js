var webpack = require('webpack'),
    path = require('path'),
    glob = require('glob'),
    MiniCssExtractPlugin = require("mini-css-extract-plugin"),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    VueLoaderPlugin = require('vue-loader/lib/plugin'),
    projectRoot = path.resolve(__dirname, '../'),
    buildPath = path.resolve(__dirname, 'build'),
    isHot = path.basename(require.main.filename) === 'webpack-dev-server.js',
    IS_ENV = process.env.NODE_ENV == 'production';

// 自动发现入口文件
function getEntry(globPath, pathDir) {
	var files = glob.sync(globPath);
	var entries = {},
		entry, dirname, basename, pathname, extname;

	for (var i = 0; i < files.length; i++) {
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.join(dirname, basename);
		pathname = pathDir ? pathname.replace(new RegExp('^' + pathDir), '') : pathname;
		entries[basename] = ['./' + entry];
	}
	return entries;
}

var entries = getEntry('src/entry/*.js');
var chunks = Object.keys(entries);

var config = {
  //context: path.resolve('src'),
  devtool: 'source-map',
  entry: entries,
  output: {
    path: buildPath,
    filename: '[name].js?[hash]',
    publicPath: '/',
    //指定开发时热部署生成临时文件的位置，保持目录干净
    hotUpdateChunkFilename : '../temp/hot-update.js',
    hotUpdateMainFilename : '../temp/hot-update.json'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          // 'css-hot-loader',
          isHot ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
        ]
      },
      {
        test: /\.(jpg|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader',
        options: {
          outputPath : 'statics'
        }
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
  optimization : {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test : /[\\/]node_modules[\\/]/,
          chunks: "all",
          name: "vendors",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}

var pages = Object.keys(getEntry('./src/template/*.html'));
pages.forEach(function(pathname) {
	var conf = {
		filename:  pathname + '.html', //生成的html存放路径，相对于path
		template:  'src/template/' + pathname + '.html', //html模板路径
		inject: false,	//js插入的位置，true/'head'/'body'/false
		/*
		* 压缩这块，调用了html-minify，会导致压缩时候的很多html语法检查问题，
		* 如在html标签属性上使用{{...}}表达式，所以很多情况下并不需要在此配置压缩项，
		* 另外，UglifyJsPlugin会在压缩代码的时候连同html一起压缩。
		* 为避免压缩html，需要在html-loader上配置'html?-minimize'，见loaders中html-loader的配置。
		 */
		// minify: { //压缩HTML文件
		// 	removeComments: true, //移除HTML中的注释
		// 	collapseWhitespace: false //删除空白符与换行符
		// }
	};
	if (pathname in config.entry) {
		conf.inject = 'body';
		conf.chunks = ['vendors', pathname];
		conf.hash = true;
	}
	config.plugins.push(new HtmlWebpackPlugin(conf));
});

module.exports = config;
