<template>
  <h2 class="title" v-if="title">{{ title }}</h2>
  <ul class="project-list">
    <li class="project" v-for="project in projects">
      <img class="project-icon" :src="project.imgUrl" alt="项目logo">
      <h3 class="project-name">{{ project.name }}</h3>
      <a-tooltip title="取消收藏" v-if="state.isCollected" arrowPointAtCenter>
        <a-button class="editBtn" @click="addCollection" style="color: orange;">          
          <svg-icon iconClass="collection" className="edit-icon"></svg-icon>
        </a-button>
      </a-tooltip>
      <a-tooltip title="收藏项目" v-else arrowPointAtCenter>
        <a-button class="editBtn" @click="addCollection">          
          <svg-icon iconClass="collection" className="edit-icon"></svg-icon>
        </a-button>
      </a-tooltip>
      <!-- 当父组件传值传了editable时才可修改项目名称和删除本项目，只用于个人空间内的项目管理 -->
      <a-dropdown v-if="editable" placement="bottomLeft">
        <a-button class="editBtn">
          <svg-icon iconClass="more" className="edit-icon"></svg-icon>
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="modifyName">
              <svg-icon iconClass="edit" className="edit-icon"></svg-icon>
              <span class="pl-12">修改名称</span>
            </a-menu-item>
            <a-menu-item @click="deleteProject">
              <svg-icon iconClass="recycle-bin" className="edit-icon"></svg-icon>
              <span class="pl-12">删除项目</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </li>
  </ul>
</template>

<script setup>
import svgIcon from '@/components/SvgIcon.vue'
import { reactive } from 'vue';

const props = defineProps({
  title: {
    type: String,
    defalut: '',
  },
  projects: {
    type: Array,
    defalut: [],
  },
  editable: {
    type: Boolean,
    defalut: false
  }
})

const state = reactive({
  isCollected: false
})

// 收藏与否
const addCollection = () => {
  state.isCollected = !state.isCollected
}
// 修改项目名称
const modifyName = () => {
  console.log('修改项目名称');
}
// 删除项目
const deleteProject = () => {
  console.log('删除项目');
}
</script>

<style lang="less" scoped>
.title{
  width: 100%;
  height: 32px;
  line-height: 32px;
  font-size: 20px;
  color: #101828cc;
}
.project-list{
  list-style: none;
  padding: 0;
  .project{
    display: flex;
    align-items: center;
    padding: 0 8px 0 16px;
    height: 60px;
    border-bottom: 1px solid #f4f4f4;
    .project-icon{
      width: 33px;
      height: 33px;
      border-radius: 4px;
      padding-right: 12px;
      box-sizing: content-box;
      overflow: hidden;
    }
    .project-name{
      margin: 0;
      font-size: 14px;
      color: #101828cc;
      flex: 1;
    }
    .editBtn{
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
      .edit-icon{
        font-size: 16px;
      }
    }
  }
}
.pl-12{ // 控制dropdown组件下文字与icon的间距
  padding-left: 12px;
}
</style>