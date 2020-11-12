<template>
  <label
    class="vcomp-checkbox"
    :class="[
      {
        'is-disabled': isDisabled,
        'is-bordered': border,
        'is-checked': isChecked
      }
    ]"
  >
    <span class="vcomp-checkbox__input">
      <span class="vcomp-checkbox__inner"></span>
      <input
        v-if="trueValue || falseValue"
        type="checkbox"
        :disabled="isDisabled"
      />
      <input
        v-else
        type="checkbox"
        :disabled="isDisabled"
      />
    </span>
    <span
      v-if="$slots.default || label"
      class="vcomp-checkbox__label"
    >
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {
      type: Boolean,
      default: () => {
        return {}
      }
    },
    label: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    checked: {
      type: Boolean,
      default: false
    },
    border: {
      type:Boolean,
      default: false
    },
    trueValue: {
      type: [String, Number],
      default: ''
    },
    falseValue: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    isGroup() {
      return false
    },
    isDisabled() {
      return false
    },
    isChecked() {
      return false
    }
  }
}
</script>