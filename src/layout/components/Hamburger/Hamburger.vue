<script>
import { h } from 'vue'
import SvgIcon from '@/icons/components/SvgIcon.vue'

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup (props, ctx) {
    return () => {
      const svgElement = h(SvgIcon, {
        icon: 'hamburger',
        class: 'hamburger-style'
      }, [])

      return h('div', {
        class: `${props.isActive ? 'is-active' : ''}`,
        onClick: () => {
          ctx.emit('toggle')
        }
      }, [svgElement])
    }
  }
}
</script>

<style scoped lang="scss">
.hamburger-style {
  color: var(--hamburger-color);
  width: var(--hamburger-width);
  height: var(--hamburger-height);
  cursor: pointer;
}

.is-active {
  transform: rotate(180deg);
}
</style>
