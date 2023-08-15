<template>
  <div class="title">{{ curTeamData.team.team_name }}</div>
  <a-tabs v-model:activeKey="activeKey" v-if="curTeamData">
    <a-tab-pane key="1" tab="团队项目">
      <div class="header">
        <a-input class="input" v-model:value="value" placeholder="搜索">
          <template #prefix>
            <svg-icon iconClass="search" style="font-size: 18px;"></svg-icon>
          </template>
        </a-input>
        <div class="edit-btn">
          <div class="import-project-btn">
            <a-button style="color: #404653;" @click="importProject">
              <template #icon>
                <svg-icon iconClass="import" className="import-icon" style="margin-right: 5px;"></svg-icon>
              </template>
              导入项目
            </a-button>
          </div>
          <div class="new-project-btn">
            <NewProjectBtn :team_id="curTeamData.team_id"/>
          </div>
        </div>
      </div>
      <div class="project-list">
        <ProjectList :projects="projects" />
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" tab="成员/权限" force-render>
      <div class="header">
        <a-input class="input" v-model:value="value" placeholder="搜索">
          <template #prefix>
            <svg-icon iconClass="search" style="font-size: 18px;"></svg-icon>
          </template>
        </a-input>
        <div class="invite-member-btn">
          <a-button style="color: #fff; background: #3e8bf7;">
            <template #icon>
              <svg-icon iconClass="add" className="new-icon" style="margin-right: 5px;"></svg-icon>
            </template>
            邀请成员
          </a-button>
        </div>
      </div>
      <div class="table">
        <a-table class="table"
          :columns="columns"
          :data-source="data"
          filterDropdownVisible
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === '设置'">
              <a-button class="settingBtn" @click="permissionSetting(record)">
                <svg-icon iconClass="setting"></svg-icon>
              </a-button>
              <!-- <a-modal :open="state.modalVisible" @ok="settingOk" @cancel="settingCancel" keyboard cancelText="取消" okText="保存">
                <div class="title">设置成员权限</div>
                <p>昵称：{{ record.nickName }}</p>
                <p>邮箱：{{ record.email }}</p>
              </a-modal> -->
            </template>       
          </template>
        </a-table>
      </div>
    </a-tab-pane>
    <a-tab-pane key="3" tab="团队设置" force-render>
      <div class="baseInfo">基础信息</div>
      <ul class="info-wrap">
        <li>
          <div class="content">
            <div class="name">团队名称</div>
            <div class="desc">{{ curTeamData.team.team_name }}</div>
          </div>
          <!-- 修改团队名称 -->
          <EditModal btnText="编辑" :formData="formData" :okFunc="() => modifyTeamName(curTeamData.team_id, formData.newTeamName)">
            <template #title>
              <div class="modal-title">修改团队名称</div>
            </template>
            <a-form-item
              label="团队名称"
              name="newTeamName"
              :rules="[{ required: true, message: '请输入团队名称', trigger: 'blur' }]"
            >
              <a-input v-model:value="formData.newTeamName" />
            </a-form-item>
          </EditModal>
        </li>
        <li>
          <div class="content">
            <div class="name">我的队内昵称</div>
            <div class="desc"></div>
          </div>
          <!-- 修改队内昵称 -->
          <EditModal btnText="编辑" :formData="formData" :okFunc="() => modifyNickName(curTeamData.team_id, formData.newNickName)">
            <template #title>
              <div class="modal-title">修改队内昵称</div>
            </template>
            <a-form-item
              label="队内昵称"
              name="newNickName"
              :rules="[{ required: true, message: '请输入新的队内昵称', trigger: 'blur' }]"
            >
              <a-input v-model:value="formData.newNickName" />
            </a-form-item>
          </EditModal>
        </li>
      </ul>
      <div class="dangerArea">危险区域</div>
      <ul class="info-wrap">
        <li v-if="curTeamData.user_id === curTeamData.team.owner">
          <div class="content">
            <div class="name">移交</div>
            <div class="desc">将团队的所有者权限移交给其他成员</div>
          </div>
          <!-- 移交团队 -->
          <EditModal btnText="移交" :formData="formData" :okFunc="() => removeTeam(curTeamData.team_id, formData.userId)">
            <template #title>
              <div class="modal-title">移交团队</div>
            </template>
            <a-form-item
              label="接收人"
              name="userId"
              :rules="[{ required: true, message: '请输入接收人ID', trigger: 'blur' }]"
            >
              <a-input v-model:value="formData.userId" />
            </a-form-item>
          </EditModal>
        </li>
        <li v-else>
          <div class="content">
            <div class="name">退出团队</div>
            <div class="desc">退出当前所在团队</div>
          </div>
          <EditModal btnText="退出"></EditModal>
        </li>
        <li>
          <div class="content">
            <div class="name">解散团队</div>
            <div class="desc">务必谨慎，解散后无法找回</div>
          </div>
          <EditModal btnText="解散" okText="我已了解后果，确定解散" :formData="formData" :okFunc="() => deleteTeam(curTeamData.team_id, curTeamData.team.team_name, formData.curTeamName)">
            <template #title>
              <div class="modal-title">解散团队？</div>
            </template>
            <span class="tips">解散<strong>{{ curTeamData.team.team_name }}</strong>团队后，该团队下的所有项目都将被同步删除，且不可恢复！</span>
            <span class="tips">请输入当前团队名确定操作</span>
            <a-form-item
              name="curTeamName"
              :rules="[{ required: true, message: '请输入正确的团队名', trigger: 'blur' }]"
            >
              <a-input v-model:value="formData.curTeamName" />
            </a-form-item>
          </EditModal>
        </li>
      </ul>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import svgIcon from '@/components/SvgIcon.vue'
