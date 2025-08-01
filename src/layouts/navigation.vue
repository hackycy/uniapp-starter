<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar/NavigationBar.vue'
import PrivacyPopup from '@/components/PrivacyPopup/PrivacyPopup.vue'
import { useTheme } from '@/composables/core/useTheme'

const { getThemeVars, getCurrentTheme } = useTheme()
</script>

<script lang="ts">
export default {
  options: {
    addGlobalClass: true,
    virtualHost: true,
    styleIsolation: 'shared',
  },
}
</script>

<template>
  <wd-config-provider
    :theme-vars="getThemeVars"
    :theme="getCurrentTheme"
    :custom-class="`page-wrapper ${getCurrentTheme}`"
  >
    <slot />

    <NavigationBar />

    <!-- #ifdef MP-WEIXIN -->
    <PrivacyPopup />
    <!-- #endif -->
  </wd-config-provider>
</template>

<style lang="scss">
.page-wrapper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f9f9f9;
}

.wot-theme-dark.page-wrapper {
  background: #222222;
}
</style>
