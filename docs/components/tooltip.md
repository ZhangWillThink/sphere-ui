---
title: Tooltip
---

## 简介

文字提示（Tooltip）用于在鼠标悬停或聚焦时展示说明。组件位于 `src/ui/Tooltip/index.vue`。

## 基本用法

```vue
<template>
  <STooltip content="这是提示">
    <span>悬停我</span>
  </STooltip>
</template>

<script setup>
import STooltip from '/src/ui/Tooltip/index.vue'
</script>
```

## 常用 Props

- `content` — 提示内容。
- `placement` — 展示位置，例如 `top|bottom|left|right`。

> 可扩展：展示带 html 的提示、延迟显示等配置。
