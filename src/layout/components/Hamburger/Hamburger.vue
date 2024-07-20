<script>
import { h } from 'vue'
import HamburgerSvg from '@/icons/svg/hamburger.svg?component'

export default {
  props: {
    isActive: {
      type: Boolean,
      default: false
    }
  },
  setup(props, ctx) {
    return () => {
      const svgElement = h(HamburgerSvg, {
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

<style lang="scss" scoped>
svg {
  path {
    fill: var(--hamburger-color);
  }
}

.hamburger-style {

  width: var(--hamburger-width);
  height: var(--hamburger-height);
  cursor: pointer;
}

.is-active {
  transform: rotate(180deg);
}
</style>
