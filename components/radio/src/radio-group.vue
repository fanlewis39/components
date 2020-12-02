<template>
  <div
    class="vcomp-radio-group"
    :class="[
      {
        'vcomp-radio-group--button' : button,
        'vcomp-radio-group--vertical' : vertical && !button
      },
      size ? `vcomp-radio-group--${size}` : ''
    ]"
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
    button: {
      type: Boolean,
      default: false
    },
    vertical: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '',
      validator(value) {
        return ['medium', 'small', 'mini', ''].includes(value)
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