import { defineStore } from 'pinia'
import router, { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  // 超级管理员可以看到所有菜单
  if (roles.includes('admin')) return true

  if (route.meta && route.meta.roles) {
    return roles.some((role) => route.meta?.roles?.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    asyncRoutes: [] // 过滤后的异步路由
  }),
  getters: {
    // 将过滤后的异步路由和静态路由集合
    routes: (s) => constantRoutes.concat(s.asyncRoutes)
  },
  actions: {
    setRoutes (routes) {
      this.asyncRoutes = routes
    },
    // 根据登录用户角色过滤动态路由表
    generateRoutes (roles) {
      return new Promise((resolve) => {
        const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        resolve(accessedRoutes)
      })
    },
    resetRouter () {
      const asyncRouterNameArr = this.asyncRoutes.map((mItem) => mItem.name)
      asyncRouterNameArr.forEach((name) => {
        if (router.hasRoute(name)) {
          router.removeRoute(name)
        }
      })
    }
  }
})
