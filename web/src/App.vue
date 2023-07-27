<script setup>

</script>

<template>
  <!-- <div>
    <a-button type="primary">测试Ant</a-button>
  </div>
  <div class="asd">
    1
    <p class="one">231</p>
  </div> -->
  <router-view />
</template>

<style lang="less" scoped>
.asd {
  background-color: antiquewhite;
  .one {
    // background: #f00;
    background: @primary-bg;
  }
}
</style>
