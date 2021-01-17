<template>
  <div
    class="vcomp-radio-group"
    :class="{ 'vcomp-radio-group--vertical' : vertical && !button }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'RadioGroup',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    vertical: {
      type: Boolean,
      default: false
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