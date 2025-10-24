---
title: Checkbox
---

## 简介

复选框用于二选或多选场景，位于 `src/ui/Checkbox/index.vue`。

## 基本用法

```vue
<template>
  <SCheckbox v-model:checked="checked">勾选我</SCheckbox>
</template>

<script setup>
import { ref } from 'vue'
import SCheckbox from '/src/ui/Checkbox/index.vue'
const checked = ref(false)
</script>
```

## 常用 Props

- `checked` / `v-model:checked` — 是否选中。
- `disabled` — 禁用。
