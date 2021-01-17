<template>
  <div
    class="vcomp-curtain"
    :class="[{ 'vcomp-curtain--inner': inner }, curtainClass]"
  >
    <transition :name="transitionName">
      <div
        v-show="currentActive"
        class="vcomp-curtain__wrapper"
        :style="wrapperStyle"
      >
        <div
          class="vcomp-curtain__handle"
          :class="`vcomp-curtain__handle--${direction}`"
          @mousedown.left.prevent="enlargeWrapper"
        ></div>
        <div
          style="width: 100%; height: 100%;"
          :style="{ pointerEvents: isMoving ? 'none' : '' }"
        >
          <slot></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'VCurtain',
  model: {
    prop: 'active',
    event: 'toggle'
  },
  props: {
    active: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 200,
      validator(value) {
        return value >= 0
      }
    },
    height: {
      type: Number,
      default: 100,
      validator(value) {
        return value >= 0
      }
    },
    direction: {
      type: String,
      default: 'right',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].includes(value)
      }
    },
    inner: {
      type: Boolean,
      default: false
    },
    curtainClass: {
      type: [String, Array],
      default: null
    }
  },
  data() {
    return {
      wrapperWidth: this.width,
      wrapperHeight: this.height,
      mouseState: null,
      clientWidth: 0,
      clientHeight: 0,
      resizeListener: null,
      currentActive: this.active,
      isMoving: false
    }
  },
  computed: {
    wrapperStyle() {
      let wrapperStyle =
        (['left', 'right'].includes(this.direction))
          ? {
            width: `${this.wrapperWidth}px`,
            height: `${this.clientHeight}px`
          }
          : {
            width: `${this.clientWidth}px`,
            height: `${this.wrapperHeight}px`
          }

      return wrapperStyle
    },
    transitionName() {
      return `vcomp-show-${this.direction}`
    }
  },
  watch: {
    active(value) {
      this.currentActive = value
    },
    currentActive(value) {
      if (value) {
        this.wrapperWidth = this.width
      }
    }
  },
  mounted() {
    const element = this.$el.parentElement.parentElement.parentElement

    this.clientWidth = element.clientWidth
    this.clientHeight = element.clientHeight
      ? element.clientHeight
      : window.innerHeight

    this.resizeListener = () => {
      const element = this.$el.parentElement.parentElement.parentElement

      this.clientWidth = element.clientWidth
      this.clientHeight = element.clientHeight
        ? element.clientHeight
        : window.innerHeight
    }

    window.addEventListener('resize', this.resizeListener)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener)
  },
  methods: {
    handleToggle() {
      this.currentActive = !this.currentActive
      this.$emit('toggle', this.currentActive)
    },
    enlargeWrapper(event) {
      const { direction, wrapperWidth, wrapperHeight } = this

      this.mouseState =
        direction === 'left' || direction === 'right'
          ? { baseWidth: wrapperWidth, clientX: event.clientX }
          : { baseHeight: wrapperHeight, clientY: event.clientY }

      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseMove(event) {
      event.preventDefault()

      this.isMoving = true

      const { width, height, direction } = this

      if (direction === 'left' || direction === 'right') {
        const { clientWidth } = this
        const { baseWidth, clientX } = this.mouseState

        this.wrapperWidth = direction === 'right'
          ? baseWidth + event.clientX - clientX
          : baseWidth + clientX - event.clientX
        this.wrapperWidth = this.wrapperWidth > width ? this.wrapperWidth : width
        this.wrapperWidth = this.wrapperWidth > clientWidth - 5
          ? clientWidth - 5
          : this.wrapperWidth
      } else {
        const { clientHeight } = this
        const { baseHeight, clientY } = this.mouseState

        this.wrapperHeight = direction === 'bottom'
          ? baseHeight + event.clientY - clientY
          : baseHeight + clientY - event.clientY
        this.wrapperHeight = this.wrapperHeight > height ? this.wrapperHeight : height
        this.wrapperHeight = this.wrapperHeight > this.clientHeight - 5
          ? clientHeight - 5
          : this.wrapperHeight
      }
    },
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)

      this.isMoving = false
    }
  }
}
</script>
