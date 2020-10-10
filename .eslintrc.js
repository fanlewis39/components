module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  rules: {
    'semi': ["error", "never"],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'always',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'vue/eqeqeq': 'error',
    'vue/require-direct-export': 'error',
    'vue/no-parsing-error': [
      'error',
      {
        'x-invalid-end-tag': false
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: 2,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    'vue/match-component-file-name': [
      'error',
      {
        extensions: ['vue'],
        shouldMatchCase: false
      }
    ],
    'vue/space-infix-ops': [
      'error',
      {
        int32Hint: false
      }
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  }
}