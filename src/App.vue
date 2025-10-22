<script setup lang="ts">
import { Button, Select } from '.'

defineOptions({ name: 'App' })
</script>

<template>
  <Button>123</Button>

  <div class="flex w-1/2 flex-col gap-4">
    <Select :options="[{ label: '123', value: 1 }]" />

    <Select
      multiple
      :options="[
        { label: '123', value: 1 },
        { label: '123', value: 2 },
      ]"
    />
  </div>
</template>
