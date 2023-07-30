"use strict";

const Service = require("egg").Service;

class MemberService extends Service {
  async getTeamMembers(team_id) {
    const { app } = this;
    const teamMembers = await app.mysql.select("members", {
      where: { team_id },
      columns: ["member_id", "team_id", "project_id", "user_id", "role"],
    });
    return teamMembers;
  }

  async addMember(team_id, project_id, user_id, role) {
    const { app } = this;
    const result = await app.mysql.insert("members", {
      team_id,
      project_id,
      user_id,
      role,
    });
    return result.insertId;
  }

  async removeMember(member_id) {
    const { app } = this;
    await app.mysql.delete("members", { member_id });
  }

  async updateMemberRole(member_id, newRole) {
    const { app } = this;
    await app.mysql.update(
      "members",
      { role: newRole },
      { where: { member_id } }
    );
  }

  async getMembersByProjectId(project_id) {
    const { app } = this;
    const members = await app.mysql.select("members", {
      where: { project_id },
      columns: ["member_id", "user_id", "role"],
    });
    return members;
  }
}

module.exports = MemberService;
