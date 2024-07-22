import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw as RouteRecordRawCore } from 'vue-router'
import Layout from '@/layout'

export type RouteRecordRaw = RouteRecordRawCore & {
  meta?: RouteMeta & {
    title?: string
    tIcon?: string
    roles?: string[]
  },
  hidden?: boolean
}

// 静态路由，不需要权限判断一定会起作用的路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/enterprise',
    children: [],
    hidden: true
  },
  {
    path: '/enterprise',
    component: Layout,
    redirect: '/enterprise-dashboard/index',
    meta: {
      title: '管理系统'
    },
    children: [],
    hidden: true
  },
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin-dashboard/index',
    meta: {
      title: '后台管理'
    },
    children: [],
    hidden: true
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

// 异步路由，需要过滤权限后才能起作用的路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/enterprise-dashboard',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard'),
        name: 'EnterpriseDashboard',
        meta: {
          title: '首页',
          tIcon: 'home'
        }
      }
    ]
  },
  {
    path: '/enterprise-list',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/dashboard'),
        name: 'EnterpriseList',
        meta: {
          title: '列表页',
          tIcon: 'home'
        }
      }
    ]
  },
  {
    path: '/enterprise-icon',
    component: Layout,
    meta: {},
    children: [
      {
        path: 'index',
        component: () => import('@/views/icon-view'),
        name: 'EnterpriseIcon',
        meta: {
          title: '图标页',
          tIcon: 'home'
        }
      }
    ]
  },
  {
    path: '/admin-dashboard',
    component: Layout,
    meta: {
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/admin/dashboard'),
        name: 'AdminDashboard',
        meta: {
          title: '管理首页',
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
