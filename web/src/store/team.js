import { defineStore } from 'pinia';

export const useTeamStore = defineStore('team', {
  state: () => ({
    teamData: [],
  }),
  getters: {
    // getTeamDataById方法用于通过teamId获取某一团队的数据
    getTeamDataById: (state) => {
      return (teamId) => state.teamData.find((team) => team.team_id === teamId)
    }
  },
  actions: {
    // setTeamData方法用于设置和更新团队数据
    setTeamData(data) {
      this.teamData = data;
    },
  },
});
