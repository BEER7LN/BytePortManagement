"use strict";

const Controller = require("egg").Controller;

class ProjectController extends Controller {
  async create() {
    const { ctx } = this;
    const { team_id, project_type, project_name, project_description } =
      ctx.request.body;

    await ctx.service.project.createProject(
      team_id,
      project_type,
      project_name,
      project_description
    );
    ctx.service.response.Successful();
  }

  async remove() {
    const { ctx } = this;
    const { project_id } = ctx.params;

    await ctx.service.project.deleteProject(project_id);
    ctx.service.response.Successful();
  }

  async show() {
    const { ctx } = this;
    const { project_id } = ctx.params;
    const project = await ctx.service.project.getProjectById(project_id);
    if (!project) {
      ctx.service.response.NotFound("未找到项目");
      return;
    }
    ctx.service.response.Successful(project);
  }

  async findByTeamId() {
    const { ctx } = this;
    const { team_id } = ctx.params;
    console.log(team_id);
    const projects = await ctx.service.project.getTeamProjects(team_id);
    ctx.service.response.Successful(projects);
  }
}

module.exports = ProjectController;
