"use strict";

const Service = require("egg").Service;

class RoleService extends Service {
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
