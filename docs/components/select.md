---
title: Select
---

## 简介

选择器组件用于在多个选项中选择，位于 `src/ui/Select/index.vue`。

## 基本用法

```vue
<template>
  <SSelect v-model:value="value" :options="options" />
</template>

<script setup>
import { ref } from 'vue'
import SSelect from '/src/ui/Select/index.vue'

const value = ref(null)
const options = [
  { label: '选项1', value: '1' },
  { label: '选项2', value: '2' },
]
</script>
```

## 注意

- 如果组件支持 `options` prop，建议统一使用对象数组，并提供 `label`/`value` 字段。
