<template>
  <div
    class="vcomp-dragbox"
    :style="{width: `${width}px`, height: `${height}px`}"
  >
    <div
      class="vcomp-dragbox-title"
      v-if="hasTitle"
    >
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Dragbox',
  props: {
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
    }
  },
  data() {
    return {

    }
  },
  computed: {
    hasTitle() {
      return this.title ? true : false
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss">
.vcomp-dragbox {
  background-color: rgb(243 243 243);
  box-shadow: 2px 2px 6px #c3c3c3;
  border-radius: 3px;
}
</style>