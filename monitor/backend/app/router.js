'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/monitor/error', controller.monitor.index);
  // 添加上传路由
  router.post('/monitor/sourcemap',controller.monitor.upload)
};

