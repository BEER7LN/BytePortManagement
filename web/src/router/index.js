import { createRouter, createWebHistory } from "vue-router";
// 路由规则
const routes = [
  {
    // path: "/",
    // name: "xx",
    // meta: ["xx"],
    // component:xxx,
  },
];
//根据路由规则创建路由
const router = createRouter({
  history: createWebHistory(""),
  routes,
});
export default router;
