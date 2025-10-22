````markdown
# Select

Select dropdown for choosing options.

## Basic

<script setup>
import { ref } from 'vue'
const val = ref('one')
</script>

<div class="demo-container">
  <Select v-model="val">
    <Select.Option value="one">One</Select.Option>
    <Select.Option value="two">Two</Select.Option>
  </Select>
  <div class="mt-2">Value: {{ val }}</div>
</div>

```vue
<template>
  <Select v-model="val">
    <Select.Option value="one">One</Select.Option>
  </Select>
</template>
</script>
```
````
