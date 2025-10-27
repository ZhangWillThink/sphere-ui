<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Button, Input, Select } from '.'

defineOptions({ name: 'App' })

const colorMode = useColorMode()

colorMode.value = 'auto'
</script>

<template>
  <main class="bg- h-svh w-svw">
    <Button variant="default">123</Button>

    <div class="flex w-1/2 flex-col gap-4">
      <Input />

      <Select :options="[{ label: '123', value: 1 }]" />

      <Select
        multiple
        :options="[
          { label: '123', value: 1 },
          { label: '123', value: 2 },
        ]"
      />
    </div>
  </main>
</template>
