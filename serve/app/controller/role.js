"use strict";

const Controller = require("egg").Controller;

class RoleController extends Controller {
  async findAll() {
    const { ctx } = this;
    ctx.body = await ctx.service.role.findAll();
  }

  async getRoleById() {
    const { ctx, service } = this;
    const { role_id } = ctx.params;
    const role = await service.role.getRoleById(role_id);
    service.response.Successful(role);
  }
}

module.exports = RoleController;
