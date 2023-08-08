"use strict";

const Controller = require("egg").Controller;

class MenberController extends Controller {
  async create() {
    const { ctx, service } = this;
    const { team_id, project_id, user_id, role } = ctx.request.body;

    // 缺少参数
    if (
      user_id == undefined ||
      (team_id == undefined && project_id == undefined)
    ) {
      service.response.MissingParams();
      return;
    }
    // team_id 和 project_id 参数只能二选一
    if (team_id != undefined && project_id != undefined) {
      service.response.ResourceConflict();
      return;
    }

    // 团队操作
    let member = null;
    if (team_id != undefined) {
      member = await service.member.getMemberByTeamAndUser(
        team_id,
        ctx.user.id
      );
    } else {
      member = await service.member.getMemberByProjectAndUser(
        team_id,
        ctx.user.id
      );
    }
    if (member == null) {
      service.response.InsufficientAuthority();
    }
    const r = await service.role.hasCreateRole(member.role);
    if (r == null) {
      service.response.InsufficientAuthority();
    }

    await service.member.addMember(team_id, project_id, user_id, role);
    service.response.Successful();
  }

  async remove() {
    const { ctx, service } = this;
    const { member_id } = ctx.params;

    if (member_id == undefined) {
      service.response.Error();
      return;
    }

    const member = await service.member.getByMemberId(member_id);
    if (member == null) {
      service.response.NotFound();
      return;
    }

    const role = await service.role.hasDeleteRole(member.role);
    if (role == null) {
      service.response.InsufficientAuthority();
      return;
    }

    await service.member.removeMember(member_id);
    ctx.service.response.Successful();
  }

  async updateRole() {
    const { ctx, service } = this;
    const { member_id } = ctx.params;
    const { newRole } = ctx.request.body;

    if (member_id == undefined || newRole == undefined) {
      ctx.service.response.MissingParams();
      return;
    }
    const member = await service.member.getByMemberId(member_id);
    if (member == null) {
      service.response.NotFound();
      return;
    }

    const role = await service.role.hasUpdateRole(member.role);
    if (role == null) {
      service.response.InsufficientAuthority();
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
