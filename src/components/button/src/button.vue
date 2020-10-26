<template>
  <button
    class="vcomp-button"
    :class="[
      `vcomp-button--${type}`,
      size ? `vcomp-button-${size}` : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    :type="nativeType"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    @click="handleClick"
  >
    <Icon
      v-if="loading"
      name="spinner"
    ></Icon>
    <Icon
      v-if="icon && !loading"
      :name="icon"
    ></Icon>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>

<script>
import Icon from '../../icon'

export default {
  name: 'Button',
  components: {
    Icon
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: null
    }
  },
  computed: {
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>
