import router from '@/router'
import { useAccountStore } from '@/stores/account'
import { usePermissionStore } from '@/stores/permission'
import { getToken } from '@/utils/auth'

const rootRoute = '/'
const loginRoute = '/login'
// 白名单路由，这些路由不需要令牌可以直接访问
const routeWhiteList = ['/login', '/home', '/404', '/401', '/test']

router.beforeEach(async (to, from, next) => {
  const accountStore = useAccountStore()
  const permissionStore = usePermissionStore()

  const token = getToken()

  // 如果在白名单中直接跳转
  if (routeWhiteList.includes(to.path)) {
    next()
  } else {
    // 判断是否有令牌，如果有判断权限，如果没有说明还没有登录跳转到登录页
    if (token) {
      // 如果已获取公共信息，直接跳转不需要再次获取
      if (accountStore.hasProfile) {
        if (from.query.redirect && from.query.redirect !== to.path) {
          console.debug('from', from.query.redirect)
          next({ path: from.query.redirect, replace: true })
          return
        }
        next()
      } else {
        // 获取公共信息，成功获取后就可以进入该路由
        await accountStore.getProfile()
        const r = await permissionStore.generateRoutes(accountStore.roles)
        permissionStore.setRoutes(r)
        r.forEach((route) => {
          router.addRoute(route)
        })
        if (from.query.redirect && from.query.redirect !== to.path) {
          console.debug('from', from.query.redirect)
          next({ path: from.query.redirect, replace: true })
          return
        }
        next({ ...to, replace: true })
      }
    } else {
      // 如果是根路由那就不需要再跳转了
      const suffix = to.path === rootRoute ? '' : `?redirect=${to.path}`
      next(`${loginRoute}${suffix}`)
    }
  }
})

router.afterEach(() => { })
