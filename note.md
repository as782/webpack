# webpack

## 开始 如何使用 webpack 打包

1. 初始化项目

```bash
npm init -y
```

2. 安装 webpack

```bash
npm install webpack webpack-cli --save-dev
```

3. 直接使用命令行执行 webpack，默认会打包 src 目录下的 index.js 文件，打包后的文件会输出到 dist 目录下，或者配置 webpack.config.js 文件。

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

- webpack.config.js 文件

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
```

## 如何解决自动将打包好的,一个或多个 bundle 文件放到 html 中

1. 安装 html-webpack-plugin

```bash
npm install html-webpack-plugin --save-dev
```

2. 配置 webpack.config.js 文件

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

1. mode 配置 webpack 的运行环境，默认是 production，可以设置为 development, 也可以为 none

- mode: 'development' // 开发环境
- mode: 'production' // 生产环境
- mode: 'none' // 不设置环境

2. 解决(**开发环境**)代码报错位置难以定位的问题。打包源代码时，可能会很难追踪到错误和警告在源代码中的原始位置。

- 使用 source map 可以帮助将编译后的代码映射回原始源代码, 通过配置 webpack.config.js 文件中的 devtool 选项。

```javascript
module.exports = {
  mode: "development",
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
  devtool: "inline-source-map",
};
```

3.  使用观察模式，在文件发生变化时自动重新编译，不需要手动运行 webpack 命令，运行后命令不会结束，会一直监听文件的变化。文件发生变化后，webpack 会自动重新编译。

```bash
npx webpack --watch
```

4. 使用 webpack-dev-server，在开发环境中实时重新加载页面，无需手动刷新页面。

- **区别于-- watch 模式，webpack-dev-server 在编译之后不会写入任何输出文件，而是将 bundle 文件保留在内存中，然后将它们作为可访问资源部署在 server 中，并且热模块替换(HMR)功能。**
- 安装 webpack-dev-server

```bash
npm install webpack-dev-server --save-dev
```

- 配置 webpack.config.js 文件

```javascript
module.exports = {
  mode: "development",
  devServer: {
    static: "./dist",
  },
};
```

- 运行 webpack-dev-server

```bash
npx webpack serve
```

5. 使用 node 的中间件 webpack-dev-middleware，将 webpack 编译的文件传递给一个服务器，可以与 express 等服务器框架一起使用。

## 如何使用资源模块

1. 在 webpack5 中，资源模块是一种特殊的模块类型，它允许你将任何类型的文件导入到你的 JavaScript 代码中。使用资源模块，可以导入任何类型的文件，包括图片、字体、样式表等，并且 webpack 会自动处理这些文件，并将它们打包到输出目录中。在之前的版本中，需要使用 file-loader、url-loader、raw-loader 等 loader 来处理这些文件。
   资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

- asset/resource 将资源输出到对应目录，返回资源路径。之前通过使用 file-loader 实现。
- asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。**将资源转换为行内形式（如将图片直接转为 base64 插入到代码中）**
- asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。**输出资源的内容**
- asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制实现。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jpg|\.png$/,
        type: "asset", // 自动选择asset/resource 或 asset/inline
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 小于4kb的图片转为base64，大于4kb的图片输出到对应目录
          },
        },
      },
    ],
  },
};
```

- 资源输出的路径和文件名可以通过配置 output 中的 **assetModuleFilename** 属性来指定。也可以在 rules 中通过配置 **generator** 属性来 filename 指定。
