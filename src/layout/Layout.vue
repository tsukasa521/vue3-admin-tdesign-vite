<template>
  <t-layout :class="classObj">
    <!-- 左侧区域 -->
    <Sidebar class="sidebar-container" />

    <!-- 右侧区域 -->
    <t-layout class="main-container">
      <!-- 导航栏，吸顶 -->
      <Navbar />
      <t-content>
        <AppMain />
      </t-content>
    </t-layout>
  </t-layout>
</template>

<script setup name="Layout">
import { computed } from 'vue'
import { deviceEnum } from '@/enum'
import { useAppStore } from '@/stores/app'
import AppMain from './components/AppMain.vue'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'

const appStore = useAppStore()
const opened = computed(() => {
  return appStore.isSidebarOpened
})

const isMobile = computed(() => appStore.device === deviceEnum.mobile)

const classObj = computed(() => {
  return {
    closeSidebar: !opened.value, // 控制是打开状态还是关闭状态
    hideSidebar: isMobile.value // 控制是否是hidden状态
  }
})

const handleClickOutOfArea = () => {
  appStore.toggleSideBar()
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 16.25rem;
  position: relative;
  border-left: 1px solid;
  border-color: var(--sidebar-border-color);
  background-color: var(--app-bg-color);
  padding-top: 78px; // 预留导航条的空间

  // 在预留导航条的空间内放一个毛玻璃效果
  &:before {
    content: "";
    width: 100%;
    height: 78px;
    position: fixed;
    top: 0px;
    z-index: 10;

    backdrop-filter: saturate(200%) blur(10px);
  }
}

// 侧边栏打开状态时, 侧边栏显示icon+text
.sidebar-container {
  transition: width 0.28s;
  // width: 239px;
  background-color: var(--sidebar-menu-bg);
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

// 侧边栏关闭状态时, 侧边栏只显示icon
.closeSidebar {
  .sidebar-container {
    width: 54px;
  }

  .main-container {
    margin-left: 54px;
  }
}

// hidden状态时
.hideSidebar {

  // hidden状态时侧边栏打开状态时,右侧区域不缩进呈现悬浮效果
  .main-container {
    margin-left: 0;
  }

  // hidden状态并且是关闭状态时, 侧边栏消失
  &.closeSidebar {
    .sidebar-container {
      width: 0;
    }

    .main-container {
      margin-left: 0;
    }
  }
}

.mask {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
