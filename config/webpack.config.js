const {merge} = require('webpack-merge');
const devConfig = require('./webpack.config.development');
const prodConfig = require('./webpack.config.production');
const commonConfig = require('./webpack.config.common');
module.exports = (env) => {
  if (env.production) {
    return merge(commonConfig, prodConfig);
  }if (env.development) {
    return merge(commonConfig, devConfig);
  }else{
    // 默认开发环境
    console.warn('未指定环境，默认使用开发环境配置  ');
    return merge(commonConfig, devConfig);
  }
  
  
}
