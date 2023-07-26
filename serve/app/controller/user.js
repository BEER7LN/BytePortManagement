'use strict';

const { Controller } = require('egg');

class UserController extends Controller {
  async login() {
    const { ctx } = this;
    ctx.body = '你再登录';
  }
}

module.exports = UserController;
