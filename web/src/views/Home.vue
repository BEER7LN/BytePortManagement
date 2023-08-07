<template>
  <a-layout :has-sider="true" class="wrapper">
    <a-layout-sider :width="300" class="sider-wrap">
      <div class="sider-header">
        <span class="title">ApiTools</span>
      </div>
      <a-menu class="sider-menu" mode="inline" triggerSubMenuAction="click">
        <a-sub-menu key="team">
          <template #title>
            <svg-icon iconClass="team" className="menu-icon"></svg-icon>
            我的团队
          </template>
          <a-menu-item key="teamSpace" @click="toSpace">
            个人空间
          </a-menu-item>
          <a-menu-item key="newTeam" @click="addTeam">
            <svg-icon iconClass="add" className="menu-icon"></svg-icon>
            新建团队
          </a-menu-item>
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
import { reactive } from 'vue';
import { useRouter } from 'vue-router'
import {useUserStore} from '../store/user'
import {homeAPI} from '../api/user'


// 顶部右侧工具栏图标
const toolIcons = reactive([
  {title: '刷新', iconClass: 'refresh'},
  {title: '设置', iconClass: 'setting'},
  {title: '使用帮助', iconClass: 'question'},
  {title: '通知', iconClass: 'bell'}
])

const router = useRouter()
const userStore=useUserStore()
// 个人空间
const toSpace = () => {
  router.push('/home/teamSpace')
}
// 新建团队
const addTeam = () => {
  console.log('新建团队')
}
// ApiHub
const toAPI = () => {
  alert('此功能正在加紧开发中')
  // router.push('/home/apiHub')
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
  alert('此功能正在加紧开发中')
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
</style>
