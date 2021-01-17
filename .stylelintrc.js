module.exports = {
  defaultSeverity: 'error',
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recess-order'
  ],
  plugins: [
    'stylelint-order',
    'stylelint-scss'
  ],
  rules: {
    'at-rule-no-unknown': null
  }
}
