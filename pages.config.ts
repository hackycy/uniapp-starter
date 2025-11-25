import { defineConfig } from '@uni-aide/unplugin-uni-pages'

export default defineConfig({
  pages: [
    {
      path: 'pages/index',
      name: 'Home',
      layout: 'navigation',
      style: {
        navigationBarTitleText: '案例',
        // #ifdef H5
        navigationStyle: 'custom',
        // #endif
      },
    },
    {
      path: 'pages/about',
      name: 'About',
      layout: 'navigation',
      style: {
        navigationBarTitleText: '关于',
        // #ifdef H5
        navigationStyle: 'custom',
        // #endif
      },
    },
    {
      path: 'pages/login',
      type: 'page',
      name: 'Login',
      layout: 'default',
      style: {
        navigationBarTitleText: 'Login',
        // #ifdef H5
        navigationStyle: 'custom',
        // #endif
      },
    },
  ],
  globalStyle: {
    navigationBarBackgroundColor: '@navBgColor',
    navigationBarTextStyle: '@navTxtStyle',
    backgroundColor: '@bgColor',
    backgroundTextStyle: '@bgTxtStyle',
    backgroundColorTop: '@bgColorTop',
    backgroundColorBottom: '@bgColorBottom',
    enablePullDownRefresh: false,
    onReachBottomDistance: 50,
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)': 'z-paging/components/z-paging$1/z-paging$1.vue',
    },
  },
})
