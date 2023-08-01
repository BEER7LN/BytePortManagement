<template>
  <a-tooltip :title="btnFnDesc" arrowPointAtCenter>
    <button class="tool-button" :class="[size, type]">
      <svg-icon iconClass="refresh" className="refresh" />
    </button>
  </a-tooltip>
</template>

<script setup>
// import { computed } from 'vue';

const props = defineProps({
  // 按钮功能描述
  btnFnDesc: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: 'normal',
  },
  type: {
    type: String,
    default: 'default',
  }
})
</script>

<style lang="less" scoped>
.tool-button{
  // margin-right: 5px;
  // appearance: none;
  // border: none;
  // outline: none;
  // background: #fff;
  // text-align: center;
  // border: 1px solid transparent;
  // border-radius: 4px;
  appearance: none;
  border: none;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
}
.normal{
  size: 24px;
}
.toolBtn:hover{
  background: #ccc;
}
</style>