import ProjectList from '@/components/ProjectList.vue'
import NewProjectBtn from '@/components/NewProjectBtn.vue'
import EditModal from '@/components/EditBtnModal.vue';
import { ref, onMounted } from 'vue';
import { DeleteTeam, ModifyTeam, TransferTeam } from '../api/team';
import { SearchTeamProjects } from '@/api/project';

const projects = ref([])
const activeKey = ref('1')
const formData = ref({ 
  newTeamName: '',
  newNickName: '',
  userId: null,
  curTeamName: ''
})

onMounted(async() => {
  const { data: {data: pros} } =  await SearchTeamProjects(props.curTeamData.team_id)
  projects.value = pros
})

const props = defineProps({
  projects: {
    type: Array,
    defalut: [],
  },
  curTeamData: {
    type: Object,
    required: true,
  }
})
// 表头及表头规则
const columns = [
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: '20%',
  }, 
  {
    title: '邮箱',
    dataIndex: 'email',
    width: '20%',
  }, 
  {
    title: '团队权限',
    dataIndex: 'permissions',
    width: '20%',
    filters: [
      {
        text: '管理员',
        value: '管理员',
      }, 
      {
        text: '编辑者',
        value: '编辑者',
      },
      {
        text: '只读成员',
        value: '只读成员',
      },
      {
        text: '禁止',
        value: '禁止',
      }
    ],
    onFilter: (value, record) => record.permissions.includes(value),
  }, 
  {
    title: '最近修改',
    dataIndex: 'modified',
    width: '20%',
    sorter: (a, b) => a.modified.slice(0, -2) - b.modified.slice(0, -2),
  },
  {
    title: '设置',
    dataIndex: '设置',
    align: 'center',
    width: '10%',
  }
];
// 表格内容数据
const data = [
  {
    key: '1',
    nickName: '高帅源',
    email: '15170474326@163.com',
    permissions: '管理员',
    modified: '7天前',
  },
  {
    key: '2',
    nickName: '游瑞',
    email: '',
    permissions: '编辑者',
    modified: '1天前',
  },
  {
    key: '3',
    nickName: '李楠',
    email: '',
    permissions: '只读成员',
    modified: '3天前',
  },
  {
    key: '4',
    nickName: '朱玲',
    email: '',
    permissions: '禁止',
    modified: '5天前',
  },
]

// 修改团队名称
const modifyTeamName = (team_id, team_name) => {
  ModifyTeam(team_id, team_name).then(res => {
    console.log(res)
  })
}
// 修改队内昵称
const modifyNickName = (team_id, nickName) => {
  console.log(`希望修改队内昵称为${nickName}`);
}
// 移交团队
const removeTeam = (team_id, user_id) => {
  TransferTeam(team_id, user_id).then(res => {
    console.log(res)
  })
}
// 解散团队
const deleteTeam = (team_id, name1, name2) => {
  if(name1 === name2) {  
    DeleteTeam(team_id).then(res => {
      console.log(res)
    })
  }
}

// 表格触发分页、排序、筛选变化时会触发的onChange事件

// 权限设置(record就是表内当前行的数据，将用于权限设置模态框的最初信息展示)
const permissionSetting = (record) => {
  console.log(record)
}
</script>

<style lang="less" scoped>
.title{  // 个人空间标题样式
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 20px;
  color: #101828cc;
  padding-bottom: 16px;
  box-sizing: content-box;
}
// 团队项目、成员/权限两版块样式
.header{  // 头部搜索框与按钮样式
  width: 100%;
  height: 32px;
  margin: 8px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  .input{
    max-width: 180px;
  }
  .edit-btn{
    display: flex;
  }
}
.table{   // 表格样式
  height: 300px;
  .settingBtn{
    padding: 0;
    margin-left: 5px;
    width: 24px;
    height: 24px;
    border: 0;
    cursor: pointer;
    background: transparent;
    &:hover{
      border-radius: 4px;
      background: #f5f5f6;
    }
  }
}
// 团队设置板块样式
.baseInfo, .dangerArea{  // 基础信息与危险区域的标题样式
  font-size: 16px;
  color: #101828cc;
}
.info-wrap{  // ul列表及其子元素样式
  list-style: none;
  padding: 0;
  margin: 8px 0 24px 0;
  border: 1px solid #f3f5f6;
  border-radius: 6px;
  padding: 0 12px;
  li:first-child{
    border-bottom: 1px solid #f3f5f6;
  }
  li{
    display: flex;
    font-size: 14px;
    color: #101828cc;
    padding: 12px 0;
    .content{
      display: flex;
      flex: 1;
      align-items: center;
      .name{
        width: 40%;
      }
    }
    button{
      color: #101828cc;
      background: #1018280A;
      border: transparent;
      border-radius: 6px;
      padding: 4px 15px;
      letter-spacing: 6px;
      &:hover{
       background: #ecedee; 
      }
      &[disabled]{
        color: #c5cbd0;
        background: #f6f6f7;
      }
    }
  }
}
.modal-title {  // 模态框标题样式
  color: #101828cc;
  font-size: 16px;
  font-weight: normal;
}
.modal-content {  // 模态框内容样式
  padding-top: 24px;
  .tips{
    display: block;
    margin-bottom: 15px;
  }
}
</style>