"use strict";

const Service = require("egg").Service;

class ProjectService extends Service {
  async getTeamProjects(team_id) {
    const { app } = this;
    const teamProjects = await app.mysql.select("projects", {
      where: { team_id },
      columns: [
        "project_id",
        "team_id",
        "project_type",
        "project_name",
        "project_description",
      ],
    });
    return teamProjects;
  }

  async createProject(
    team_id,
    project_type,
    project_name,
    project_description
  ) {
    const { app } = this;
    const result = await app.mysql.insert("projects", {
      team_id,
      project_type,
      project_name,
      project_description,
    });
    return result.insertId;
  }

  async deleteProject(project_id) {
    const { app } = this;
    await app.mysql.delete("projects", { project_id });
  }

  async getProjectById(project_id) {
    const { app } = this;
    const project = await app.mysql.get("projects", { project_id });
    return project;
  }

  async updateProjectName(project_id, project_name) {
    const { app } = this;
    const res = await app.mysql.update(
      "projects",
      { project_name },
      { where: { project_id } }
    );
    return res;
  }
}

module.exports = ProjectService;
