"use strict";

const Controller = require("egg").Controller;

class TeamsController extends Controller {
  // 团队创建
  async create() {
    const { ctx } = this;
    const owner = ctx.user.id;
    const { team_name } = ctx.request.body;

    if (team_name == undefined || team_name == "") {
      ctx.body = { code: 400 };
      return;
    }

    const team = await ctx.service.teams.createTeam(team_name, owner);
    ctx.body = {
      code: 200,
      data: {
        message: "团队创建成功",
        team_id: team,
      },
    };
    ctx.status = 201;
  }

  async remove() {
    const { ctx } = this;
    const { team_id } = ctx.params;

    const role = await ctx.service.teams.OnlyOwner(team_id, ctx.user.id);
    if (!role) {
      ctx.status = 200;
      ctx.body = {
        code: 403,
        data: { message: "权限不足" },
      };
      return;
    }

    // 检查成员
    const teamMembers = await ctx.service.member.getTeamMembers(team_id);
    if (teamMembers.length > 0) {
      ctx.status = 200;
      ctx.body = {
        code: 409,
        data: { message: "不能删除团队，因为成员不为空！" },
      };
      return;
    }

    // 检查团队
    const teamProjects = await ctx.service.project.getTeamProjects(team_id);
    if (teamProjects.length > 0) {
      ctx.status = 200;
      ctx.body = {
        code: 409,
        data: { message: "不能删除团队，因为项目不为空！" },
      };
      return;
    }

    // 删除
    await ctx.service.teams.removeTeam(team_id);
    ctx.status = 200;
    ctx.body = { code: 200 };
  }

  async update() {
    const { ctx } = this;
    const { team_id } = ctx.params;
    const { team_name } = ctx.request.body;

    const role = await ctx.service.teams.OnlyOwner(team_id, ctx.user.id);
    if (!role) {
      ctx.status = 200;
      ctx.body = {
        code: 403,
        data: { message: "权限不足" },
      };
      return;
    }

    await ctx.service.teams.updateTeamName(team_id, team_name);
    ctx.status = 200; // OK
    ctx.body = { code: 200 };
  }

  async transferOwnership() {
    const { ctx } = this;
    const { team_id } = ctx.params;
    const { new_owner } = ctx.request.body;

    if (typeof new_owner != "number") {
      ctx.status = 200;
      ctx.body = {
        code: 403,
        data: { message: "权限不足" },
      };
      return;
    }

    const role = await ctx.service.teams.OnlyOwner(team_id, ctx.user.id);
    if (!role) {
      ctx.status = 200;
      ctx.body = {
        code: 403,
        data: { message: "权限不足" },
      };
      return;
    }

    await ctx.service.teams.transferOwnership(team_id, new_owner);
    ctx.status = 200; // OK
    ctx.body = { code: 200 };
  }

  async findTeamById() {
    const { ctx } = this;
    const { team_id } = ctx.params;

    const team = await ctx.service.teams.findById(team_id);

    if (!team) {
      ctx.status = 200;
      ctx.body = {
        code: 404,
        data: {
          message: "团队未找到",
        },
      };
      return;
    }

    let data = {
      ...team,
      projects: await ctx.service.project.getTeamProjects(team_id),
      members: await ctx.service.member.getTeamMembers(team_id),
    };

    ctx.status = 200;
    ctx.body = {
      code: 200,
      data: data,
    };
  }
}

module.exports = TeamsController;
