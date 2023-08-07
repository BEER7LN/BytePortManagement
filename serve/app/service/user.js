"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  async register(username, password) {
    const { app } = this;

    // 将用户信息保存到数据库中
    const result = await app.mysql.insert("users", { username, password });
    return result;
  }

  async checkUsernameConflict(username) {
    const { app } = this;

    // 根据用户名查询数据库中的用户信息
    const user = await app.mysql.get("users", { username });

    return !!user; // 如果用户存在则返回true，表示账号名已存在；否则返回false，表示账号名可用
  }

  async login(username, password) {
    const { app } = this;

    // 根据用户名查询数据库中的用户信息
    const user = await app.mysql.get("users", { username });

    // 用户不存在
    if (!user) return null;

    // 密码不匹配
    if (user.password !== password) return null;

    // 登录成功
    return user;
  }
}

module.exports = UserService;
