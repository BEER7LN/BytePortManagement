<template>
  <h2 class="title" v-if="title">{{ title }}</h2>
  <ul class="project-list">
    <li class="project" v-for="project in projects">
      <img class="project-icon" :src="project.imgUrl" alt="项目logo">
      <h3 class="project-name">{{ project.name }}</h3>
      <span v-for="icon in editIcons" class="edit-icon">
        <svg-icon :iconClass="icon.iconClass" className="edit-icon" style="font-size: 24px;"></svg-icon>
      </span>
    </li>
  </ul>
</template>

<script setup>
import svgIcon from '@/components/SvgIcon.vue'

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

const editIcons = [
  { iconClass: 'add', className: ''},
  { iconClass: 'collection', className: ''},
]
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
    .edit-icon{
      box-sizing: border-box;
      width: 30px;
      height: 30px;
      padding: 4px 8px;
    }
  }
}
</style>