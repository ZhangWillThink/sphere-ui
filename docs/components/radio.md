````markdown
# Radio

Radio buttons allow selecting a single option from a list.

## Basic

<script setup>
import { ref } from 'vue'
const val = ref('a')
</script>

<div class="demo-container">
  <Radio v-model="val" value="a">A</Radio>
  <Radio v-model="val" value="b">B</Radio>
  <div class="mt-2">Selected: {{ val }}</div>
</div>

```vue
<template>
  <Radio v-model="val" value="a">A</Radio>
  <Radio v-model="val" value="b">B</Radio>
</template>
</script>
```
````
