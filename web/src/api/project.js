import HttpInstance from '../utils/axios.js';

// 按团队查找项目
export const SearchTeamProjects =(team_id)=>{
	return HttpInstance({
		url:`/project/team/${team_id}`,
		method:'GET',
	})
}

// 项目创建
export const CreateProject =(team_id, project_type, project_name, project_description)=>{
	return HttpInstance({
		url:'/project/create',
		method:'POST',
		data:{
      team_id: team_id,
      project_type: project_type,
      project_name: project_name,
      project_description: project_description
		}
	})
}

// 项目删除
export const DeleteProject =(project_id)=>{
	return HttpInstance({
		url:`/project/${project_id}`,
		method:'DELETE',
	})
}