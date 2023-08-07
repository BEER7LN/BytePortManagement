"use strict";

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: "egg-cors",
  },
  // mysql 插件
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
};
