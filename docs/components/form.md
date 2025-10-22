````markdown
# Form

Form helpers and layout for building forms.

## Basic

<script setup>
import { ref } from 'vue'
const model = ref({ name: '' })
</script>

<div class="demo-container">
  <Form :model="model">
    <Form.Item label="Name" prop="name">
      <Input v-model="model.name" />
    </Form.Item>
  </Form>
  <div class="mt-2">Model: {{ model }}</div>
</div>

```vue
<template>
  <Form :model="model">
    <Form.Item label="Name" prop="name">
      <Input v-model="model.name" />
    </Form.Item>
  </Form>
</template>
</script>
```
````
