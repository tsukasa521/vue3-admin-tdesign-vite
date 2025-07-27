import { defineStore } from "pinia"
import { removeToken, setToken } from "@/utils/auth"
import { usePermissionStore } from "./permission"

export const useAccountStore = defineStore("account", {
  state: (): {
    profile: {
      id?: string
      name?: string
      avatar?: string | null
      menu?: string[]
    } | null
    roles: string[]
    companyInfo: {
      companyId: string
      companyName: string
    }
  } => ({
    profile: null,
    roles: [],
    companyInfo: {
      companyId: "",
      companyName: "某某有限公司",
    },
  }),
  getters: {
    hasProfile: (s) => {
      return s.profile && s.roles && s.roles.length
    },
    companyName: (s) => s.companyInfo.companyName,
  },
  actions: {
    login(name: string, password: string) {
      return new Promise((resolve, reject) => {
        // 模拟后端登录成功,返回令牌
        setToken("xxx")
        resolve(true)
      })
    },
    getProfile() {
      return new Promise((resolve, reject) => {
        // 模拟后端返回登录账号信息
        this.roles = ["admin"]

        this.profile = {
          id: "001",
          name: "张三",
          avatar: null,
          menu: [], // 可以从后端获取菜单
        }

        resolve(true)
      })
    },
    logout() {
      return new Promise((resolve, reject) => {
        this.profile = null
        this.roles = []
        const store = usePermissionStore()
        store.resetRouter()
        removeToken()
        resolve(true)
      })
    },
  },
})
