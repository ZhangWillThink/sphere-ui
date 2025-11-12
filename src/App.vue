<script setup lang="ts">
import { h } from 'vue'

import { Moon } from '@icon-park/vue-next'
import { useColorMode } from '@vueuse/core'

import { Breadcrumb, Button, Card, Checkbox, Collapse, Select, Tooltip } from './ui'

defineOptions({ name: 'App' })

const colorMode = useColorMode()
</script>

<template>
  <div class="bg-background relative h-svh w-svw space-y-10 p-10">
    <Button variant="default" @click="colorMode = colorMode === 'light' ? 'dark' : 'light'">
      {{ colorMode === 'light' ? 'Dark' : 'Light' }}
    </Button>

    <Collapse
      :items="[
        { label: 'Collapse 1', key: '1', children: 'Collapse Content' },
        { label: 'Collapse 2', key: '2', children: 'Collapse Content' },
        { label: 'Collapse 3', key: '3', children: 'Collapse Content' },
      ]"
    ></Collapse>

    <Breadcrumb
      :items="[
        { title: 'Home', href: '/' },
        { title: 'About', href: '/about' },
      ]"
    />

    <Card>
      <template #title>Card Title</template>
      <template #description>Card Description</template>
      <p class="text-lg leading-7">This is a starter template.</p>

      <template #footer>
        <Button variant="destructive">Cancel</Button>
        <Button variant="default">Save</Button>
      </template>
    </Card>

    <Checkbox description="description"> Label </Checkbox>

    <Tooltip>
      <Button :icon="h(Moon)" variant="ghost">123</Button>

      <template #content> Tooltip </template>
    </Tooltip>

    <div class="w-1/2">
      <Select
        :options="[
          { label: 'Option 1', value: 1 },
          { label: 'Option 2', value: 2 },
          { label: 'Option 3', value: 3 },
        ]"
      />
    </div>
  </div>
</template>
