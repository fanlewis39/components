<template>
  <button
    class="vcomp-button"
    :class="[
      `vcomp-button--${type}`,
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    :type="nativeType"
    @click="handleClick"
  >
    <Icon
      v-if="icon"
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
    }
  },
  computed: {
    buttonDisabled() {
      return this.disabled
    }
  },
  methods: {
    handleClick(event) {
      this.$emit('click', event)
    }
  }
}
</script>
