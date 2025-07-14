import uniHelper from '@uni-helper/eslint-config'

export default uniHelper({
  vue: true,
  typescript: true,
  ignores: [
    'src/uni_modules/',
    'src/static/',
    'dist',
    'uni-pages.d.ts',
    'src/pages.json',
    'src/manifest.json',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
  },
})
