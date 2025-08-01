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
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
  },
})
