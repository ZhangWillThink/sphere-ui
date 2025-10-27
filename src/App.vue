<script setup lang="ts">
import { h } from 'vue'

import { AssemblyLine, List, DoneAll } from '@icon-park/vue-next'
import { useColorMode } from '@vueuse/core'

import { Button, Input, Select, Menu, Message } from '.'

defineOptions({ name: 'App' })

const colorMode = useColorMode()

colorMode.value = 'auto'

const btnClick = () => {
  Message.info('按钮点击成功消息')
}
</script>

<template>
  <main class="h-svh w-svw">
    <Button variant="default" @click="btnClick">123</Button>

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
          {
            label: 'Flow',
            icon: h(AssemblyLine),
            children: [
              { label: h('p', { class: 'text-green-400' }, 'List'), icon: h(List), value: '/flow' },
              { label: 'Result', icon: h(DoneAll), value: '/flow/result' },
            ],
          },
          { label: '2', value: 2 },
          { label: h('p', { class: 'text-green-400' }, '123'), value: 3 },
        ]"
        @select="console.log"
      />
    </div>
  </main>
</template>
