import { defineStore } from 'pinia'
import { removeToken, setToken } from '@/utils/auth'
import { usePermissionStore } from './permission'
import { getSelf, login } from '@/apis'

export const useAccountStore = defineStore('account', {
  state: () => ({
    profile: null,
    roles: [],
    companyInfo: {
      companyId: '',
      companyName: '某某有限公司'
    }
  }),
  getters: {
    hasProfile: (s) => {
      return s.profile && s.roles && s.roles.length
    },
    companyName: (s) => s.companyInfo.companyName
  },
  actions: {
    login (loginFormValue) {
      return new Promise((resolve, reject) => {
        const { name, password, uuid } = loginFormValue
        login(name, password, undefined, uuid)
          .then(({ token }) => {
            setToken(token)
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    getProfile () {
      return new Promise((resolve, reject) => {
        getSelf().then(({ data }) => {
          const { userInfo, companyInfo } = data

          if (userInfo.roleId) {
            this.roles = [userInfo.roleId]
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          // todo 可以从后端获取菜单
          this.profile = {
            id: userInfo.userId, name: userInfo.userName, avatar: userInfo.avatar, menu: []
          }
          this.companyInfo.companyId = companyInfo.companyId
          this.companyInfo.companyName = companyInfo.companyName
          resolve()
        }).catch((error) => {
          reject(error)
        })
      })
    },
    logout () {
      return new Promise((resolve, reject) => {
        this.profile = null
        this.roles = []
        const store = usePermissionStore()
        store.resetRouter()
        removeToken()
        resolve(null)
      })
    }
  }
})
