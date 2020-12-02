<template>
  <div
    class="vcomp-carousel-item"
    :class="itemClass"
    style="width: auto; width: auto;"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '../../../src/mixins/emitter'
import Carousel from './carousel'

export default {
  name: 'CarouselItem',
  props: {
    itemClass: {
      type: [String, Array],
      default: null
    }
  },
  mixins: [Emitter],
  mounted() {
    this._carousel = this.$parent
  },
  methods: {
    handleClick() {
      if (this._carousel && this._carousel.$options.name === Carousel.name) {
        const index = this._carousel.items.findIndex(item => item === this)

        this.dispatch(Carousel.name, 'select', index)
      }
    }
  }
}
</script>
