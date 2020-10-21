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
export default {
  name: 'CarouselItem',
  props: {
    itemClass: {
      type: [String, Array],
      default: null
    }
  },
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

      if (parent) {
        const index = parent.items.findIndex(item => item === this)

        parent.$emit('select', index)
      }
    }
  }
}
</script>
