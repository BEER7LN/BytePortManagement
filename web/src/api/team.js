import HttpInstance from '../utils/axios.js';

// 团队创建
export const CreateTeam =(team_name)=>{
	return HttpInstance({
		url:'/teams/create',
		method:'POST',
		data:{
      team_name: team_name
		}
	})
}

// 团队删除
export const DeleteTeam =(team_id)=>{
	return HttpInstance({
		url:`/teams/${team_id}`,
		method:'DELETE'
	})
}

// 修改团队名称
export const ModifyTeam =(team_id, team_name)=>{
	return HttpInstance({
		url:`/teams/${team_id}`,
		method:'PUT',
		data:{
		  team_name: team_name
		}
	})
}

// 查看团队信息
export const SearchTeam =()=>{
	return HttpInstance({
		url:'/teams/2',
		method:'GET'
	})
}

// 团队所有者转移
export const TransferTeam =(team_id, user_id)=>{
	return HttpInstance({
		url:`/teams/${team_id}/transfer`,
		method:'PUT',
		data: {
		  new_owner: user_id
		}
	})
}

// 查询自己目前加入的团队
export const SearchMyTeam =()=>{
	return HttpInstance({
		url:'/teams',
		method:'GET'
	})
}