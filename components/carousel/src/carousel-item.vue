<template>
  <div
    class="vcomp-carousel-item"
    :class="itemClass"
    style="width: auto; width: auto"
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
  data() {
    return {
      parent: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.parent = this.$parent
    })
  },
  methods: {
    handleClick() {
      const { parent } = this

      if (parent && parent.$options.name === Carousel.name) {
        const index = parent.items.findIndex(item => item === this)

        this.dispatch(Carousel.name, 'select', index)
      }
    }
  }
}
</script>
