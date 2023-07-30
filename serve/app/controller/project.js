"use strict";

const Controller = require("egg").Controller;

class ProjectController extends Controller {
  async create() {
    const { ctx } = this;
    const { team_id, project_type, project_name, project_description } =
      ctx.request.body;
    const project_id = await ctx.service.projects.createProject(
      team_id,
      project_type,
      project_name,
      project_description
    );
    ctx.body = { project_id };
    ctx.status = 201; // Created
  }

  async remove() {
    const { ctx } = this;
    const { project_id } = ctx.params;
    await ctx.service.projects.deleteProject(project_id);
    ctx.status = 204; // No Content
  }

  async show() {
    const { ctx } = this;
    const { project_id } = ctx.params;
    const project = await ctx.service.projects.getProjectById(project_id);
    if (!project) {
      ctx.status = 404; // Not Found
      ctx.body = {
        code: 404,
        message: "Project not found with the provided ID.",
      };
      return;
    }
    ctx.body = {
      success: true,
      project,
    };
  }

  async findByTeamId() {
    const { ctx } = this;
    const { team_id } = ctx.query;
    const projects = await ctx.service.projects.getProjectsByTeamId(team_id);
    ctx.body = {
      success: true,
      projects,
    };
  }
}

module.exports = ProjectController;
