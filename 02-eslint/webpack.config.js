// webpack.config.js
const path = require('path');

// eslint 配置
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode:'development',
    devServer:{
        static: './dist',
    },
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new ESLintPlugin({
            // fix: true, // 自动修复
            extensions: ['js'], // 检查的文件后缀
            exclude: ['node_modules'], // 排除的文件目录
            // context: path.resolve(__dirname, 'src'), // 检查的文件目录
            //  检查除了src外 其他js文件
            context: path.resolve(__dirname),

        }),
        new HtmlWebpackPlugin()

    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },

};