"use strict";

const Service = require("egg").Service;

class MemberService extends Service {
  async deleteByProjectId(projectId) {
    try {
      const result = await this.app.mysql.delete("members", {
        project_id: projectId,
      });

      return result.affectedRows;
    } catch (error) {
      throw new Error("An error occurred while deleting data.");
    }
  }
  async deleteByTeamId(teamId) {
    try {
      const result = await this.app.mysql.delete("members", {
        team_id: teamId,
      });

      return result.affectedRows;
    } catch (error) {
      throw new Error("An error occurred while deleting data.");
    }
  }
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

  async getMembersByuserId(user_id) {
    const { app } = this;
    const members = await app.mysql.select("members", {
      where: { user_id },
      columns: ["member_id", "team_id", "user_id", "role"],
    });
    return members;
  }

  async getMemberByTeamAndUser(team_id, user_id) {
    const member = await this.app.mysql.get("members", {
      team_id,
      user_id,
    });
    return member;
  }

  async getMemberByProjectAndUser(project_id, user_id) {
    const member = await this.app.mysql.get("members", {
      project_id,
      user_id,
    });
    return member;
  }

  async getByMemberId(member_id) {
    const member = await this.app.mysql.get("members", {
      member_id,
    });
    return member;
  }
}

module.exports = MemberService;
