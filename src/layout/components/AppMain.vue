<template>
  <div class="app-main" :class="{ 'show-tag-view': false }">
    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="key" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => route.path)

// todo 用keep-alive做页面缓存

// todo 路由标题可以设置到浏览器选项卡标题上
</script>

<style scoped lang="scss">
.app-main {
  // padding: 10px;
  /*50 = navbar  */
  // position: relative;
  // overflow: hidden;
}
.show-tag-view {
  height: calc(
    100vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)}
  ) !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>
