<template>
  <div
    class="vcomp-drag-box"
    :class="boxClass"
  >
    <transition name="fade">
      <div
        class="vcomp-drag-box-wrapper"
        v-show="currentActive"
        :style="{width: `${width}px`, height: `${height}px`}"
      >
        <div
          class="vcomp-drag-box__header"
          v-if="hasHeader"
          @mousedown="handleHeaderMove"
        >
          <span>{{ header }}</span>
          <div
            class="vcomp-drag-box-close"
            @click="closeBox"
          >
            x
          </div>
        </div>
      </div>
      <slot></slot>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DragBox',
  model: {
    prop: 'active'
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
    header: {
      type: String,
      default: ''
    },
    boxClass: {
      type: String,
      default: ''
    }

  },
  data() {
    return {
      isShow: true,
      clientX: 0,
      clientY: 0,
      moveListener: null,
      currentActive: this.active
    }
  },
  computed: {
    hasHeader() {
      return this.header ? true : false
    }
  },
  watch: {
    active(value) {
      this.currentActive = value
    },
  },
  mounted() {
    this.moveListener = (e) => {
        console.log(e.clientX - this.clientX)
        console.log(e.clientY - this.clientY)
    }

    window.addEventListener('mouseup', this.handleMouseUp)
  },
  methods: {
    closeBox() {
      this.currentActive = false

      // this.$emit('on-close')
    },
    handleHeaderMove() {
      document.addEventListener('mousemove', this.moveListener)
    },
    handleMouseUp() {
      document.removeEventListener('mousemove', this.moveListener)
    }
  }
}
</script>
