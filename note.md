# webpack

## 开始 如何使用webpack打包
1. 初始化项目
```bash
npm init -y
``` 
2. 安装webpack
```bash
npm install webpack webpack-cli --save-dev
```
3. 直接使用命令行执行webpack，默认会打包src目录下的index.js文件，打包后的文件会输出到dist目录下，或者配置webpack.config.js文件。
```bash
npx webpack
```
- 文件目录结构
```
├── dist
│   └── main.js
├── package.json
├── src
│   └── index.js
└── webpack.config.js
```
- webpack.config.js文件
```javascript
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

## 如何解决自动将打包好的,一个或多个bundle文件放到html中
1. 安装html-webpack-plugin
```bash
npm install html-webpack-plugin --save-dev
```
2. 配置webpack.config.js文件
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
    func: './src/func.js',
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html' // 可以选用自定义模板文件
      filename: 'index.html' // 打包后的文件名
      inject: 'body' // scirpt标签插入的位置默认是head，可以改为body
    })
  ]
}

```

## 配置开发环境
1. mode 配置 webpack 的运行环境，默认是production，可以设置为development, 也可以为none
- mode: 'development'  // 开发环境
- mode: 'production'  // 生产环境
- mode: 'none'  // 不设置环境

2. 解决(**开发环境**)代码报错位置难以定位的问题。打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。
- 使用 source map 可以帮助将编译后的代码映射回原始源代码, 通过配置webpack.config.js文件中的devtool选项。
```javascript
 module.exports = {
   mode: 'development',
   entry: {
     index: './src/index.js',
     print: './src/print.js',
   },
    devtool: 'inline-source-map', 
 }
 ```
 3. 使用观察模式，在文件发生变化时自动重新编译，不需要手动运行webpack命令，运行后命令不会结束，会一直监听文件的变化。文件发生变化后，webpack会自动重新编译。
```bash
npx webpack --watch
```
4. 使用webpack-dev-server，在开发环境中实时重新加载页面，无需手动刷新页面。
- **区别于-- watch 模式，webpack-dev-server 在编译之后不会写入任何输出文件，而是将 bundle 文件保留在内存中，然后将它们作为可访问资源部署在 server 中，并且热模块替换(HMR)功能。** 
- 安装webpack-dev-server
```bash
npm install webpack-dev-server --save-dev
```
- 配置webpack.config.js文件
```javascript
module.exports = {
  mode: 'development',
  devServer: {
    static: './dist',
  }
}
```
- 运行webpack-dev-server
```bash
npx webpack serve
```
5. 使用node的中间件 webpack-dev-middleware，将webpack编译的文件传递给一个服务器，可以与express等服务器框架一起使用。