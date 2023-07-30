import { createRouter, createWebHistory } from "vue-router";
// 路由规则
const routes = [
  {
    // path: "/",
    // name: "xx",
    // meta: ["xx"],
    // component:xxx,
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/Project.vue')
  }
];
//根据路由规则创建路由
const router = createRouter({
  history: createWebHistory(""),
  routes,
});
export default router;
