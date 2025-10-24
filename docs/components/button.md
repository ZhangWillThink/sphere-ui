---
title: Button
---

## 简介

按钮用于开始一个即时操作。此组件位于 `src/ui/Button/index.vue`。

## 基本用法

```vue
<template>
  <Button>默认</Button>
  <Button variant="primary">主操作</Button>
  <Button variant="destructive">危险</Button>
</template>

<script setup>
import Button from '/src/ui/Button/index.vue'
</script>
```

## 常用 Props (示例)

- `variant` — 样式变体：`default | primary | destructive | ghost`。
- `disabled` — 是否禁用。
- `loading` — 显示加载状态。

> 如需保留原生按钮 `<button>` 的 `type="button|submit|reset"` 属性，请通过 `v-bind="{ type: 'button' }"` 等方式传入。

> 参考类型定义（若存在）：`src/ui/Button/types.ts`。
