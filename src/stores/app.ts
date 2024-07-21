import { DEVICE_TYPE } from '@/utils/constants'
import { toggleHtmlClass, toggleVars } from '@/utils/theme'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    sidebar: { opened: true },
    device: DEVICE_TYPE.desktop, // desktop - 桌面端, mobile - 移动端
    theme: 'base' // 主题，空值即为默认主题
  }),
  getters: {
    isSidebarOpened: (s) => s.sidebar.opened,
    is: (s) => s.device === DEVICE_TYPE.mobile,
    themeName: (s) => localStorage.getItem('theme') ?? s.theme
  },
  actions: {
    toggleSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened
        localStorage.setItem('sidebar', String(state.sidebar.opened))
      })
    },
    toggleTheme(themeName: string) {
      this.$patch((state) => {
        state.theme = themeName
        localStorage.setItem('theme', themeName)
        // base为默认主题,vue为动态主题,dark为静态主题
        if (themeName === 'base') {
          toggleVars()
        } else if (themeName === 'vue') {
          toggleVars('vue')
        } else if (themeName === 'dark') {
          toggleHtmlClass('dark')
        }
      })
    }
  }
})
