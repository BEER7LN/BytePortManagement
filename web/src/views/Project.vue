<script>
export default {
  data() {
    return {
      sidebar1: [
        {
          title: "接口管理",
          icon: "#icon-interface",
          path: "/project/interface",
        },
        {
          title: "接口测试",
          icon: "#icon-test",
          path: "/project/testcase",
        },
        {
          title: "项目设置",
          icon: "#icon-setting",
          path: "/project/setting",
        },
      ],
      teamoptions: [
        {
          value: "jack",
          label: "JackJackJackJackJack",
        },
        {
          value: "lucy",
          label: "Lucy",
        },
      ],
      projectoptions: [
        {
          value: "tom",
          label: "Tom",
        },
        {
          value: "jerry",
          label: "Jerry",
        },
      ],
      teamselected: "",
      projectselected: "",
    };
  },
  methods: {
    backHome() {
      this.$router.push("/");
    },
    filterOption(input, option) {
      return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    },
    handleTeamChange() {
    },
    handleProjectChange() {
    },
  },
};
</script>
<template>
  <a-layout has-sider>
    <a-layout-sider
      :style="{
        overflow: 'auto',
        minHeight: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }"
      width="140"
      theme="light"
      class="sider"
    >
      <div
        class="logo"
        style="text-align: center; margin-top: 10px; margin-bottom: 10px"
      >
        <a-button type="ghost">
          <svg
            class="homeicon"
            aria-hidden="true"
            @click="backHome"
            style="width: 3em; height: 3em; text-align: center"
          >
            <use xlink:href="#icon-home"></use>
          </svg>
        </a-button>
      </div>
      <div class="select" style="text-align: center">
        <a-select
          bordered: false
          v-model:value="teamselected"
          show-search
          placeholder="选择团队"
          style="width: 90%"
          :options="teamoptions"
          :filter-option="filterOption"
          @change="handleTeamChange"  
        ></a-select>
      </div>
      <div class="select" style="text-align: center">
        <a-select
          v-model:value="projectselected"
          show-search
          placeholder="选择项目"
          style="width: 90%"
          :options="projectoptions"
          :filter-option="filterOption"
          @change="handleProjectChange"
        ></a-select>
      </div>
      <div class="menu">
        <a-menu theme="light" mode="inline">
          <a-menu-item
            v-for="bar of sidebar1"
            :key="bar.title"
            style="float: left"
          >
            <svg class="icon" aria-hidden="true" style="margin-right: 5px">
              <use :xlink:href="bar.icon"></use>
            </svg>
            <router-link :to="bar.path" class="nav-text">{{
              bar.title
            }}</router-link>
          </a-menu-item>
        </a-menu>
      </div>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '140px', minHeight: '100vh' }" has-sider>
      <router-view />
    </a-layout>
  </a-layout>
</template>

<style scoped>
#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}
.homeicon:hover {
  fill: #0871ff;
}
/* [data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
} */
.sider{
  border-right: #0871ff, 1px, solid;
}
.select {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
