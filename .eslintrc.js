module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [ '@nuxtjs', 'plugin:vue/recommended', 'plugin:prettier/recommended', 'prettier/vue' ],
  plugins: [ 'import', 'vue', 'prettier' ],
  settings: {
    'import/resolver': {
      node: {
        extensions: [ '.js', '.jsx', '.vue' ]
      }
    }
  },
  // add your custom rules here
  rules: {
    'no-console': 'off',
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'prettier/prettier': 'error'
  }
}
