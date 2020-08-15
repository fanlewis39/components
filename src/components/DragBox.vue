<template>
  <div
    class="vcomp-drag-box"
    :style="{width: `${width}px`, height: `${height}px`}"
  ></div>
</template>

<script>
export default {
  name: 'DragBox',
  props: {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 80
    }
  }
}
</script>