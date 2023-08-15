<template>
  <a-layout :has-sider="true" class="wrapper">
    <a-layout-sider :width="300" class="sider-wrap">
      <div class="sider-header">
        <span class="title">ApiTools</span>
      </div>
      <a-menu class="sider-menu" mode="inline" triggerSubMenuAction="click" :openKeys="['team']">
        <a-sub-menu key="team">
          <template #title>
            <svg-icon iconClass="team" className="menu-icon"></svg-icon>
            我的团队
          </template>
          <a-menu-item 
            v-for="team in teamStore.teamData"
            :key="team.team_id"
            :class="{ 'active': activeTeam === team.team_id }"
            @click="toSpace(team.team_id)"
          >
            {{ team.team == null ? "" : team.team.team_name }}
          </a-menu-item>
          <a-menu-item @click="addTeam">
            <svg-icon iconClass="add" className="menu-icon"></svg-icon>
            新建团队
          </a-menu-item>
          <a-modal :open="isAddTeam" @ok="confirmAddTeam(formData.newTeamName)" @cancel="cancelAddTeam" centered keyboard okText="新建" cancelText="取消">
            <template #title>
              <div class="modal-title">新建团队</div>
            </template>
            <div class="modal-content">
              <!-- <input type="text" v-model="team_name" placeholder="团队名称"> -->
              <a-form ref="formRef" :model="formData">
                <a-form-item
                  label="团队名称"
                  name="newTeamName"
                  :rules="[{ required: true, message: '请输入团队名称', trigger: 'blur' }]"
                >
                  <a-input v-model:value="formData.newTeamName" />
                </a-form-item>
              </a-form>
            </div>
          </a-modal>
        </a-sub-menu>
        <a-menu-item key="apiHub" @click="toAPI">
          <svg-icon iconClass="compass" className="menu-icon"></svg-icon>
          API Hub
        </a-menu-item>
        <a-menu-item key="collections" @click="toCollections">
          <svg-icon iconClass="collection" className="menu-icon"></svg-icon>
          我的收藏
        </a-menu-item>
        <a-menu-item key="recentlyVisited" @click="toRecentlyVisited">
          <svg-icon iconClass="history" className="menu-icon"></svg-icon>
          最近访问
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="content-wrap">
      <a-layout-header class="header-wrap" style="background: #fff;">
        <div class="toolBar">
          <a-tooltip
            v-for="icon in toolIcons"
            :title="icon.title"
            arrowPointAtCenter
          >
            <a-button class="toolBtn">
              <svg-icon :iconClass="icon.iconClass" :className="icon.iconClass" @click="toolIconClick(icon.title)" />
            </a-button>
          </a-tooltip>
          <a-dropdown>
            <a-avatar class="avatar" alt="头像" style="background: #ff936b;"></a-avatar>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="accountSetting">
                  <svg-icon iconClass="setting"/>
                  <span class="pl12">账号设置</span>
                </a-menu-item>
                <a-menu-item @click="signOut">
                  <svg-icon iconClass="sign-out"/>
                  <span class="pl12">退出登录</span>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout-content class="content-wrap" style="background: #fff;">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import svgIcon from '@/components/SvgIcon.vue'
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import { homeAPI } from '../api/user'
import { CreateTeam, SearchMyTeam } from '../api/team'
import { useTeamStore } from '../store/team';

const teamStore = useTeamStore();
const activeTeam = ref(null)  // 用于存储当前高亮的团队ID

// 查询自己当前所在团队信息并存入pinia仓库中
onMounted(() => {
  toRecentlyVisited()  // 页面初次加载时默认展示最近访问页
  SearchMyTeam().then(res => {
    teamStore.setTeamData(res.data.data); // 调用数据仓库的setTeamData方法来更新数据
  })
})
const isAddTeam = ref(false)
const formData = ref({ newTeamName: '' })
const formRef = ref()

// 顶部右侧工具栏图标
const toolIcons = reactive([
  {title: '刷新', iconClass: 'refresh'},
  {title: '设置', iconClass: 'setting'},
  {title: '使用帮助', iconClass: 'question'},
  {title: '通知', iconClass: 'bell'}
])

const router = useRouter()
const userStore = useUserStore()
// 个人空间
const toSpace = (team_id) => {
  activeTeam.value = team_id  // 设置当前高亮的团队ID
  router.push(`/home/teamSpace/${team_id}`)
}
// 新建团队
const addTeam = () => {
  isAddTeam.value = true
}
const confirmAddTeam = async(team_name) => {
  try {
    await formRef.value.validate()
    // 表单校验通过后的逻辑
    await CreateTeam(team_name)
    isAddTeam.value = false
    // location.reload()
  } catch (error) {
    // 表单校验失败后检验当前表单是否存在校验规则，将校验失败报的问题解构出来打印
    if (error.errorFields && error.errorFields.length > 0) {
      const [{ errors }] = error.errorFields;
      console.log(errors[0]);
    }
  }
}
const cancelAddTeam = () => {
  isAddTeam.value = false
}
// ApiHub
const toAPI = () => {
  router.push('/home/apiHub')
}
// 我的收藏
const toCollections = () => {
  router.push('/home/collections')
}
// 最近访问
const toRecentlyVisited = () => {
  router.push('/home/recentlyVisited')
}
// 页面顶部右侧功能按钮的点击事件
const toolIconClick = (btnFunc) => {
  // alert('此功能正在加紧开发中')
  // console.log(btnFunc);
  // if (btnFunc === '刷新') {
  //   location.reload()   // 页面刷新
  // }
}
// 账号设置
const accountSetting = async() => {
  console.log('账号设置')
  // 请求测试
  await homeAPI().then(res => {
    console.log(res)
  })
}
// 退出登录
const signOut = () => {
  userStore.clearUserInfo()
  router.push('/login')
}
</script>

<style lang="less" scoped>
@import '@/assets/style/custom.less';

.wrapper{
  min-height: 100vh;
  .sider-wrap{
    background: @sider-bg;
    .sider-header{
      width: 100%;
      height: 102px;
      background: @sider-bg;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: larger;
      font-weight: bolder;
      color: #525763;
    }
    .sider-menu{
      width: 100%;
      background: @sider-bg;
      .menu-icon{
        font-size: 18px;
      }
    }
  }
  .content-wrap{
    .header-wrap{
      display: flex;
      height: 40px;
      padding: 0 16px;
      align-items: center;
      border-bottom: 1px solid #f4f4f4;
      .toolBar{
        display: flex;
        width: 100%;
        height: 25px;
        justify-content: flex-end;
        align-items: center;
        .toolBtn{
          padding: 0;
          margin-left: 5px;
          width: 24px;
          height: 24px;
          border: 0;
          cursor: pointer;
          &:hover{
            border-radius: 4px;
            background: #f5f5f6;
          }
        }
        .avatar{
          width: 22px;
          height: 22px;
          margin-left: 18px;
        }
      }
    }
    .content-wrap{
      padding: 32px;
    }
  }
}
.pl12{  // 控制头像处dropdown组件下文字与icon的间距
  padding-left: 12px;
}
.active { // 菜单项高亮控制
  background-color: #f5f5f6; /* 高亮背景色 */
  color: #1890ff; /* 高亮文字颜色 */
}
.modal-title {  // 模态框标题样式
  color: #101828cc;
  font-size: 16px;
  font-weight: normal;
}
.modal-content {  // 模态框内容样式
  padding-top: 24px;
}
</style>
