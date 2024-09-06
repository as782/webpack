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

## 资源管理

webpack 中默认能够解析的文件类型有：.js、.json，除此之外的其他类型文件需要通过 loader 进行解析。

### loader

loader 用于将非 JavaScript 文件转换为 webpack 可以理解的模块。webpack 本身只能理解 JavaScript，其他类型的文件需要通过 loader 进行转换。loader 可以链式调用，从后往前执行。

1. css-loader
2. style-loader
3. babel-loader
4. ts-loader
5. webpack5 内置了 file-loader 和 url-loader，用于处理图片、字体等资源文件。可以配置类型 type:asset/resource 或 asset/inline ,或 asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。
6. thread-loader 多进程打包，可以加快打包速度

- **babel-loader** : 将 ES6+ 代码转换为 ES5 代码，以便在旧版浏览器中运行。需要安装 @babel/core、@babel/preset-env 和 babel-loader，详情见 [babel-loader](https://www.webpackjs.com/loaders/babel-loader/)。

### plugins

插件用于扩展 webpack 的功能，可以在 webpack 的构建过程中执行各种任务。插件通常用于优化构建过程、生成额外的文件等。插件通常需要通过 npm 安装，然后在 webpack 配置文件中引入并使用。
常用的插件：

- html-webpack-plugin
- min-css-extract-plugin
- css-minimizer-webpack-plugin
- webpack-bundle-analyzer

## 分割代码

把代码分离到不同的 bundle 中，然后便能按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle、控制资源加载优先级，可以减小加载时间。
分割代码的方法有：

1. 入口起点：使用 entry 配置手动分离代码。
   在 entry 中配置多个入口, 但会导致相同的模块重复打包。

```js
module.exports = {
  entry: {
    index: "./src/index.js",
    print: "./src/print.js",
  },
};
```

2. 防止重复：使用 dependOn 共享一些公共模块，或使用 SplitChunksPlugin 去重和分离 chunk。

```js
module.exports = {
  entry: {
    index: {
      import: "./src/index.js",
      dependOn: "public-m",
    },
    print: {
      import: "./src/print.js",
      dependOn: "public-m",
    },
    "public-m": ["lodash", "axios"],
  },
};
// 使用插件
module.exports = {
  //···
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};
```

3. 动态导入：内部通过 import()语法来动态导入模块，当 webpack 解析到 import() 语法时，会自动进行代码分割。 只有使用到时在加载分出的那个 bundle.
   webpack 还支持通过魔法注释来指定分割后的 chunk 名称，以及预获取和预加载文件

- webpackChunkName: 'print' // 指定分割后的 chunk 名称
- webpackPrefetch: true // 预获取，会在浏览器闲置时加载文件
- webpackPreload: true // 预加载，会在父 chunk 加载时加载文件
  **两者区别**：prefetch 会在浏览器闲置时加载文件，preload 会在父 chunk 加载时加载文件，prefetch 加载的文件优先级较低，preload 加载的文件优先级较高。简单说就是前者是加载那些某个时间段可能会用到的文件，后者是遇到了就马上并行加载就要用到的文件。 详情见 [代码分割](https://www.webpackjs.com/guides/code-splitting)。

### 分析打包结果

使用 webpack-bundle-analyzer 插件，可以生成一个可视化的 webpack 打包结果报告，方便我们分析打包结果，找出打包过程中的性能瓶颈。

```js
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  //···
  plugins: [new BundleAnalyzerPlugin()],
};
```

### 第三方库的分离

webpack 默认会将第三方库（如 lodash）打包到每一个入口 chunk 中，这会导致重复打包。为了解决这个问题，可以使用 SplitChunksPlugin 插件，将第三方库分离到单独的 chunk 中。

```js
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
```

## 配置文件，区分环境

module.exports 可以配置成一个函数可以获取命令运行时的参数： module.exports= (env ) => { return{...}}
根据不同的环境生成不同的配置文件，相同的配置就提取为公共配置，最后使用 webpack-merge 插件来合并配置文件，

```js
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const dev = require("./webpack.dev.js");
const prod = require("./webpack.prod.js");

module.exports = (env) => {
  if (env.production) {
    return merge(common, prod);
  } else {
    return merge(common, dev);
  }
};
```

运行命令时使用 --env.production 或 --env.development 来指定环境。

```bash
npx webpack -c webpack.config.js --env.production
```

## 热模块替换和热重载

## source map

## devServer

## Eslint 在 webpack 中配置

webpack 中使用之前可以使用 eslint-loader 来加载 eslint，后续通过使用配置 eslint-webpack-plugin 来配置 [eslint-webpack-plugin](https://www.webpackjs.com/plugins/eslint-webpack-plugin/#getting-started) 插件

```js
// eslint-webpack-plugin
const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = {
  //···
  plugins: [
    new ESLintPlugin({
      // fix: true, // 自动修复
      extensions: ["js"], // 检查的文件后缀
      exclude: ["node_modules"], // 排除的文件目录
      context: path.resolve(__dirname, "src"), // 检查的文件目录
    }),
  ],
};
```

项目中配置 .eslintrc.js 文件 和下载依赖 eslint
最新的 config, 需要 eslint.config.js/cjs/mjs 文件

```js
// .eslintrc.js
// module.exports = {
//   env: {
//     browser: true, // 适用于浏览器环境
//     es2021: true, // 支持 ES2021 及其特性
//   },
//   parserOptions: {
//     ecmaVersion: 12, // ES2021 语法版本（可以根据需要设置为 6, 8, 12 等）
//     sourceType: "module", // 使用 ES Module 语法
//   },
//   // 使用流行规则
//   // extends: ["eslint:recommended"],
//   rules: {
//     semi: "error", // 强制在语句末尾使用分号

//     "no-console": 1, // 禁止使用console
//     "no-var": 2, // 禁止使用var
//     "no-unused-vars": 2, // 禁止出现未使用的变量
//     "no-undef": 2, // 允许出现未定义的变量
//     // ...其他规则
//   },
// };

// eslint.config.js
const globals = require("globals");

module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
    },
    ignores: ["dist/**/*", "**.config.js"], // 忽略dist目录,忽略**.config.js
    rules: {
      semi: "error",
      "no-console": "warn",
      "no-var": "error",
      "no-unused-vars": "error",
      "no-undef": "error",
    },
  },
];
```

## git hook

git hook 可以在 git 操作时自动执行一些脚本， 就比如说在 commit 之前自动执行 eslint 检查，如果检查不通过则不允许提交代码。

1. 手动添加文件

- hooks 的目录在 .git/hooks 中，创建一个 pre-commit 文件，内容如下：

```bash
#!/bin/sh  这个注释，我在window，下要有不然 会报错 spwn: No such file or directory:
echo "ssss自定义HOOK pre-commit 执行中..."

# 1. 检查代码格式
pnpm eslint

```

- 给文件添加执行权限

```bash
chmod +x .git/hooks/pre-commit
```

2. 或者创建自定义 hooks 文件目录 .githooks，在目录中创建 pre-commit 文件，内容同上。但是需要修改 .git/config 文件，添加如下内容：

```bash
git config core.hooksPath .githooks
```

3. 使用 husky 插件

```bash
pnpm add husky -D
```

在.husky 文件夹中创建 pre-commit 文件

```bash

echo "husky pre-commit 执行中..."

# 1. 检查代码格式
pnpm eslint
```
