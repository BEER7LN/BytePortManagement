<template>
  <div style="width: 90%; margin-left: 5%">
    <a-input-search
      v-model:value="value"
      placeholder="文档名称"
      enter-button="保存"
      size="large"
      @search="onSave"
      style="margin-bottom: 10px"
    />
    <v-md-editor v-model="text" height="500px"></v-md-editor>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const text = ref("");
    return {
      text,
    };
  },
};
</script>
