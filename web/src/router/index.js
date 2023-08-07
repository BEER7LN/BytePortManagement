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
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: 'teamSpace',
        name: 'teamSpace',
        component: () => import('@/views/pages/TeamSpace.vue'),
      },
      {
        path: 'collections',
        name: 'collections',
        component: () => import('@/views/pages/Collections.vue'),
      },
      // {
      //   path: 'apiHub',
      //   name: 'apiHub',
      //   component: () => import('@/views/pages/ApiHub.vue'),
      // },
      {
        path: 'recentlyVisited',
        name: 'recentlyVistied',
        component: () => import('@/views/pages/RecentlyVisited.vue'),
      },
    ]
  },
  {
    path: "/project",
    redirect: "/project/interface",
    name: "project",
    component: () => import("@/views/Project.vue"),
    children: [
      {
        path: "interface",
        name: "interface",
        component: () => import("@/components/InterfaceManager.vue"),
      },
      {
        path: "testcase",
        name: "testcase",
        component: () => import("@/components/Testcase.vue"),
      },
      {
        path: "setting",
        name: "setting",
        component: () => import("@/components/Setting.vue"),
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: () => import("@/views/Test.vue"),
  },
];
//根据路由规则创建路由
const router = createRouter({
  history: createWebHistory(""),
  routes,
});
export default router;
