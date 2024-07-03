module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    defineProps: true,
    defineEmits: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    'no-unused-vars': 'warn',
    'vue/no-setup-props-destructure': ['warn']
  }
}
