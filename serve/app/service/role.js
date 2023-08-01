"use strict";

const Service = require("egg").Service;

class RoleService extends Service {
  async findPermissionByUserIdAndTeamId(user_id, team_id) {
    const { app } = this;
    const result = await app.model.Members.findOne({
      where: { user_id, team_id },
      include: [
        {
          model: app.model.Role,
          as: "Role",
        },
      ],
    });
    return result ? result.Role : null;
  }
  async findPermissionByProjectIdAndUserId(project_Id, user_id) {
    const { app } = this;
    const result = await app.model.Members.findOne({
      where: { project_id: project_Id, user_id },
      include: [
        {
          model: app.model.Role,
          as: "Role",
        },
      ],
    });
    return result ? result.Role : null;
  }
  async createRole(data) {
    // Method to create a new role record in the database
    const result = await this.app.mysql.insert("role", data);
    return result.affectedRows === 1 ? result.insertId : null;
  }

  async updateRole(id, data) {
    // Method to update an existing role record in the database
    const result = await this.app.mysql.update("role", data, {
      where: { roleid: id },
    });
    return result.affectedRows === 1;
  }

  async deleteRole(id) {
    // Method to delete a role record from the database
    const result = await this.app.mysql.delete("role", { roleid: id });
    return result.affectedRows === 1;
  }

  async getRoleById(id) {
    // Method to fetch a role record from the database by roleid
    const role = await this.app.mysql.get("role", { roleid: id });
    return role;
  }
}

module.exports = RoleService;
