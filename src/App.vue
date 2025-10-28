<script setup lang="ts">
import { h } from 'vue'

import { AssemblyLine, List, DoneAll } from '@icon-park/vue-next'
import { useColorMode } from '@vueuse/core'

import AdvancedUsage from './ui/Table/examples/AdvancedUsage.vue'

import { Button, Menu, Message, Pagination } from '.'

defineOptions({ name: 'App' })

const colorMode = useColorMode()

colorMode.value = 'auto'

const btnClick = () => {
  Message.info('按钮点击成功消息')
}
</script>

<template>
  <main class="h-svh w-svw">
    <AdvancedUsage />
    <Button variant="default" @click="btnClick">123</Button>

    <Pagination :total="100" :pageSize="10" :current="1" />

    <div>
      <Menu
        :modelValue="`/flow`"
        class="w-70"
        :items="[
          {
            label: 'Flow',
            icon: h(AssemblyLine),
            children: [
              {
                label: h('p', { class: 'text-green-400' }, 'List'),
                icon: h(List),
                value: '/flow',
                key: '/flow',
              },
              { label: 'Result', icon: h(DoneAll), value: '/flow/result', key: '/flow/result' },
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
