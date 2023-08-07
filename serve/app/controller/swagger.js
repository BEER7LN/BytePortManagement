"use strict";

const Controller = require("egg").Controller;

class SwaggerController extends Controller {
  async parseJsonText() {
    const { ctx, service } = this;
    const { body } = ctx.request; // 获取POST请求的JSON数据
    let parsedData = {};
    // 进行JSON解析
    try {
      parsedData = JSON.parse(body.swagger);
    } catch (error) {
      service.response.Error("解析失败！");
      return;
    }
    service.response.Successful(parsedData);
  }
}

module.exports = SwaggerController;
