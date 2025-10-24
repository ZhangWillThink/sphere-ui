---
title: Input
---

## 简介

文本输入框，封装了常见的输入交互。位于 `src/ui/Input/index.vue`。

## 基本用法

```vue
<template>
  <SInput v-model:value="text" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
import SInput from '/src/ui/Input/index.vue'
const text = ref('')
</script>
```

## 常用 Props

- `modelValue` / `v-model` — 输入值。
- `placeholder` — 占位符。
- `disabled` — 是否禁用。

> 参考：查看 `src/ui/Input/index.vue` 内的事件与属性定义。
