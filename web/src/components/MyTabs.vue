<template>
  <a-tabs
    v-model:activeKey="activeKey"
    type="editable-card"
    @edit="onEdit"
    style="height: 100%; background-color: #fff; border-left: 1px solid #dde6ed"
  >
    <a-tab-pane
      v-for="pane in panes"
      :key="pane.key"
      :tab="pane.title"
      :closable="pane.closable"
      style="height: 100%"
    >
      <EachPane />
    </a-tab-pane>
  </a-tabs>
</template>
<script setup>
import { ref } from "vue";
import EachPane from "./EachPane.vue";

const panes = ref([
  {
    title: "新建文件",
    key: "1",
  },
]);
const activeKey = ref(panes.value[0].key);
const newTabIndex = ref(0);
const childMsg = ref("Nothing");
const add = () => {
  activeKey.value = `newTab${++newTabIndex.value}`;
  panes.value.push({
    title: "新建文件",
    key: activeKey.value,
  });
};
const remove = (targetKey) => {
  let lastIndex = 0;
  panes.value.forEach((pane, i) => {
    if (pane.key === targetKey) {
      lastIndex = i - 1;
    }
  });
  panes.value = panes.value.filter((pane) => pane.key !== targetKey);
  if (panes.value.length && activeKey.value === targetKey) {
    if (lastIndex >= 0) {
      activeKey.value = panes.value[lastIndex].key;
    } else {
      activeKey.value = panes.value[0].key;
    }
  }
};
const onEdit = (targetKey, action) => {
  if (action === "add") {
    add();
  } else {
    remove(targetKey);
  }
};
</script>
