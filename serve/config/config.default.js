/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1690336938012_1225';

  // 开启的中间件
  config.middleware = ['beforelog'];

  // mysql SQL 配置
  config.mysql = {
    client: {
      // host
      host: "",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "123456",
      // 数据库名
      database: "database1",
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // 是否开启反向代理
  // config.proxy = true;

  // 关闭安全验证
  config.security = {
    csrf: {
      enable: false,
    },
  };
  
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
