<script setup lang="ts">
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
  </wd-config-provider>
</template>

<style lang="scss">
.page-wrapper {
  min-height: calc(100vh - var(--window-top));
  box-sizing: border-box;
  background: #f9f9f9;
}

.wot-theme-dark.page-wraper {
  background: #222;
}
</style>
