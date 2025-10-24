---
title: Tabs
---

## 简介

标签页用于按视图切分内容，位于 `src/ui/Tabs/index.vue`。

## 基本用法

```vue
<template>
  <STabs v-model:active="active">
    <STabPane name="tab1" label="标签一">标签一内容</STabPane>
    <STabPane name="tab2" label="标签二">标签二内容</STabPane>
  </STabs>
</template>

<script setup>
import { ref } from 'vue'
import STabs from '/src/ui/Tabs/index.vue'
import STabPane from '/src/ui/Tabs/types' // 若实现为子组件，按项目实际导出调整
const active = ref('tab1')
</script>
```

## 扩展

支持可关闭标签、懒加载面板等功能可按需增加示例。
