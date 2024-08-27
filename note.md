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