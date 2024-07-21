<template>
  <template v-if="!item.hidden">
    <template v-if="showSidebarItem(item.children, item)">
      <!-- <Link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)"> -->
      <t-menu-item :value="resolvePath(onlyOneChild?.path)" :to="resolvePath(onlyOneChild?.path)"
        :class="{ 'submenu-title-noDropdown': !isNest }">
        <!-- <item :meta="onlyOneChild.meta || item.meta" /> -->
        <template #icon>
          <template v-if="item.meta?.tIcon">
            <t-icon :name="item.meta?.tIcon" />
          </template>
          <template v-else-if="onlyOneChild?.meta?.tIcon || item.meta?.tIcon">
            <t-icon :name="onlyOneChild?.meta?.tIcon" />
          </template>
        </template>
        {{ onlyOneChild?.meta?.title }}
      </t-menu-item>
      <!-- </Link> -->
    </template>
    <t-submenu v-else :value="resolvePath(item.path)" :title="item.meta?.title">
      <template #icon>
        <template v-if="item.meta?.tIcon">
          <t-icon :name="item.meta?.tIcon" />
        </template>
        <template v-else-if="onlyOneChild?.meta?.tIcon || item.meta?.tIcon">
          <t-icon :name="onlyOneChild?.meta?.tIcon" />
        </template>
      </template>
      <SidebarItem v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
        :base-path="resolvePath(child.path)" />
    </t-submenu>
  </template>
</template>

<script setup lang="ts">
/* 初始化参数比如引入组件，proxy,state等 */
import { ref } from 'vue'
import { isExternalUrl } from '@/utils/validate'
import { RouteRecordRaw } from '@/router';

const props = withDefaults(defineProps<{
  item: RouteRecordRaw,
  isNest?: boolean,
  basePath?: string
}>(), { isNest: false, basePath: '' })

// 显示sidebarItem 的情况
const onlyOneChild = ref<RouteRecordRaw>()

const showSidebarItem = (children: RouteRecordRaw[] = [], parent: any) => {
  const showingChildren = children.filter((item) => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })
  if (showingChildren.length === 1 && !parent?.alwaysShow) {
    return true
  }
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noChildren: true }
    return true
  }
  return false
}

const resolvePath = (routePath: string | undefined) => {
  if (isExternalUrl(routePath || '')) {
    return routePath
  }
  if (isExternalUrl(props.basePath)) {
    return props.basePath
  }

  return `${props.basePath}/${routePath}`
}
</script>
