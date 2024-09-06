const path = require('path');
 

// 打包分析
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
    output: {
        filename: 'js/dev-[name]-bundle.js',
        path: path.resolve(__dirname, '../dist-dev'),
       
    },
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        static: './dist-dev'
    },
    module: {
        rules: [
            {
                test: /\.jpeg$/,
                type: 'asset/resource', // 将资源输出到对应目录，返回资源路径
                generator: {
                    filename: 'images/dev-[name][ext]'
                }
            },
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ],

 
}
