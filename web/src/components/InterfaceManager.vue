<script>
import MyTabs from "@/components/MyTabs.vue";
export default {
  data() {
    return {
      collapsed: false,
      expandedKeys: ["0-0", "0-1"],
      selectedKeys: [],
      treeData: [
        {
          title: "parent 0",
          key: "0-0",
          children: [
            {
              title: "leaf 0-0",
              key: "0-0-0",
              isLeaf: true,
            },
            {
              title: "leaf 0-1",
              key: "0-0-1",
              isLeaf: true,
            },
          ],
        },
        {
          title: "parent 1",
          key: "0-1",
          children: [
            {
              title: "leaf 1-0",
              key: "0-1-0",
              isLeaf: true,
            },
            {
              title: "leaf 1-1",
              key: "0-1-1",
              isLeaf: true,
            },
          ],
        },
      ],
    };
  },
  components: {
    MyTabs,
  },
};
</script>

<template>
  <a-layout style="min-height: 100vh" hasSider>
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsible
      theme="light"
      collapsedWidth="0"
    >
      <div style="height: 100%">
        <a-input-search
          v-model:value="searchValue"
          style="
            margin-top: 20%;
            margin-bottom: 8px;
            margin-left: 8px;
            width: 90%;
          "
          placeholder="Search"
        />
        <a-directory-tree
          v-model:expandedKeys="expandedKeys"
          v-model:selectedKeys="selectedKeys"
          multiple
          :tree-data="treeData"
          @expand="onExpand"
        ></a-directory-tree>
      </div>
    </a-layout-sider>
    <a-layout>
      <MyTabs />
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
