---
title: Form
---

## 简介

表单组件封装了表单的上下文、校验与提交行为。相关文件：`src/ui/Form/`。

## 基本用法

```vue
<template>
  <SForm @submit.prevent="onSubmit">
    <SFormItem label="用户名">
      <SInput v-model:value="model.username" />
    </SFormItem>

    <SFormItem label="密码">
      <SInput type="password" v-model:value="model.password" />
    </SFormItem>

    <SButton type="primary" native-type="submit">提交</SButton>
  </SForm>
</template>

<script setup>
import { reactive } from 'vue'
import SForm from '/src/ui/Form/index.vue'
import SFormItem from '/src/ui/Form/item.vue'
import SInput from '/src/ui/Input/index.vue'
import SButton from '/src/ui/Button/index.vue'

const model = reactive({ username: '', password: '' })
function onSubmit() {
  // 处理提交
  console.log('submit', model)
}
</script>
```

## 注意

- `src/ui/Form/type.ts` 和 `src/ui/Form/util.ts` 中包含行为细节和类型定义，建议参考这些文件来补充文档与示例。
