<template>
  <div class="title">{{ title }}</div>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab="团队项目">
      <div class="header">
        <a-input class="input" v-model:value="value" placeholder="搜索">
          <template #prefix>
            <svg-icon iconClass="search" style="font-size: 18px;"></svg-icon>
          </template>
        </a-input>
        <div class="edit-btn">
          <div class="import-project-btn">
            <a-button style="color: #404653;" @click="showModal">
              <template #icon>
                <svg-icon iconClass="import" className="import-icon" style="margin-right: 5px;"></svg-icon>
              </template>
              导入项目
            </a-button>
            <!-- 
                confirm-loading：确定按钮 loading
                destroyOnClose：关闭时销毁 Modal 里的子元素
                dialogClass：设置浮层的类名
            -->
            <a-modal v-model:open="open" title="Title" confirm-loading destroyOnClose dialogClass="">  
              
            </a-modal>
          </div>
          <div class="new-project-btn">
            <a-button style="color: #fff; background: #3e8bf7; margin-left: 8px;" @click="showModal">
              <template #icon>
                <svg-icon iconClass="add" className="new-icon" style="margin-right: 5px;"></svg-icon>
              </template>
              新建项目
            </a-button>
          </div>
        </div>
      </div>
      <div class="project-list">
        <SpaceList :projects="state.projects"/>
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
          <a-button style="color: #fff; background: #3e8bf7;" @click="showModal">
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
          <template #bodyCell="{ column }">
            <template v-if="column.dataIndex === '设置'">
              <svg-icon iconClass="setting"></svg-icon>
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
            <div class="desc">字节跳动青训小分队</div>
          </div>
          <button>编辑</button>
        </li>
        <li>
          <div class="content">
            <div class="name">我的队内昵称</div>
            <div class="desc"></div>
          </div>
          <button>编辑</button>
        </li>
      </ul>
      <div class="dangerArea">危险区域</div>
      <ul class="info-wrap">
        <li>
          <div class="content">
            <div class="name">退出团队</div>
            <div class="desc">退出当前所在团队</div>
          </div>
          <button>退出</button>
        </li>
        <li>
          <div class="content">
            <div class="name">解散团队</div>
            <div class="desc">务必谨慎，解散后无法找回</div>
          </div>
          <button class="disband" disabled>解散</button>
        </li>
      </ul>
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import svgIcon from '@/components/SvgIcon.vue'
import SpaceList from '@/components/SpaceList.vue'
import { reactive } from 'vue';

const state = reactive({
  projects: [
    { imgUrl: 'https://th.bing.com/th/id/OIP.XpnLCXvNjh1PjkvAr-t6nAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=2&pid=1.7', name: '个人项目'},
    { imgUrl: 'https://th.bing.com/th/id/OIP.XpnLCXvNjh1PjkvAr-t6nAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=2&pid=1.7', name: '我的收藏'},
  ],
  title: '个人空间'
})

const props = defineProps({
  title: {
    type: String,
    defalut: '',
  },
  projects: {
    type: Array,
    defalut: [],
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

// 表格触发分页、排序、筛选变化时会触发的onChange事件

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
</style>