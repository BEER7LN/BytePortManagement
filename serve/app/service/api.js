"use strict";

const Service = require("egg").Service;

class ApiService extends Service {
  async getByProjectId(projectId) {
    const { app } = this;
    const result = await app.mysql.select("dir", {
      where: { project_id: projectId },
    });
    return result;
  }

  async createDir({ parent_id, name, project_id }) {
    const { app } = this;
    const result = await app.mysql.insert("dir", {
      parent_id,
      name,
      project_id,
    });
    return result;
  }

  async hasChildDirectories(dirId) {
    const { app } = this;
    const count = await app.mysql.count("dir", { parent_id: dirId });
    return count > 0;
  }

  async deleteDir(dirId) {
    const { app } = this;
    const hasChildren = await this.hasChildDirectories(dirId);

    if (hasChildren) {
      throw new Error("Cannot delete directory with child directories");
    }

    const result = await app.mysql.delete("dir", { dir_id: dirId });
    return result;
  }

  async checkDirExists(dirId) {
    const { app } = this;
    const result = await app.mysql.get("dir", { dir_id: dirId });
    return !!result;
  }

  async createApi({ dir_id, path, type, summary, parameters }) {
    const { app } = this;

    const dirExists = await this.checkDirExists(dir_id);
    if (!dirExists) {
      throw new Error("Directory with the specified dir_id does not exist");
    }

    const result = await app.mysql.insert("api", {
      dir_id,
      path,
      type,
      summary,
      parameters,
    });
    return result;
  }
}

module.exports = ApiService;
