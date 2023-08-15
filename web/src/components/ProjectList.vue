<template>
  <h2 class="title" v-if="title">{{ title }}</h2>
  <ul class="project-list">
    <li class="project" v-for="project in projects" @click="toProject(project.project_id)">
      <img v-if="project.imgUrl" class="project-icon" :src="project.imgUrl" alt="项目logo">
      <h3 class="project-name">{{ project.project_name }}</h3>
      <div class="project-type">{{ project.project_type }}项目</div>
      <div class="project-desc">{{ project.project_description }}</div>
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
      <a-dropdown placement="bottomLeft">
        <a-button class="editBtn">
          <svg-icon iconClass="more" className="edit-icon"></svg-icon>
        </a-button>
        <template #overlay>
          <a-menu>
            <a-menu-item @click="modifyName()">
              <svg-icon iconClass="edit" className="edit-icon"></svg-icon>
              <span class="pl-12">修改名称</span>
            </a-menu-item>
            <a-menu-item @click="deleteProject(project.project_id)">
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
import { DeleteProject } from '@/api/project'
import { useRouter } from 'vue-router';
import { SearchMembers } from '../api/member'

const router = useRouter()

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

const state = reactive({
  isCollected: false
})

// 跳转到project页
const toProject = (project_id) => {
  console.log(project_id)
  // router.push(`/project/${project_id}`)
}

// 收藏与否
const addCollection = () => {
  state.isCollected = !state.isCollected
}
// 修改项目名称
const modifyName = (project_id) => {
  console.log('修改项目名称');
}
// 删除项目
const deleteProject = async(project_id) => await DeleteProject(project_id)
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
      font-size: 16px;
      color: #101828cc;
    }
    .project-type{
      margin-left: 20px;
      font-size: 14px;
      font-weight: bold;
      color: #ccc;
    }
    .project-desc{
      color: #101828cc;
      margin: 20px;
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