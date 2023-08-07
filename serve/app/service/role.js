"use strict";

const Service = require("egg").Service;

class RoleService extends Service {
  async createRole(data) {
    const result = await this.app.mysql.insert("role", data);
    return result.affectedRows === 1 ? result.insertId : null;
  }

  async updateRole(id, data) {
    const result = await this.app.mysql.update("role", data, {
      where: { roleid: id },
    });
    return result.affectedRows === 1;
  }

  async deleteRole(id) {
    const result = await this.app.mysql.delete("role", { roleid: id });
    return result.affectedRows === 1;
  }

  async getRoleById(id) {
    const role = await this.app.mysql.get("role", { roleid: id });
    return role;
  }

  async findAll() {
    const result = await this.app.mysql.select("role");
    return result;
  }

  async hasCreateRole(id) {
    const role = await this.app.mysql.get("role", {
      roleid: id,
      create: 1,
    });
    return role;
  }

  async hasUpdateRole(id) {
    const role = await this.app.mysql.get("role", {
      roleid: id,
      update: 1,
    });
    return role;
  }

  async hasDeleteRole(id) {
    const role = await this.app.mysql.get("role", {
      roleid: id,
      delete: 1,
    });
    return role;
  }

  async hasReadRole(id) {
    const role = await this.app.mysql.get("role", {
      roleid: id,
      read: 1,
    });
    return role;
  }
}

module.exports = RoleService;
