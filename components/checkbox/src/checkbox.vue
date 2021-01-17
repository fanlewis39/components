<template>
  <label
    class="vcomp-checkbox"
    :class="[
      {
        'is-disabled': isDisabled,
        'is-checked': isChecked,
        'is-bordered': border,
        'vcomp-checkbox--button' : button
      },
      checkboxSize && (border || button) ? `vcomp-checkbox--${checkboxSize}` : ''
    ]"
  >
    <span
      class="vcomp-checkbox__input"
      :class="{
        'is-disabled': isDisabled,
        'is-checked': isChecked
      }"
    >
      <span class="vcomp-checkbox__inner"></span>
      <input
        v-if="trueValue || falseValue"
        type="checkbox"
        class="vcomp-checkbox__original"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="handleChange"
      />
      <input
        v-else
        type="checkbox"
        class="vcomp-checkbox__original"
        :checked="isChecked"
        :disabled="isDisabled"
        @change="handleChange"
      />
    </span>
    <span v-if="$slots.default || label" class="vcomp-checkbox__label">
      <slot></slot>
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </label>
</template>

<script>
import Emitter from '../../../src/mixins/emitter'
import CheckboxGroup from '../../checkbox-group'

export default {
  name: 'VCheckbox',
  mixins: [Emitter],
  model: {
    props: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean],
      default: ''
    },
    label: {
      type: [String, Number, Boolean],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: {
      type:Boolean,
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
    trueValue: {
      type: [String, Number],
      default: ''
    },
    falseValue: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      currentValue: '',
      isGroup: false
    }
  },
  computed: {
    isChecked() {
      if ({}.toString.call(this.currentValue) === '[object Boolean]') {
        return this.currentValue
      } else if (Array.isArray(this.currentValue)) {
        return this.currentValue.includes(this.label)
      } else {
        return this.currentValue === this.trueValue
      }
    },
    isDisabled() {
      return this.isGroup
        ? this._checkboxGroup.disabled || this.disabled
        : this.disabled
    },
    checkboxSize() {
      return this.isGroup ? this._checkboxGroup.size || this.size : this.size
    }
  },
  watch: {
    value(value) {
      this.currentValue = value
    }
  },
  mounted() {
    let parent = this.$parent

    while (parent) {
      if (parent.$options.name !== CheckboxGroup.name) {
        parent = parent.$parent
      } else {
        this._checkboxGroup = parent
        this.isGroup = true
        break
      }
    }

    this.currentValue = this.isGroup ? this._checkboxGroup.value : this.value

    if (this.isGroup) {
      this.updateParentItems()
    }
  },
  beforeDestroy() {
    if (this.isGroup) {
      const items = this._checkboxGroup.items

      items.splice(items.findIndex(item => item === this), 1)
    }
  },
  methods: {
    handleChange(event) {
      if (event.target.checked) {
        if (this.isGroup) {
          this.currentValue.push(this.label)
        } else {
          this.currentValue = this.trueValue === '' ? true : this.trueValue
        }
      } else {
        if (this.isGroup) {
          const index = this.currentValue.findIndex(item => item === this.label)

          this.currentValue.splice(index, 1)
        } else {
          this.currentValue = this.falseValue === '' ? false : this.falseValue
        }
      }

      this.$emit('change', this.currentValue)
      this.isGroup
       && this._checkboxGroup.$emit('handleChange', this.currentValue)
    },
    updateParentItems() {
      this._checkboxGroup.items.push(this)
    }
  }
}
</script>