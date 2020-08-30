<template>
  <div
    class="vcomp-drag-box"
    :class="boxClass"
    :style="{width: `${width}px`, height: `${height}px`}"
    v-if="isShow"
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
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'DragBox',
  props: {
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
      moveListener: null
    }
  },
  computed: {
    hasHeader() {
      return this.header ? true : false
    }
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
      this.isShow = false

      this.$emit('on-close')
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
