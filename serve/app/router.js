'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/study/query', controller.study.query);
  router.get('/study/path', controller.study.path);
  router.get('/study/params/:id', controller.study.params);
  router.post('/study/body', controller.study.body)
  router.get('/study/serviceList', controller.study.serviceList)

  // 测试操作
  router.all('/test/*', controller.test.index)
  // router.get('/*', controller.test.index)

  // 日志操作
  router.get('/log/findById', controller.log.findByIP)

  // 身份认真
  router.post('/auth/login', controller.auth.login)
  router.post('/auth/register', controller.auth.register)
};
