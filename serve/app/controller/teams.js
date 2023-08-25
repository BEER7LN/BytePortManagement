"use strict";

const Controller = require("egg").Controller;

class TeamsController extends Controller {
  // 团队创建
  async create() {
    const { ctx, service } = this;
    const owner = ctx.user.id;
    const { team_name } = ctx.request.body;

    //缺少团队名
    if (team_name == undefined || team_name == "") {
      service.response.MissingParams();
      return;
    }

    const team = await service.teams.createTeam(team_name, owner);

    // team_id, project_id, user_id, role
    await service.member.addMember(team, null, ctx.user.id, 4);

    service.response.Successful({
      message: "团队创建成功",
      team_id: team,
    });
  }

  async getTeamsByUserId() {
    const { ctx, service } = this;

    const teams = await service.member.getMembersByuserId(ctx.user.id);
    for (let team of teams) {
      team.team = await service.teams.findById(team.team_id);
      team.role = await service.role.getRoleById(team.role);
    }

    service.response.Successful(teams.filter((team) => team.team_id != null));
  }

  async remove() {
    const { ctx, service } = this;
    const { team_id } = ctx.params;
    console.log(team_id, ctx.user.id);
    const role = await ctx.service.teams.OnlyOwner(team_id, ctx.user.id);
    console.log(role);
    if (!role) {
      ctx.service.response.InsufficientAuthority();
      return;
    }

    const projects = await service.project.getTeamProjects(team_id);
    for (let pro in projects) {
      service.member.deleteByProjectId(pro.project_id);
      service.project.deleteProject(pro.project_id);
    }

    service.member.deleteByTeamId(team_id);

    // 删除
    await ctx.service.teams.removeTeam(team_id);
    ctx.service.response.Successful();
  }

  async update() {
    const { ctx } = this;
    const { team_id } = ctx.params;
    const { team_name } = ctx.request.body;

    const role = await ctx.service.teams.OnlyOwner(team_id, ctx.user.id);
    if (!role) {
      ctx.service.response.InsufficientAuthority();
      return;
    }

    await ctx.service.teams.updateTeamName(team_id, team_name);
    ctx.service.response.Successful();
  }

  async transferOwnership() {
    const { ctx, service } = this;
    const { team_id } = ctx.params;
    const { new_owner } = ctx.request.body;

    if (typeof new_owner != "number") {
      service.response.ResourceConflict();
      return;
    }

    const role = await ctx.service.teams.OnlyOwner(team_id, ctx.user.id);
    if (!role) {
      service.response.InsufficientAuthority();
      return;
    }

    await service.teams.transferOwnership(team_id, new_owner);
    const member = await service.member.getMemberByTeamAndUser(
      team_id,
      new_owner
    );
    service.member.updateMemberRole(member.member_id, 4);

    service.response.Successful();
  }

  async findTeamById() {
    const { ctx } = this;
    const { team_id } = ctx.params;

    const team = await ctx.service.teams.findById(team_id);

    if (!team) {
      ctx.service.response.NotFound();
      return;
    }

    let data = {
      ...team,
      projects: await ctx.service.project.getTeamProjects(team_id),
      members: await ctx.service.member.getTeamMembers(team_id),
    };

    ctx.service.response.Successful(data);
  }
}

module.exports = TeamsController;
