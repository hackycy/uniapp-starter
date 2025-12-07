<script setup>
import { ref } from 'vue'
import FABack from '@/components/FABack/FABack.vue'

const paging = ref(null)
// v-model绑定的这个变量不要在分页请求结束中自己赋值，直接使用即可
const dataList = ref([])

// @query所绑定的方法不要自己调用！！需要刷新列表数据时，只需要调用paging.value.reload()即可
function queryList() {
  // 此处请求仅为演示，请替换为自己项目中的请求
  paging.value.complete([
    { title: '数据项 1' },
    { title: '数据项 2' },
    { title: '数据项 3' },
    { title: '数据项 4' },
    { title: '数据项 5' },
    { title: '数据项 6' },
    { title: '数据项 7' },
    { title: '数据项 8' },
    { title: '数据项 9' },
    { title: '数据项 10' },
  ])
}
</script>

<template>
  <z-paging ref="paging" v-model="dataList" @query="queryList">
    <!-- z-paging默认铺满全屏，此时页面所有view都应放在z-paging标签内，否则会被盖住 -->
    <!-- 需要固定在页面顶部的view请通过slot="top"插入，包括自定义的导航栏 -->
    <view v-for="(item, index) in dataList" :key="index" class="item">
      <view class="item-title text-label-primary">
        {{ item.title }}
      </view>
    </view>

    <!-- #ifdef H5 -->
    <FABack />
    <!-- #endif -->
  </z-paging>
</template>

<route lang="jsonc" part="subPackage">
{
  "layout": "default",
  "style": {
    "navigationBarTitleText": "z-paging",
    // #ifdef H5
    "navigationStyle": "custom"
    // #endif
  }
}
</route>
