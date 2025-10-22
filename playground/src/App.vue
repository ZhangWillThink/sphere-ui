<script setup lang="ts">
import { Button, Select } from 'sphere-ui'

defineOptions({ name: 'App' })
</script>

<template>
  <div class="flex items-center gap-3">
    <Button variant="primary">Click me</Button>

    <Button loading variant="destructive">Danger</Button>
  </div>

  <Select :options="[{ label: '123', value: 1 }]" />
</template>
