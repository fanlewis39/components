<template>
  <div class="vcomp-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VCheckboxGroup',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    button: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return ['medium', 'small', 'mini'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      items: []
    }
  },
  watch: {
    value(value) {
      this.items.map(item => item.currentValue = value)
    }
  },
  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value)
    })
  }
}
</script>