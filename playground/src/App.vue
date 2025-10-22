<script setup lang="ts">
import { Button, Select } from 'rings-ui'

defineOptions({ name: 'App' })
</script>

<template>
  <Button variant="primary">Click me</Button>

  <Select :options="[{ label: '123', value: 1 }]" />
</template>
