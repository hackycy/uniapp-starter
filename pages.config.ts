import { defineConfig } from '@uni-aide/unplugin-uni-pages'

function createDemoPages(): any {
  const list: { name: string, title: string }[] = [
    {
      name: 'waterfall',
      title: '瀑布流',
    },
  ]

  return list.map((item) => {
    return {
      path: `pages/demo/${item.name}`,
      name: `Demo-${item.name}`,
      layout: 'default',
      style: {
        navigationBarTitleText: item.title,
        // #ifdef H5
        navigationStyle: 'custom',
        // #endif
      },
    }
  })
}

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
    // 案例页面
    ...createDemoPages(),
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
