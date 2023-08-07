"use strict";

const Controller = require("egg").Controller;

class RoleController extends Controller {
  async findAll() {
    const { ctx } = this;
    ctx.body = await ctx.service.role.findAll();
  }
}

module.exports = RoleController;
