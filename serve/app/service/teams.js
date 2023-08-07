"use strict";

const Service = require("egg").Service;

class TeamsService extends Service {
  async createTeam(team_name, owner) {
    const { app } = this;
    const result = await app.mysql.insert("teams", { team_name, owner });
    return result.insertId;
  }

  async removeTeam(team_id) {
    const { app } = this;
    await app.mysql.delete("teams", { team_id });
  }

  async updateTeamName(team_id, team_name) {
    const { app } = this;
    await app.mysql.update("teams", { team_name }, { where: { team_id } });
  }

  async transferOwnership(team_id, new_owner) {
    const { app } = this;
    await app.mysql.update(
      "teams",
      { owner: new_owner },
      { where: { team_id } }
    );
  }

  async OnlyOwner(team_id, owner) {
    const { app } = this;
    const team = await app.mysql.get("teams", { team_id, owner });
    return !!team; // true 是所属者 false 不是
  }

  async findById(team_id) {
    const { app } = this;
    const team = await app.mysql.get("teams", { team_id });
    return team;
  }
}

module.exports = TeamsService;
