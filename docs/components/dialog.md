---
title: Dialog
---

## 简介

对话框组件用于模态交互，位于 `src/ui/Dialog/index.vue`。

## 基本用法

```vue
<template>
  <SButton @click="open = true">打开对话框</SButton>
  <SDialog v-model:visible="open" title="示例对话框">
    <p>内容区域</p>
    <template #footer>
      <SButton @click="open = false">取消</SButton>
      <SButton type="primary" @click="confirm">确定</SButton>
    </template>
  </SDialog>
</template>

<script setup>
import { ref } from 'vue'
import SButton from '/src/ui/Button/index.vue'
import SDialog from '/src/ui/Dialog/index.vue'

const open = ref(false)
function confirm() {
  open.value = false
}
</script>
```

## Props & 事件

- `visible` / `v-model:visible` 控制显示。
- `title` 标题。
- 事件：`open` / `close` 等（请查看组件实现）。
