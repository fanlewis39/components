<template>
  <div
    class="vcomp-drag-box"
    :class="boxClass"
  >
    <transition name="vcomp-fade">
      <div
        v-show="currentActive"
        class="vcomp-drag-box__wrapper"
        :style="{ 
          width: `${width}px`,
          height: `${height}px`,
          transform: `translate(${transformX + offsetX}px, ${transformY + offsetY}px)`
        }"
      >
        <div
          v-if="title"
          class="vcomp-drag-box__header"
          @mousedown="handleMouseDown"
        >
          <span>{{ title }}</span>
          <div
            class="vcomp-drag-box--close"
            @click="close"
          >
            <Icon name="times"></Icon>
          </div>
        </div>
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '../../icon'

export default {
  name: 'DragBox',
  components: {
    Icon
  },
  model: {
    prop: 'active',
    event: 'on-close'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 300
    },
    title: {
      type: String,
      default: ''
    },
    boxClass: {
      type: [String, Array],
      default: null
    }

  },
  data() {
    return {
      isShow: true,
      clientX: 0,
      clientY: 0,
      offsetX: 0,
      offsetY: 0,
      transformX: 0,
      transformY: 0,
      clientWidth: 0,
      clientHeight: 0,
      moveListener: null,
      resizeListener: null,
      currentActive: this.active
    }
  },
  watch: {
    active(value) {
      this.currentActive = value
    },
  },
  mounted() {
    this.clientWidth = window.screen.availWidth
    this.clientHeight = window.screen.availHeight

    this.moveListener = event => {
      if (
        event.clientX <= 0 ||
        event.clientY <= 0 ||
        event.clientX > this.clientWidth - 20 ||
        event.clientY > this.clientHeight - this.height
      ) {
        return
      }

      this.offsetX = event.clientX - this.clientX
      this.offsetY = event.clientY - this.clientY
    }

    this.resizeListener = () => {
      this.clientWidth = window.screen.availWidth
      this.clientHeight = window.screen.availHeight
    }

    window.addEventListener('mouseup', this.handleMouseUp)
    window.addEventListener('resize', this.resizeListener)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener)
  },
  methods: {
    close() {
      this.currentActive = false
      this.$emit('close', this.currentActive)
    },
    handleMouseDown() {
      this.clientX = event.clientX
      this.clientY = event.clientY

      document.addEventListener('mousemove', this.moveListener)
    },
    handleMouseUp() {
      this.transformX = this.transformX + this.offsetX
      this.transformY = this.transformY + this.offsetY
      this.offsetX = 0
      this.offsetY = 0

      document.removeEventListener('mousemove', this.moveListener)
    }
  }
}
</script>
