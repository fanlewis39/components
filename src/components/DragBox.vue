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

<style lang="scss">
.vcomp-drag-box {
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgb(253 253 253);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  border-radius: 3px;
  user-select: none;

  &__header {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    border-bottom: 1px solid #ebeef5;
    box-sizing: border-box;
    font-size: 20px;

    .vcomp-drag-box-close {
      position: absolute;
      top: 0;
      right: 0;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>