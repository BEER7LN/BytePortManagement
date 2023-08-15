<template>
  <ProjectList :title="state.title" :projects="state.projects"/>
</template>

<script setup>
import ProjectList from '@/components/ProjectList.vue'
import { reactive } from 'vue';

const state = reactive({
  projects: [
    { imgUrl: 'https://th.bing.com/th/id/OIP.XpnLCXvNjh1PjkvAr-t6nAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=2&pid=1.7', name: '个人项目'},
    { imgUrl: 'https://th.bing.com/th/id/OIP.XpnLCXvNjh1PjkvAr-t6nAAAAA?w=203&h=203&c=7&r=0&o=5&dpr=2&pid=1.7', name: '我的收藏'},
  ],
  title: '最近访问'
})
</script>

<style lang="less" scoped>

</style>