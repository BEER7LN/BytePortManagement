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
    redirect: '/home'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Menu.vue'),
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
      {
        path: 'apiHub',
        name: 'apiHub',
        component: () => import('@/views/pages/ApiHub.vue'),
      },
      {
        path: 'recentlyVistied',
        name: 'recentlyVistied',
        component: () => import('@/views/pages/RecentlyVistied'),
      },
    ]
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
