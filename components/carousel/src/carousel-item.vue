<template>
  <div
    class="vcomp-carousel-item"
    style="width: auto; width: auto;"
    :class="itemClass"
    @click="handleClick"
  >
    <slot></slot>
  </div>
</template>

<script>
import Emitter from '../../../src/mixins/emitter'
import Carousel from './carousel'

export default {
  name: 'VCarouselItem',
  mixins: [Emitter],
  props: {
    itemClass: {
      type: [String, Array],
      default: null
    }
  },
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
