import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout'

// 静态路由，不需要权限判断一定会起作用的路由
/**
 * @type {import("vue-router/dist/vue-router").RouteRecordNormalized}
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/enterprise/index',
    hidden: true
  },
  {
    path: '/enterprise',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard'),
        name: 'enterpriseDashboard',
        meta: {
          title: '首页',
          tIcon: 'home'
        }
      }
    ]
  },
  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/login'),
    hidden: true
  }
]

// 动态路由，需要过滤权限后才能起作用的路由
/**
 * @type {import("vue-router/dist/vue-router").RouteRecordNormalized}
 */
export const asyncRoutes = [
  {
    path: '/enterprise-dashboard',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard'),
        name: 'enterpriseDashboard',
        meta: {
          title: '首页',
          tIcon: 'home'
        }
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router
