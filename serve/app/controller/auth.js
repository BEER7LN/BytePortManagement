"use strict";

const Controller = require("egg").Controller;

class AuthController extends Controller {
  async login() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (username == undefined || password == undefined) {
      ctx.service.response.MissingParams();
      return;
    }
    // 调用 Service 中的 login 方法进行登录
    const user = await ctx.service.user.login(username, password);

    if (!user) {
      ctx.service.response.NotLogged();
      return;
    }

    const token = await ctx.service.crypto.encode(user);

    ctx.service.response.Successful({
      token: token,
      user_id: 1,
      expiration: new Date(),
    });
  }

  async register() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;

    if (username == undefined || password == undefined) {
      ctx.service.response.MissingParams();
      return;
    }

    // 检查账号名是否已存在
    const isUsernameConflict = await ctx.service.user.checkUsernameConflict(
      username
    );

    if (isUsernameConflict) {
      ctx.service.response.ResourceConflict();
      return;
    }

    // 调用 Service 中的 register 方法进行注册
    await ctx.service.user.register(username, password);
    ctx.service.response.Successful();
  }
}

module.exports = AuthController;
