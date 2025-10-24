---
title: Popover
---

## 简介

Popover 用于点击或悬停触发的浮层，位于 `src/ui/Popover/index.vue`。

## 基本用法

```vue
<template>
  <SPopover content="弹出内容">
    <SButton>点击触发</SButton>
  </SPopover>
</template>

<script setup>
import SPopover from '/src/ui/Popover/index.vue'
import SButton from '/src/ui/Button/index.vue'
</script>
```

## 常用 Props

- `content` — 弹出内容。
- `trigger` — 触发方式 `click|hover`。
