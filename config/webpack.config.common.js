// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 单独提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
 
module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        clean: true, // 清除dist文件夹,
        assetModuleFilename: 'assets/[name]-[hash][ext]'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'HTMLPlugin管理输出aaa',
            template: './index.html',
            filename: 'app.html'

        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name]-[contenthash].css',
        }),


    ],
    module: {
        rules: [
            {
                test: /\.jpeg$/,
                type: 'asset/resource', // 将资源输出到对应目录，返回资源路径
                generator: {
                    filename: 'images/[name]-[contenthash][ext]'
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


    optimization: {
        splitChunks: {
            // chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: 'single',

    }
}
