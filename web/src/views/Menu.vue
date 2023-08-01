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
          <a-menu-item key="teamSpace">
            个人空间
          </a-menu-item>
          <a-menu-item key="newTeam">
            <svg-icon iconClass="add" className="menu-icon"></svg-icon>
            新建团队
          </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="apiHub" @click="toAPI">
          <svg-icon iconClass="compass" className="menu-icon"></svg-icon>
          API Hub
        </a-menu-item>
        <a-menu-item key="collections" @click="toSpace">
          <svg-icon iconClass="collection" className="menu-icon"></svg-icon>
          我的收藏
        </a-menu-item>
        <a-menu-item key="recentlyVisited">
          <svg-icon iconClass="history" className="menu-icon"></svg-icon>
          最近访问
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout class="content-wrap">
      <a-layout-header class="header-wrap" style="background: #fff;">
        <div class="toolBar">
          <a-tooltip title="刷新" arrowPointAtCenter>
            <a-button class="toolBtn">
              <svg-icon iconClass="refresh" className="tool-icon" />
            </a-button>
          </a-tooltip>
          <a-tooltip title="设置" arrowPointAtCenter>
            <a-button class="toolBtn">
              <svg-icon iconClass="setting" className="tool-icon" />
            </a-button>
          </a-tooltip>
          <a-tooltip title="使用帮助" arrowPointAtCenter>
            <a-button class="toolBtn">
                <svg-icon iconClass="question" className="tool-icon" />
            </a-button>
          </a-tooltip>
          <a-tooltip title="通知" arrowPointAtCenter>
            <a-button class="toolBtn">
              <svg-icon iconClass="bell" className="tool-icon" />
            </a-button>
          </a-tooltip>
          <a-avatar class="avatar" alt="头像" style="background: #ff936b;">

          </a-avatar>
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
import { useRouter } from 'vue-router'
// import { reactive } from 'vue';

const router = useRouter()

const toAPI = () => {
  router.push('/home/apiHub')
}
const toSpace = () => {
  router.push('/home/teamSpace')
}

// const items = reactive([
//   {
//     key: 'team',
//     title: '我的团队',
//     label: '我的团队',
//     children: [
//       {
//         key: 'personalSpace',
//         title: '个人空间',
//         label: '个人空间'
//       },
//       {
//         key: 'newTeam',
//         title: '新建团队',
//         label: '新建团队'
//       }, 
//     ]
//   },
//   {
//     key: 'find',
//     title: 'API Hub',
//     label: 'API Hub'
//   },
//   {
//     key: 'favorites',
//     title: '我的收藏',
//     label: '我的收藏'
//   },
//   {
//     key: 'recentlyVisited',
//     title: '最近访问',
//     label: '最近访问'
//   }
// ])
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
          .tool-icon{
            padding-top: 2px;
            font-size: 18px;
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
</style>

<!-- <style lang="less">
// 菜单样式调整（icon与文字竖直方向对齐）
.ant-menu-title-content{
  display: flex;
  align-items: center;
}
</style> -->
