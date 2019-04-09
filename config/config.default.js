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
  const config = {};

  // set sqlite3 config here
  config.sequelize = {
    dialect: 'sqlite',
    storage: "/Users/tibbers/Library/Application Support/trustnote-pow-supernode/trustnote.sqlite",
    database: 'main',
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1554797085321_9749';

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
