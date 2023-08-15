import HttpInstance from '../utils/axios.js';

// 按照项目id查找所有成员
export const SearchMembers = (project_id) => {
  return HttpInstance({
    url: `/menber/${project_id}`,
    method: 'GET'
  })
}

// 新增项目成员
export const AddMember = (team_id, project_id, user_id, role) => {
  return HttpInstance({
    url: `/menber/addMember`,
    method: 'POST',
    data: {
      team_id: team_id,
      project_id: project_id,
      user_id: user_id,
      role: role
    }
  })
}

// 删除成员
export const DeleteMember = (user_id) => {
  return HttpInstance({
    url: `/menber/${user_id}`,
    method: 'DELETE'
  })
}

// 修改成员权限
export const ModifyMemberRole = (user_id, newRole) => {
  return HttpInstance({
    url: `/menber/${user_id}`,
    method: 'PUT',
    data: {
      newRole: newRole
    }
  })
}