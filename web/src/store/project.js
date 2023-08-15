import { defineStore } from 'pinia';

export const useProjectStore = defineStore('project', {
  state: () => ({
    projects: [],
  }),
  getters: {
    //  getProjectDataById方法用于通过projectId获取某一项目数据
    getProjectDataById: (state) => {
      return (projectId) => state.projects.find((project) => project.project_id === projectId)
    }
  },
  actions: {
    // setProjectData方法用于设置和更新项目数据
    setProjectData(data) {
      this.projects = data;
    },
  },
});
