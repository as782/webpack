const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 单独提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
    entry: {
        // index: './src/index.js',
        // func: "./src/func.js"

        // 使用dependOn 可以共享依赖，解决重复导入相同模块
        // index:{
        //     import: './src/index.js',
        //     dependOn:"tool-function"
        // },
        // func:{
        //     import: './src/func.js',
        //     dependOn:"tool-function"
        // },
        // 'tool-function': ['lodash']

        // 使用 splitChunksPlugin 提取公共模块
        // index: './src/index.js',
        // func: "./src/func.js"

        // import() 懒加载分离模块
        index: './src/index.js',
        func: "./src/func.js"

    },
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true, // 清除dist文件夹,
        assetModuleFilename: 'assets/[name]-[hash][ext]'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.jpeg$/,
                type: 'asset/resource', // 将资源输出到对应目录，返回资源路径
                generator: {
                    filename: 'images/generator-[name]-[hash][ext]'
                }
            },
            {
                test: /\.svg$/,
                type: 'asset/inline' // 将资源转换为行内形式（如将图片直接转为base64插入到代码中）
            },
            {
                test: /\.txt$/,
                type: 'asset/source' // 将资源原内容返回
            },
            {
                test: /\.jpg|\.png$/,
                type: 'asset', // 自动选择asset/resource 或 asset/inline
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 小于4kb的图片转为base64，大于4kb的图片输出到对应目录
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']

            },
            // 字体
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HTMLPlugin管理输出aaa',
           
            template: './index.html',
            filename: 'app.html'

        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[contenthash].css',
            
        })
    ],
    mode: 'development',
    devServer: {
        static: './dist'
    },
    optimization: {
        minimizer: [new CssMinimizerPlugin()], // mode为production时，默认使用css-minimizer-webpack-plugin压缩css
        splitChunks: {
            chunks: 'all',
        },
        
    }
}