"use strict";

const Controller = require("egg").Controller;

class MenberController extends Controller {
  async create() {
    const { ctx } = this;
    const { team_id, project_id, user_id, role } = ctx.request.body;
    const member_id = await ctx.service.members.addMember(
      team_id,
      project_id,
      user_id,
      role
    );
    ctx.body = { member_id };
    ctx.status = 201; // Created
  }

  async remove() {
    const { ctx } = this;
    const { member_id } = ctx.params;
    await ctx.service.members.removeMember(member_id);
    ctx.status = 204; // No Content
  }

  async updateRole() {
    const { ctx } = this;
    const { member_id } = ctx.params;
    const { newRole } = ctx.request.body;
    await ctx.service.members.updateMemberRole(member_id, newRole);
    ctx.status = 200; // OK
  }

  async findByProjectId() {
    const { ctx } = this;
    const { project_id } = ctx.query;
    const members = await ctx.service.members.getMembersByProjectId(project_id);
    ctx.body = {
      success: true,
      members,
    };
  }
}

module.exports = MenberController;
