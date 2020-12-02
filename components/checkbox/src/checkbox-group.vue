<template>
  <div
    class="vcomp-checkbox-group"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CheckboxGroup',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      items: []
    }
  },
  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value)
    })
  },
  watch: {
    value(value) {
      this.items.map(item => item.currentValue = value)
    }
  }
}
</script>