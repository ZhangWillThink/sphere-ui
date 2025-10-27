<script setup lang="ts">
import { h } from 'vue'

import { AssemblyLine, List } from '@icon-park/vue-next'
import { useColorMode } from '@vueuse/core'

import { Button, Input, Select, Menu } from '.'

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

    <div>
      <Menu
        class="w-70"
        :items="[
          { label: 'Flow', icon: h(AssemblyLine), children: [{ label: 'List', icon: h(List) }] },
          { label: '2', value: 2 },
          { label: h('p', { class: 'text-green-400' }, '123'), value: 3 },
        ]"
        @select="console.log"
      />
    </div>
  </main>
</template>
