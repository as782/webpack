const path = require('path');

// 压缩css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// 压缩js
const TerserPlugin = require("terser-webpack-plugin");


module.exports = {
    output: {
        filename: 'js/[name]-[contenthash]-bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
    },
    mode: 'production',
    optimization: {
        minimizer: [new CssMinimizerPlugin(), new TerserPlugin()], // mode为production时，默认使用css-minimizer-webpack-plugin压缩css
    }
}
