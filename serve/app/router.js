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

  router.all('/test/*', controller.test.index)
  router.get('/*', controller.test.index)


};
