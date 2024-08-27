const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: {
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
                type:'asset/source' // 将资源原内容返回
            },
            {
                test: /\.jpg|\.png$/,
                type:'asset' , // 自动选择asset/resource 或 asset/inline
                parser:{
                    dataUrlCondition:{
                        maxSize:4*1024 // 小于4kb的图片转为base64，大于4kb的图片输出到对应目录
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HTMLPlugin管理输出aaa',
            inject: 'body',
            template: './index.html',
            filename: 'app.html'

        })
    ],
    mode: 'development',
    devServer: {
        static: './dist'
    }
}