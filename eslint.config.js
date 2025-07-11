import uniHelper from '@uni-helper/eslint-config'

export default uniHelper({
  vue: true,
  ignores: [
    'src/uni_modules/',
    'dist',
    'uni-pages.d.ts',
    'src/pages.json',
    'src/manifest.json',
  ],
  rules: {
    'no-console': 'off',
  },
  formatters: {
    css: true,
    html: true,
  },
})
