<template>
  <div class="toolBar">
    <a-tooltip title="刷新" arrowPointAtCenter>
      <a-button class="toolBtn">
        <span class="tool-icon">
          <svg-icon iconClass="refresh" className="refresh" />
        </span>
      </a-button>
    </a-tooltip>
  </div>
</template>

<script setup>
import svgIcon from '../components/SvgIcon.vue'
// import toolBtn from '../components/toolBtn.vue'
</script>

<style lang="less" scoped>
.toolBtn{
  padding: 0;
  width: 24px;
  height: 24px;
  border: 0;
  cursor: pointer;
  .refresh{
    font-size: 16px;
  }
}
.toolBtn:hover{
  background: #f5f5f6;
}
.toolBtn:active{
  background: #e2e2e3;
}
</style>