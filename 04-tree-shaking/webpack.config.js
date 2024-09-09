// webpack.config.js
const path = require('path');

 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { devtools } = require('globals');

module.exports = {
    mode:'development',
    devtool:'inline-source-map',
    devServer:{
        static: './dist',
    },
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin()
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        // usedExports: true,
     
    }

};