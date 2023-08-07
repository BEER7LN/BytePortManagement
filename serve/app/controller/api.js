"use strict";

const Controller = require("egg").Controller;

class ApiController extends Controller {
  async getDirByPid() {
    const { ctx, service } = this;
    const { projectId } = ctx.params;

    const result = await ctx.service.api.getByProjectId(projectId);
    service.response.Successful(result);
  }

  async createDir() {
    const { ctx, service } = this;
    const { parent_id, name, project_id } = ctx.request.body;

    try {
      await ctx.service.api.createDir({ parent_id, name, project_id });
      service.response.Successful();
    } catch (err) {
      service.response.Error();
    }
  }

  async deleteDir() {
    const { ctx, service } = this;
    const { dirId } = ctx.params;

    try {
      await ctx.service.api.deleteDir(dirId);
      service.response.Successful();
    } catch (err) {
      service.response.Error(err);
    }
  }

  async createApi() {
    const { ctx, service } = this;
    const { dir_id, path, type, summary, parameters } = ctx.request.body;

    try {
      await ctx.service.api.createApi({
        dir_id,
        path,
        type,
        summary,
        parameters,
      });
      service.response.Successful();
    } catch (err) {
      service.response.NotFound();
    }
  }
}

module.exports = ApiController;
