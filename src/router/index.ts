import { createRouter, createWebHistory, RouteMeta, RouteRecordRaw as RouteRecordRawCore } from "vue-router"

export type RouteRecordRaw = RouteRecordRawCore & {
  meta?: RouteMeta & {
    title?: string
    tIcon?: string
    roles?: string[]
  }
  hidden?: boolean
}

// 静态路由，不需要权限判断一定会起作用的路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
    children: [],
    hidden: true,
  },
  {
    path: "/login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "@/views/login"),
    hidden: true,
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    hidden: true,
  },
]

// 异步路由，需要过滤权限后才能起作用的路由
export const asyncRoutes: RouteRecordRaw[] = []

const baseUrl = import.meta.env.BASE_URL
const router = createRouter({
  history: createWebHistory(baseUrl),
  routes: constantRoutes,
})

export default router
