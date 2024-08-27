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
        clean: true, // 清除dist文件夹
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
}