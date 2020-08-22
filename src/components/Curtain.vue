<template>
  <div
    class="vcomp-curtain"
    :class="curtainClass"
    :style="styleObject"
  >
    <div
      class="vcomp-curtain-handle"
      :class="classObject"
      @mousedown.prevent="enlargeWrapper"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Curtain',
  props: {
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
        return ['top', 'right', 'bottom', 'left'].indexOf(value) !== -1
      }
    },
    curtainClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      classObject: {
        'vcomp-curtain-handle__top': false,
        'vcomp-curtain-handle__right': false,
        'vcomp-curtain-handle__bottom': false,
        'vcomp-curtain-handle__left': false
      },
      wrapperWidth: this.width,
      wrapperHeight: this.height,
      mouseState: null,
      clientWidth: 0,
      clientHeight: 0,
      resizeListener: null
    }
  },
  computed: {
    styleObject() {
      let styleObject = {}

      styleObject =
        (['left', 'right'].indexOf(this.direction) !== -1)
          ? {
              width: `${this.wrapperWidth}px`,
              height: '100%'
            }
          : {
              width: '100%',
              height: `${this.wrapperHeight}px`
            }

      return styleObject
    }
  },
  mounted() {
    this.classObject[`vcomp-curtain-handle__${this.direction}`] = true

    this.clientWidth = this.$el.parentElement.clientWidth
    this.clientHeight = this.$el.parentElement.clientHeight

    this.resizeListener = () => {
      this.clientWidth = this.$el.parentElement.clientWidth
      this.clientHeight = this.$el.parentElement.clientHeight
    }

    window.addEventListener('resize', this.resizeListener)
  },
  beforeDestroy() {
    window.removeEventListener(this.resizeListener)
  },
  methods: {
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
      const { width, height, direction } = this

      if (direction === 'left' || direction === 'right') {
        const { clientWidth } = this
        const { baseWidth, clientX } = this.mouseState

        this.wrapperWidth = (direction === 'right')
          ? baseWidth + event.clientX - clientX
          : baseWidth + clientX - event.clientX
        this.wrapperWidth = this.wrapperWidth > width ? this.wrapperWidth : width
        this.wrapperWidth = this.wrapperWidth > clientWidth - 5 ? clientWidth - 5 : this.wrapperWidth
      } else {
        const { clientHeight } = this
        const { baseHeight, clientY } = this.mouseState

        this.wrapperHeight = (direction === 'bottom')
          ? baseHeight + event.clientY - clientY
          : baseHeight + clientY - event.clientY
        this.wrapperHeight = this.wrapperHeight > height ? this.wrapperHeight : height
        this.wrapperHeight = this.wrapperHeight > this.clientHeight - 5 ? clientHeight - 5 : this.wrapperHeight
      }
    },
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)
    }
  }
}
</script>

<style lang="scss">
  .vcomp-curtain {
    position: absolute;
    background-color: white;
    box-shadow: 0 1px 4px rgb(185 185 185);

    &-handle {
      position: absolute;
      background-color: rgb(179 174 174);
      cursor: pointer;

      &:hover {
        background-color: rgb(132 130 130);
      }
    }

    &-handle__top {
      width: 80px;
      height: 5px;
      top: -5px;
      left: 50%;
      border-radius: 6px 6px 0 0;
      transform: translateX(-50%);
    }
    
    &-handle__right { 
      width: 5px;
      height: 80px;
      top: 50%;
      right: -5px;
      border-radius: 0 6px 6px 0;
      transform: translateY(-50%);
    }

    &-handle__bottom {
      width: 80px;
      height: 5px;
      bottom: -5px;
      left: 50%;
      border-radius: 0 0 6px 6px;
      transform: translateX(-50%);
    }

    &-handle__left {
      width: 5px;
      height: 80px;
      top: 50%;
      left: -5px;
      border-radius: 6px 0 0 6px;
      transform: translateY(-50%);
    }
  }
</style>
