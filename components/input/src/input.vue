<template>
  <div
    :class="[
      type === 'textarea' ? 'vcomp-textarea' : 'vcomp-input',
      size ? `vcomp-input--${size}` : '',
      {
        'is-disabled': disabled,
        'vcomp-input-group': $slots.prepend || $slots.append,
        'vcomp-input--append': $slots.append,
        'vcomp-input--prepend': $slots.prepend,
        'vcomp-input--prefix': $slots.prefix || prefixIcon,
        'vcomp-input--suffix': $slots.suffix || suffixIcon || clearable || password
      }
    ]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <template v-if="type !== 'textarea'">
      <!-- 前置元素 -->
      <div v-if="$slots.prepend" class="vcomp-input-group__prepend">
        <slot name="prepend"></slot>
      </div>
      <input
        v-if="type !== 'textarea'"
        class="vcomp-input__inner"
        ref="input"
        v-bind="$attrs"
        :disabled="disabled"
        :readonly="readonly"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <!-- 前置内容 -->
      <span v-if="$slots.prefix || prefixIcon" class="vcomp-input__prefix">
        <slot name="prefix"></slot>
        <Icon v-if="prefixIcon" :name="prefixIcon"></Icon>
      </span>
      <!-- 后置内容 -->
      <span
        v-if="suffixIcon || showClear"
        class="vcomp-input__suffix"
      >
        <span class="vcomp-input__suffix-inner">
          <template v-if="!showClear">
            <slot name="suffix"></slot>
            <Icon :name="suffixIcon"></Icon>
          </template>
          <Icon
            v-if="showClear"
            name="times-circle"
            class="vcomp-input__clear"
            @click="clearValue"
          ></Icon>
        </span>
      </span>
      <!-- 后置元素 -->
      <div v-if="$slots.append" class="vcomp-input-group__append">
        <slot name="append"></slot>
      </div>
    </template>
    <textarea
      v-else
      class="vcomp-textarea__inner"
      ref="textarea"
      v-bind="$attrs"
      :disabled="disabled"
      :readonly="readonly"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>
    <span
      v-if="isWordLimit && type === 'textarea'"
      class="vcomp-input__count"
    >
      {{ textLength }}
    </span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'VInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
      required: true
    },
    type: {
      type: String,
      default: 'text'
    },
    disabled: {
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
    readonly: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    workLimit: {
      type: Boolean,
      default: false
    },
    password: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      focus: false,
      hovering: false
    }
  },
  computed: {
    inputValue() {
      return String(this.value)
    },
    inputDisabled() {
      return this.disabled
    },
    showClear() {
      return this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.value &&
        (this.focus || this.hovering)
    },
    isWordLimit() {
      return this.workLimit &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.password &&
        this.focus
    },
    textLength() {
      if ({}.toString.call(this.value) === '[number Boolean]') {
        return String(this.value).length
      }

      return this.value.length
    }
  },
  watch: {
    value() {
      this.setInputValue()
    }
  },
  methods: {
    handleInput(event) {
      this.$emit('input', event.target.value)
      // this.setInputValue()
    },
    handleFocus(event) {
      this.focus = true
    },
    handleBlur(event) {
      this.focus = false
    },
    clearValue() {
      this.$emit('input', '')
    },
    setInputValue() {
      const input = this.$refs.input || this.$refs.textarea

      if (input.value !== this.value) {
        input.value = this.value
      }
    }
  }
}
</script>