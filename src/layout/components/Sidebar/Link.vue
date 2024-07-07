/**
  一般情况下菜单项由router-link渲染，如果是外部链接改为a标签
 */
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup>
import { computed, onMounted, reactive } from 'vue'
import { isExternalUrl } from '@/utils/validate'
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const isExternalValid = computed(() => {
  return isExternalUrl(props.to)
})
const type = computed(() => {
  if (isExternalValid.value) {
    return 'a'
  }
  return 'router-link'
})
const linkProps = (to) => {
  if (isExternalValid.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
const state = reactive({
  levelList: null
})
onMounted(() => {
  // console.log(state.levelList)
  // console.log(props.to)
})
</script>

<style scoped lang="scss"></style>
