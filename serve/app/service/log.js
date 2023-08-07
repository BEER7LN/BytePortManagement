"use strict";

const Service = require("egg").Service;

class LogService extends Service {
  async findByIP(ip) {
    const { app } = this;

    let rows;
    if (ip) {
      // 如果 IP 不为空，按照 IP 进行查询
      rows = await app.mysql.select("request_logs", {
        where: { ip },
        orders: [["id", "desc"]], // 按照 id 降序排序
      });
    } else {
      // 如果 IP 为空，查询全部数据
      rows = await app.mysql.select("request_logs", {
        orders: [["id", "desc"]], // 按照 id 降序排序
      });
    }

    return rows;
  }
}

module.exports = LogService;
