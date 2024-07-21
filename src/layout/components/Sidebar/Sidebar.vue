<template>
  <div id="Sidebar" class="reset-menu-style">
    <!--logo-->
    <!-- <Logo :collapse="!isCollapse" /> -->
    <!--router nav-->
    <t-menu width="16.25rem" v-model="activeMenu" :collapsed="!isCollapse" expand-mutex :collapse-transition="false">
      <template #logo>
        <img src="@/assets/logo.png" class="w-8 h-8" />
        <span class="text-base">管理系统</span>
      </template>
      <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </t-menu>
  </div>
</template>

<script setup lang="ts">
// import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

// change  scss variable to js
// const dillScssExportToJson = (scssExportJson) => {
//   const jsonString = scssExportJson.replace(/:export\s*/, '').replace(/[\s+\r\n]/g, '')
//   const scssJson = {}
//   jsonString
//     .slice(1, jsonString.length - 2)
//     .split(';')
//     .forEach((fItem) => {
//       const arr = fItem.split(':')
//       scssJson[arr[0]] = arr[1]
//     })
//   return scssJson
// }
// import scssExportJson from '@/styles/variables-to-js.scss'
// import { ObjTy } from '~/common'
// const scssJson = dillScssExportToJson(scssExportJson)
// get scss variable

import { useAppStore } from '@/stores/app'
import { usePermissionStore } from '@/stores/permission'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// 导入配置文件
const appStore = useAppStore()

const route = useRoute()
const permissionStore = usePermissionStore()

const routes = computed(() => {
  const { meta, path } = route
  const routes = permissionStore.routes

  const pathList = path.split('/')
  const firstLevelPathList = pathList[1].split('-')
  const whiteList = ['enterprise', 'admin']

  const module = whiteList.includes(firstLevelPathList[0]) ? `${firstLevelPathList[0]}` : ''

  return module ? hasRouteInModule(routes, module) : []
})

/**
 *
 * @param {Array} routes
 * @param {*} module
 */
const hasRouteInModule = (routes, module) => {
  return routes.reduce((pre, cur) => {
    if (cur?.path.includes(module)) {
      pre.push(cur)
    }
    return pre
  }, [])
}

const isCollapse = computed(() => {
  return appStore.isSidebarOpened
})

const activeMenu = computed(() => {
  const { meta, path } = route
  return path
})
</script>

<style lang="scss">
</style>
