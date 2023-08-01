"use strict";

const Controller = require("egg").Controller;

class MenberController extends Controller {
  async create() {
    const { ctx } = this;
    const { team_id, project_id, user_id, role } = ctx.request.body;

    if (
      user_id == undefined ||
      (team_id == undefined && project_id == undefined)
    ) {
      ctx.service.response.MissingParams();
      return;
    }

    if (team_id != undefined && project_id != undefined) {
      ctx.service.response.ResourceConflict();
      return;
    }

    await ctx.service.member.addMember(team_id, project_id, user_id, role);
    ctx.service.response.Successful();
  }

  async remove() {
    const { ctx } = this;
    const { member_id } = ctx.params;
    console.log(typeof member_id);
    if (member_id == undefined) {
      ctx.service.response.Error();
      return;
    }

    await ctx.service.member.removeMember(member_id);
    ctx.service.response.Successful();
  }

  async updateRole() {
    const { ctx } = this;
    const { member_id } = ctx.params;
    const { newRole } = ctx.request.body;

    if (member_id == undefined || newRole == undefined) {
      ctx.service.response.MissingParams();
      return;
    }

    await ctx.service.member.updateMemberRole(member_id, newRole);
    ctx.service.response.Successful();
  }

  async findByProjectId() {
    const { ctx } = this;
    const { project_id } = ctx.query;
    const members = await ctx.service.member.getMembersByProjectId(project_id);
    ctx.service.response.Successful(members);
  }
}

module.exports = MenberController;
