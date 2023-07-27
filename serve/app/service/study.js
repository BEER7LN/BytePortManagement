"use strict";

const Service = require("egg").Service;

class StudyService extends Service {
  async getList() {
    return [1, 3, 4];
  }
}

module.exports = StudyService;
