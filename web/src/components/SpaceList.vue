<template>
  <h2 class="title">{{ title }}</h2>
  <ul class="project-list">
    <li class="project" v-for="project in projects">
      <img class="project-icon" :src="project.imgUrl" alt="项目logo">
      <h3 class="project-name">{{ project.name }}</h3>
      <svg-icon iconClass="add" className="add"></svg-icon>
      <svg-icon iconClass="collection" className="collection"></svg-icon>
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
      font-size: 14px;
      color: #101828cc;
    }
  }
}
</style>