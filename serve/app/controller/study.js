"use strict";

const Controller = require("egg").Controller;

class StudyController extends Controller {
  async query() {
    const { ctx } = this;
    ctx.body = ctx.query;
  }

  async path() {
    const { ctx } = this;
    ctx.body = ctx.path;
  }

  async params() {
    const { ctx } = this;
    ctx.body = ctx.params;
  }

  async body() {
    const { ctx } = this;
    ctx.body = ctx.request.body;
  }

  async serviceList() {
    const { ctx, service } = this;
    ctx.body = await service.study.getList();
  }

  async mysql() {
    const { app } = this;
    console.log(app.mysql);
  }
}

module.exports = StudyController;
