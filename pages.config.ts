import { defineConfig } from '@uni-aide/unplugin-uni-pages'

export default defineConfig({
  pages: [
    {
      path: 'pages/index/index',
      type: 'home',
      name: 'Home',
      layout: 'navigation',
      style: {
        navigationBarTitleText: '首页',
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
    {
      path: 'pages/index/user',
      type: 'page',
      name: 'user',
      layout: 'navigation',
      style: {
        navigationBarTitleText: 'User',
        navigationStyle: 'custom',
      },
    },
    {
      path: 'pages/mine/index',
      type: 'page',
      name: 'Mine',
      layout: 'navigation',
      style: {
        navigationBarTitleText: '我的',
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
    },
  },
  subPackages: [
    {
      root: 'pages-sub',
      pages: [
        {
          path: '404',
          type: 'page',
          name: 'PageNotFound',
          layout: 'default',
          style: {
            navigationStyle: 'custom',
          },
        },
        {
          path: 'webview',
          type: 'page',
        },
      ],
    },
  ],
})
