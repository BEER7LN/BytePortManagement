<template>
  <div>
    <MyCards v-if="childMsg == '1'" @response="(msg) => (childMsg = msg)" />
    <EditMarkdown v-else-if="childMsg == '新建MarkDown'" />
    <AddInterface v-else-if="childMsg == '新建接口'" />
    <UploadSwagger v-else-if="childMsg == '从swagger文档导入'" />
  </div>
</template>
<script setup>
import { ref } from "vue";
import AddInterface from "./AddInterface.vue";
import EditMarkdown from "./EditMarkdown.vue";
import MyCards from "./MyCards.vue";
import UploadSwagger from "./UploadSwagger.vue";
const childMsg = ref("1");
</script>
