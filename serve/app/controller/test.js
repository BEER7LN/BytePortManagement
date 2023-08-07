"use strict";

const Controller = require("egg").Controller;

class TestController extends Controller {
  async index() {
    const { ctx } = this;
    let res = JSON.parse(JSON.stringify(ctx.request));
    res.ip = ctx.request.ip;
    res.path = ctx.path;
    res.query = ctx.query;
    res.querystring = ctx.querystring;
    res.body = ctx.request.body;
    res.time = new Date();
    res.protocol = ctx.request.protocol;
    res.httpVersion = ctx.request.req.httpVersion;
    ctx.body = res;
  }
}

module.exports = TestController;
