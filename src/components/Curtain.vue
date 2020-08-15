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
      default: 280,
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
      clientHeight: 0
    }
  },
  computed: {
    styleObject() {
      const { direction } = this
      let styleObject = {}

      styleObject =
        (direction === 'left' || direction === 'right')
          ? {
              width: `${this.wrapperWidth}px`,
              height: '100%'
            }
          : {
              width: '100%',
              height: `${this.wrapperHeight}px`
            }

      return styleObject
    },
    maxWrapperWidth() {
      return this.clientWidth
    },
    maxWrapperHeight() {
      return this.clientHeight
    }
  },
  mounted() {
    this.setDirectionClass()
    this.clientWidth = this.$el.parentElement.clientWidth
    this.clientHeight = this.$el.parentElement.clientHeight

    const that = this
    window.onresize = () => {
      console.log(that.$el.parentElement)
      that.clientWidth = that.$el.parentElement.clientWidth
      that.clientHeight = that.$el.parentElement.clientHeight
    }
  },
  methods: {
    setDirectionClass() {
      this.classObject[`vcomp-curtain-handle__${this.direction}`] = true
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
      const { width, height, direction } = this

      if (direction === 'left' || direction === 'right') {
        const { maxWrapperWidth } = this
        const { baseWidth, clientX } = this.mouseState

        this.wrapperWidth = (direction === 'right')
          ? baseWidth + event.clientX - clientX
          : baseWidth + clientX - event.clientX
        this.wrapperWidth = this.wrapperWidth > width ? this.wrapperWidth : width
        this.wrapperWidth = this.wrapperWidth > maxWrapperWidth - 5 ? maxWrapperWidth - 5 : this.wrapperWidth
      } else {
        const { maxWrapperHeight } = this
        const { baseHeight, clientY } = this.mouseState

        this.wrapperHeight = (direction === 'bottom')
          ? baseHeight + event.clientY - clientY
          : baseHeight + clientY - event.clientY
        this.wrapperHeight = this.wrapperHeight > height ? this.wrapperHeight : height
        this.wrapperHeight = this.wrapperHeight > this.maxWrapperHeight - 5 ? maxWrapperHeight - 5 : this.wrapperHeight
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
    position: relative;
    background-color: white;
    box-shadow: 0 1px 4px #b9b9b9;

    &-handle {
      position: absolute;
      background-color: #b3aeae;
      cursor: pointer;

      &:hover {
        background-color: #848282;
      }
    }

    &-handle__top {
      width: 5%;
      height: 5px;
      top: -5px;
      left: 50%;
      border-radius: 6px 6px 0 0;
      transform: translateX(-50%);
    }
    
    &-handle__right { 
      width: 5px;
      height: 8%;
      top: 50%;
      right: -5px;
      border-radius: 0 6px 6px 0;
      transform: translateY(-50%);
    }

    &-handle__bottom {
      width: 5%;
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
