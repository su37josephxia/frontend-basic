/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // 静态服务位置
  config.static = {
    dir: path.resolve(appInfo.baseDir,'../frontend/source-map/dist/')

  };

  path.join(appInfo.baseDir, 'app/public')

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1580737690789_267';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
