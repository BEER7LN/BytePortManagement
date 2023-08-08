"use strict";

const Controller = require("egg").Controller;

class ProjectController extends Controller {
  async create() {
    const { ctx, service } = this;
    const { team_id, project_type, project_name, project_description } =
      ctx.request.body;

    if (team_id == undefined) {
      service.response.MissingParams();
      return;
    }
    const member = service.member.getMemberByTeamAndUser(team_id, ctx.user.id);
    if (member == null) {
      service.response.InsufficientAuthority();
      return;
    }
    const role = service.role.hasCreateRole(member.role);
    if (role == null) {
      service.response.InsufficientAuthority();
      return;
    }

    await ctx.service.project.createProject(
      team_id,
      project_type,
      project_name,
      project_description
    );
    ctx.service.response.Successful();
  }

  async remove() {
    const { ctx, service } = this;
    const { project_id } = ctx.params;

    const project = await service.project.getProjectById(project_id);
    if (project == null) {
      service.response.ResourceConflict();
      return;
    }

    const member = service.member.getMemberByTeamAndUser(
      project.team_id,
      ctx.user.id
    );
    if (member == null) {
      service.response.InsufficientAuthority();
      return;
    }
    const role = service.role.hasDeleteRole(member.role);
    if (role == null) {
      service.response.InsufficientAuthority();
      return;
    }

    await service.project.deleteProject(project_id);
    ctx.service.response.Successful();
  }

  async show() {
    const { ctx, service } = this;
    const { project_id } = ctx.params;
    const project = await ctx.service.project.getProjectById(project_id);
    if (!project) {
      ctx.service.response.NotFound("未找到项目");
      return;
    }
    const member = service.member.getMemberByTeamAndUser(
      project.team_id,
      ctx.user.id
    );
    if (member == null) {
      service.response.InsufficientAuthority();
      return;
    }
    const role = service.role.hasReadRole(member.role);
    if (role == null) {
      service.response.InsufficientAuthority();
      return;
    }

    ctx.service.response.Successful(project);
  }

  async findByTeamId() {
    const { ctx } = this;
    const { team_id } = ctx.params;

    const member = service.member.getMemberByTeamAndUser(team_id, ctx.user.id);
    if (member == null) {
      service.response.InsufficientAuthority();
      return;
    }
    const role = service.role.hasReadRole(member.role);
    if (role == null) {
      service.response.InsufficientAuthority();
      return;
    }

    const projects = await ctx.service.project.getTeamProjects(team_id);
    ctx.service.response.Successful(projects);
  }
}

module.exports = ProjectController;
