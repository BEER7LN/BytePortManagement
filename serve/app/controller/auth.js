"use strict";

const Controller = require("egg").Controller;

class AuthController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (username == undefined || password == undefined) {
      ctx.body = { code: 401 };
      return;
    }
    // 调用 Service 中的 login 方法进行登录
    const user = await ctx.service.user.login(username, password);

    if (!user) {
      ctx.body = { code: 401 };
      return;
    }

    const token = await ctx.service.crypto.encode(user);

    ctx.body = {
      code: 200,
      data: {
        token: token,
        user_id: 1,
        expiration: new Date(),
      },
    };
  }

  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (username == undefined || password == undefined) {
      ctx.body = { code: 401 };
      return;
    }

    // 检查账号名是否已存在
    const isUsernameConflict = await ctx.service.user.checkUsernameConflict(
      username
    );

    if (isUsernameConflict) {
      ctx.body = { code: 409 };
      return;
    }

    // 调用 Service 中的 register 方法进行注册
    await ctx.service.user.register(username, password);
    ctx.body = { code: 200 };
  }
}

module.exports = AuthController;
