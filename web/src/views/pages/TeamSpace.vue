<template>
  <PersonalSpace :projects="projects" :curTeamData="currentTeamData"/>
</template>

<script setup>
import PersonalSpace from '@/components/PersonalSpace.vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore } from '@/store/team';

const route = useRoute();
const teamStore = useTeamStore()

// 计算属性，基于url中携带的team_id参数从teamStore中获取对应数据
const currentTeamData = computed(() => {
  return teamStore.getTeamDataById(Number(route.params.team_id));
})
</script>

<style lang="less" scoped>

</style>