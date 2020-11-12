<template>
  <label
    class="vcomp-radio"
    role="radio"
    :class="[
      {
        'is-disabled': isDisabled,
        'is-checked': currentValue === label,
        'is-bordered': border
      }
    ]"
  >
    <span
      class="vcomp-radio__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': currentValue === label
      }"
    >
      <span class="vcomp-radio__inner"></span>
      <input
        type="radio"
        ref="radio"
        class="vcomp-radio__original"
        v-model="currentValue"
        :checked="true"
        :disabled="isDisabled"
        @change="handleChange"
      />
    </span>
    <span class="vcomp-radio__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import Emitter from '../../../src/mixins/emitter'

export default {
  name: 'Radio',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: [String, Number, Boolean],
      default: '',
      required: true
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
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  mixins: [Emitter],
  data() {
    return {
      currentValue: this.value
    }
  },
  computed: {
    isGroup() {
      let parent = this.$parent

      while (parent) {
        if (parent.$options.name !== 'RadioGroup') {
          parent = parent.$parent
        } else {
          return true
        }
      }

      return false
    },
    // currentValue: {
    //   get() {
    //     return this.isGroup ? this._radioGroup.value : this.value
    //   },
    //   set(value) {
    //     if (this.isGroup) {
    //       this.dispatch('RadioGroup', 'input', [value])
    //     } else {
    //       this.$emit('input', value)
    //     }

    //     this.$refs.radio.checked = this.currentValue === this.label
    //   }
    // },
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled
        : this.disabled
    }
  },
  watch: {
    isGroup(value) {
      if (value) {
        this._radioGroup = parent
      }
    }
  },
  methods: {
    handleChange() {
      this.currentValue = this.label
      this.$emit('change', this.currentValue)
      this.isGroup && this.dispatch('', 'handleChange', this.currentValue)
    }
  }
}
</script>
