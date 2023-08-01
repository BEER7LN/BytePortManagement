"use strict";

const Service = require("egg").Service;

class ResponseService extends Service {
  async Successful(data) {
    const { ctx } = this;
    ctx.state = 200;
    ctx.body = {
      code: 200,
      data: data == undefined ? {} : data,
    };
  }

  async MissingParams(message) {
    const { ctx } = this;
    ctx.state = 200;
    ctx.body = {
      code: 400,
      message: message == undefined ? "缺少必要参数" : message,
    };
  }

  async NotLogged(message) {
    const { ctx } = this;
    ctx.state = 200;
    ctx.body = {
      code: 401,
      message: message == undefined ? "未登录&登录失败" : message,
    };
  }

  async NotFound(message) {
    const { ctx } = this;
    ctx.state = 200;
    ctx.body = {
      code: 404,
      message: message == undefined ? "资源未找到" : message,
    };
  }

  async InsufficientAuthority(message) {
    const { ctx } = this;
    ctx.state = 200;
    ctx.body = {
      code: 403,
      message: message == undefined ? "权限不足" : message,
    };
  }

  async ResourceConflict(message) {
    const { ctx } = this;
    ctx.state = 200;
    ctx.body = {
      code: 409,
      message: message == undefined ? "资源冲突" : message,
    };
  }

  async Error(message) {
    const { ctx } = this;
    ctx.state = 200;
    ctx.body = {
      code: 500,
      message: message == undefined ? "发生错误" : message,
    };
  }
}

module.exports = ResponseService;
