---
title: Card
---

## 简介

卡片用于承载独立内容块，常用于数据分组或小组件容器。组件位于 `src/ui/Card/index.vue`。

## 基本用法

```vue
<template>
  <SCard>
    <template #title>卡片标题</template>
    卡片内容放在这里。
  </SCard>
</template>

<script setup>
import SCard from '/src/ui/Card/index.vue'
</script>
```

## 常用 Props

- `title` — 卡片标题（也可通过插槽传入）。
- `bordered` — 是否显示边框。

> 可扩展：添加 footer、actions 插槽示例等。
