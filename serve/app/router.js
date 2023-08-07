"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/study/query", controller.study.query);
  router.get("/study/path", controller.study.path);
  router.get("/study/params/:id", controller.study.params);
  router.post("/study/body", controller.study.body);
  router.get("/study/serviceList", controller.study.serviceList);

  // 测试操作
  router.all("/test/*", controller.test.index);
  router.get("/study/test", controller.study.test);

  // 日志操作
  router.get("/log/findById", controller.log.findByIP);

  // 身份认真
  router.post("/auth/login", controller.auth.login);
  router.post("/auth/register", controller.auth.register);

  // 团队管理
  router.post("/teams/create", controller.teams.create);
  router.delete("/teams/:team_id", controller.teams.remove);
  router.put("/teams/:team_id", controller.teams.update);
  router.put("/teams/:team_id/transfer", controller.teams.transferOwnership);
  router.get("/teams/:team_id", controller.teams.findTeamById);

  // 项目管理
  router.post("/project/create", controller.project.create);
  router.delete("/project/:project_id", controller.project.remove);
  router.get("/project/:project_id", controller.project.show);
  router.get("/project/team/:team_id", controller.project.findByTeamId);

  // 成员管理
  router.post("/menber/addMember", controller.menber.create);
  router.delete("/menber/:member_id", controller.menber.remove);
  router.put("/menber/:member_id", controller.menber.updateRole);
  router.get(
    "/menber/findByProject/:project_id",
    controller.menber.findByProjectId
  );

  // 权限管理
  router.get("/role", controller.role.findAll);

  // 接口管理
  router.get("/api/dir/:projectId", controller.api.getDirByPid);
  router.post("/api/mkdir", controller.api.createDir);
  router.delete("/api/deldir/:dirId", controller.api.deleteDir);

  router.post("/api/create", controller.api.createApi);

  // swagger
  router.post("/swagger/text/json", controller.swagger.parseJsonText);
  // router.post("/swagger/text/yml", controller.swagger.parseJsonText);
  // router.post("/swagger/file/json", controller.swagger.parseJsonFile);
  // router.post("/swagger/file/yml", controller.swagger.parseJsonFile);
};
