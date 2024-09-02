import globals from 'globals'
import pluginJs from '@eslint/js'
import eslintPrettier from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  {
    files: ['**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  eslintPrettier,
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'prettier/prettier': 'error',
    },
    plugins: {
      prettier: prettierPlugin,
    },
  },
]
