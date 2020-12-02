<template>
  <label
    class="vcomp-radio"
    :class="{
      'is-disabled': isDisabled,
      'is-checked': currentValue === label,
      'is-bordered': border
    }"
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
        class="vcomp-radio__original"
        :checked="currentValue === label"
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
import RadioGroup from '../../radio-group'

export default {
  name: 'Radio',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean], /* 只在单独使用时有效 */
      default: ''
    },
    label: {
      type: [String, Number, Boolean],
      default: '',
      required: true
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
      currentValue: '',
      isGroup: false
    }
  },
  computed: {
    isDisabled() {
      return this.isGroup
        ? this._radioGroup.disabled || this.disabled
        : this.disabled
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
      if (parent.$options.name !== RadioGroup.name) {
        parent = parent.$parent
      } else {
        this._radioGroup = parent
        this.isGroup = true
        break
      }
    }

    this.currentValue = this.isGroup ? this._radioGroup.value : this.value

    if (this.isGroup) {
      this.updateParentItems()
    }
  },
  beforeDestroy() {
    if (this.isGroup) {
      const items = this._radioGroup.items

      items.splice(items.findIndex(item => item === this), 1)
    }
  },
  methods: {
    handleChange() {
      this.currentValue = this.label
      this.$emit('change', this.currentValue)
      this.isGroup && this.dispatch(RadioGroup.name, 'handleChange', this.currentValue)
    },
    updateParentItems() {
      this._radioGroup.items.push(this)
    }
  }
}
</script>
