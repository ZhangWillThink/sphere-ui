---
title: Table
---

## 简介

表格组件功能较多，支持列定义、分页、排序等。组件位于 `src/ui/Table/index.vue`，详细设计请参考 `src/ui/Table/` 内的 README 文件。

## 快速示例

```vue
<template>
  <STable :columns="columns" :data="data" />
</template>

<script setup>
import STable from '/src/ui/Table/index.vue'

const columns = [
  { key: 'name', title: '名称' },
  { key: 'age', title: '年龄' },
]

const data = [
  { name: 'Alice', age: 20 },
  { name: 'Bob', age: 30 },
]
</script>
```

## 参考

查看 `src/ui/Table/` 下的 `README.md`、`TYPE_INFERENCE.md` 和示例文件夹获取更多示例（高级用法、样式化、分页等）。
