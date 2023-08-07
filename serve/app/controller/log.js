"use strict";

const Controller = require("egg").Controller;

class LogController extends Controller {
  async findByIP() {
    const { ctx } = this;
    const ip = ctx.query.ip; // 获取查询参数中的 IP

    const requestLogs = await ctx.service.log.findByIP(ip);
    ctx.service.response.Successful(requestLogs);
  }
}

module.exports = LogController;
