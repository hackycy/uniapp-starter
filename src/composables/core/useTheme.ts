import type { AppTheme, Theme } from '#/theme'
import { onShow } from '@dcloudio/uni-app'
import { isNullish } from 'radashi'
import { computed, onBeforeMount, onUnmounted } from 'vue'
import { useThemeStore } from '@/store/modules/theme'

export function useTheme() {
  const themeStore = useThemeStore()

  const getTheme = computed(() => {
    return themeStore.theme
  })

  const getSystemTheme = computed(() => {
    return themeStore.systemTheme
  })

  const getCurrentTheme = computed((): Theme => {
    const theme = themeStore.theme
    if (theme === 'system') {
      return themeStore.systemTheme
    }

    return theme
  })

  const getThemeVars = computed(() => {
    return themeStore.themeVars
  })

  const getPrimaryColor = computed(() => {
    return themeStore.themeColor
  })

  function setTheme(mode: AppTheme) {
    themeStore.setTheme(mode)
  }

  function setThemeColor(color: string) {
    themeStore.setThemeColor(color)
  }

  function toggleDarkMode(dark?: boolean) {
    if (isNullish(dark)) {
      themeStore.setTheme(getCurrentTheme.value === 'dark' ? 'light' : 'dark')
    }
    else {
      themeStore.setTheme(dark ? 'dark' : 'light')
    }
  }

  function setNavigationBarColor() {
    uni.setNavigationBarColor({
      frontColor: getCurrentTheme.value === 'light' ? '#000000' : '#ffffff',
      backgroundColor: getCurrentTheme.value === 'light' ? '#ffffff' : '#000000',
    })
  }

  // 页面显示时更新导航栏颜色，确保每次切换页面时导航栏颜色都是正确的
  onShow(() => {
    setNavigationBarColor()
  })

  const onThemeChange = (result: UniApp.OnThemeChangeCallbackResult) => {
    if (getTheme.value === 'system') {
      themeStore.setSystemTheme(result.theme)
    }
    setNavigationBarColor()
  }

  onBeforeMount(() => {
    uni.onThemeChange(onThemeChange)
  })

  onUnmounted(() => {
    uni.offThemeChange(onThemeChange)
  })

  return {
    getTheme,
    getSystemTheme,
    getCurrentTheme,
    getThemeVars,
    getPrimaryColor,
    setTheme,
    toggleDarkMode,
    setThemeColor,
  }
}
