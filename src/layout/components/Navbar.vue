<template>
  <div class="navbar"
    :class="{ collapsed: appStore.isSidebarOpened }">
    <div class="flex items-center">
      <Hamburger :isActive="opened" @toggle="toggleSideBar" />
      <div class="pl-4">
        <span class="text-lg text-fc font-semibold">{{ companyName }}</span>
      </div>
    </div>

    <div class="flex justify-end items-center">
      <div class="mr-5">
        <t-button theme="primary" size="small" @click="navigate2Admin">
          <template #icon><t-icon name="login" /></template>后台管理
        </t-button>
      </div>

      <div class="flex items-center gap-3">
        <t-badge count="5">
          <t-icon name="notification" size="26" class="cursor-pointer" />
        </t-badge>

        <t-dropdown class="cursor-pointer"
          :options="[{ content: '个人信息', onClick: navigate2Profile }, { content: '登出', onClick: loginOut }]">
          <img class="w-9 h-9 rounded-full mx-4" src="https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/avatars/14.png">
        </t-dropdown>
      </div>
    </div>

    <!-- <div class="right-menu flex items-center">
      <p class="text-base text-primary mr-2">{{ greeting }}{{ userName }}</p>

      <t-dropdown
        :options="[{ value: 'base', content: '默认主题' }, { value: 'vue', content: 'Vue主题' }, { value: 'dark', content: '暗黑主题' }]"
        class="mr-2" @click="changeTheme">
        <t-icon name="palette" size="24" />
      </t-dropdown>

      <t-dropdown :options="languageOptions" @click="changeLanguage" class="mr-2">
        <t-icon name="star" size="24" />
      </t-dropdown>

      <t-dropdown :options="[{ content: '登出', onClick: loginOut }]">
        <t-icon name="user" size="24" />
      </t-dropdown>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { MessagePlugin } from 'tdesign-vue-next'
import { useAppStore, useAccountStore, usePermissionStore } from '@/stores'

import Hamburger from './Hamburger'

const appStore = useAppStore()
const accountStore = useAccountStore()

const companyName = computed(() => accountStore.companyName)

// 初始化主题
appStore.toggleTheme(appStore.themeName)
const changeTheme = (val) => {
  appStore.toggleTheme(val?.value)
}

// 初始化侧边栏菜单收缩状态
appStore.sidebar.opened = localStorage.getItem('sidebar')
  ? JSON.parse(localStorage.getItem('sidebar'))
  : appStore.isSidebarOpened
const opened = computed(() => {
  return appStore.isSidebarOpened
})
const toggleSideBar = () => {
  appStore.toggleSideBar()
}

const userName = computed(() => accountStore.profile?.name)

const route = useRoute()
const router = useRouter()

const navigate2Profile = () => {
  nextTick(() => {
    router.push('/enterprise-profile/index')
  })
}

/**
 * 退出登录
 */
const loginOut = () => {
  accountStore.logout().then(() => {
    MessagePlugin.success('登出成功')
    router.push('/login')
  })
}

const navigate2Admin = () => {
  nextTick(() => {
    router.push('/admin')
  })
}
</script>

<style lang="scss" scoped>
.navbar {
  @apply  flex justify-between items-center rounded-md mt-4 mx-6 px-6;

  // 菜单收缩时导航条宽度 = 浏览器宽度 - 2个margin - 菜单栏宽度
  width: calc(100% - 24px*2 - 54px);
  // 导航条最大宽度 = 1440 - 2个margin
  max-width: calc(1440px - 24px*2);
  height: var(--nav-bar-height);
  overflow: hidden;
  position: relative;
  background: var(--nav-bar-background);
  box-shadow: var(--nav-bar-box-shadow);

  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 1075;

  &.collapsed {
    // 菜单展开时导航条宽度 = 浏览器宽度 - 2个margin - 菜单栏宽度
    width: calc(100% - 24px*2 - 16.25rem);
  }
}

//logo
.avatar-wrapper {
  // margin-top: 5px;
  position: relative;
  cursor: pointer;

  .user-avatar {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  // .el-icon-caret-bottom {
  //   cursor: pointer;
  //   position: absolute;
  //   right: -20px;
  //   top: 25px;
  //   font-size: 12px;
  // }
}

//center-title
.heardCenterTitle {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 46%;
  font-weight: 600;
  font-size: 20px;
  transform: translate(-50%, -50%);
}

//drop-down
.right-menu {
  margin-right: 40px;
  background-color: var(--nav-bar-right-menu-background);
}
</style>
