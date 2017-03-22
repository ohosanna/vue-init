## 前言
```
vue + vue-router + webpack + sass 项目基本配置
```
github:[https://github.com/lzxb/vue2-demo](https://github.com/lzxb/vue2-demo)

## 源码说明
### 项目目录说明
```
.
|-- build                            // 编译后文件目录
|-- src                              // 源码目录
|   |-- components                   // 公共组件
|       |-- header.vue               // 页面头部公共组件
|   |-- config                       // 路由配置和程序的基本信息配置
|       |-- routes.js                // 配置页面路由
|   |-- assets                       // 各种资源文件
|       |-- stylesheets              // 样式表文件夹
|           |-- app.scss             // scss 样式入口文件
|       |-- images                   // 静态图片文件夹
|       |-- fonts                    // 字体文件夹
|   |-- pages                        // 页面组件
|       |-- Welcome                  // 欢迎页面
|       |-- login                    // 登录
|   |-- store                        // vuex的状态管理
|       |-- index.js                 // 加载各种store模块
|       |-- user.js                  // 用户store
|   |-- index.html                   // 程序入口html文件
|   |-- app.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- webpack.config.js                // 程序打包配置
|-- server.js                        // 代理服务器配置
|-- README.md                        // 项目说明
|-- package.json                     // 配置项目相关信息，通过执行 npm init 命令创建
.
```

### 开发环境依赖模块说明
#### webpack相关模块
```
webpack                               // 用来构建打包程序
webpack-dev-server                    // 开发环境下，设置代理服务器
html-webpack-plugin                   // html 文件编译
url-loader                            // 图片  转化成base64格式
file-loader                           // 字体  将字体文件打包
css-loader                            // css  生成
sass-loader                           // css  预处理器less的webpack插件
style-loader                          // css  插入到style标签
autoprefixer-loader                   // css  浏览器兼容性问题处理
babel-core                            // ES6  代码转换器
babel-loader                          // ES6  代码转换器，webpack插件
babel-preset-es2015                   // ES6  代码编译成现在浏览器支持的ES5
vue-loader                            // vue  组件编译
```

### 生产模块依赖说明
#### vue全家桶
```
vue                                   // 构建用户界面的
vue-router                            // 路由
vuex                                  // 组件状态管理
```


### 运行程序 
```
npm install
npm run dev
http://localhost:5000
```
