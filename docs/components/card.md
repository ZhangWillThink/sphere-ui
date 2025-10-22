````markdown
# Card

Cards are used to group related content and actions in a container with subtle elevation.

## Basic Usage

A simple card with header, body and footer.

<script setup>
import { ref } from 'vue'
</script>

<div class="demo-container">
  <Card>
    <template #header>
      <div class="font-semibold">Card Title</div>
    </template>
    <div>Card body content goes here. Use cards to surface related content.</div>
    <template #footer>
      <div class="flex justify-end">
        <Button variant="ghost">Action</Button>
      </div>
    </template>
  </Card>
</div>

```vue
<template>
  <Card>
    <template #header>
      <div class="font-semibold">Card Title</div>
    </template>
    <div>Card body content goes here.</div>
    <template #footer>
      <div class="flex justify-end">
        <Button variant="ghost">Action</Button>
      </div>
    </template>
  </Card>
</template>
```
````

## API

| Prop | Type | Default | Description                                              |
| ---- | ---- | ------- | -------------------------------------------------------- |
| —    | —    | —       | Card primarily uses slots: `header`, `default`, `footer` |

```

```
