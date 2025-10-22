````markdown
# Table

Powerful data table with sorting and pagination.

## Basic

<script setup>
const columns = [{ key: 'name', title: 'Name' }, { key: 'age', title: 'Age' }]
const data = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]
</script>

<div class="demo-container">
  <Table :columns="columns" :data="data" />
</div>

```vue
<template>
  <Table :columns="columns" :data="data" />
</template>
```
````
