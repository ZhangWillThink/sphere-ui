<script setup lang="ts">
import { useColorMode } from '@vueuse/core'

import { Button, Card, Menu } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-bg-primary h-svh w-svw">
    <Button variant="primary" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
      {{ colorMode === 'light' ? 'Dark' : 'Light' }}
    </Button>

    <Menu
      :items="[
        {
          label: 'Option 1',
          disabled: true,
          children: [
            {
              label: 'Option 1-1',
            },
            {
              label: 'Option 1-2',
            },
            {
              label: 'Option 1-3',
            },
          ],
        },
        {
          label: 'Option 2',
          children: [
            {
              label: 'Option 2-1',
            },
            {
              label: 'Option 2-2',
            },
            {
              label: 'Option 2-3',
            },
          ],
        },
        {
          label: 'Option 3',
        },
        {
          label: 'Option 4',
        },
        {
          label: 'Option 5',
        },
        {
          label: 'Option 6',
        },
        {
          label: 'Option 7',
        },
        {
          label: 'Option 8',
        },
      ]"
    />

    <Card draggable class="cursor-move">
      <Button>Button</Button>
    </Card>
  </div>
</template>
