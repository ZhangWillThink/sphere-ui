<script setup lang="ts">
import { h } from 'vue'

import { AssemblyLine, DoneAll, List } from '@icon-park/vue-next'
import { useColorMode } from '@vueuse/core'

import { Input, Upload } from './ui'
import AdvancedUsage from './ui/Table/examples/AdvancedUsage.vue'
import BasicUsage from './ui/Table/examples/BasicUsage.vue'

import { Button, Menu, Message, Pagination, Slider, Switch, Textarea } from '.'

defineOptions({ name: 'App' })

const colorMode = useColorMode()

const btnClick = () => {
  Message.info('按钮点击成功消息')
}

const toggleDarkMode = () => {
  colorMode.value = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <main class="min-h-svh w-svw bg-white p-7 transition-colors duration-300 dark:bg-gray-900">
    <Switch />

    <Input class="w-1/4" placeholder="aslkdfjaslkdfjskaldfjlksad" />

    <Slider :max="200" :step="0.1" />

    <Upload
      :onChange="
        async files => {
          console.log(files)
        }
      "
    />

    <Textarea class="w-30" placeholder="123123asdfasdfsadfasdfasdfhahahah" />

    <div class="p-4">
      <div class="mb-4 flex items-center gap-4">
        <Button variant="default" @click="toggleDarkMode">
          切换主题 (当前: {{ colorMode }})
        </Button>
        <Button variant="default" @click="btnClick">测试消息</Button>
      </div>

      <div
        class="mb-4 rounded-lg bg-gray-100 p-4 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
      >
        <p>
          当前主题模式: <strong>{{ colorMode }}</strong>
        </p>
        <p>这个区域应该在深色模式下显示为深色背景和浅色文字</p>
      </div>
    </div>

    <BasicUsage />

    <AdvancedUsage />

    <div class="p-4">
      <Pagination :total="100" :pageSize="10" :current="1" />

      <div class="mt-4">
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
    </div>
  </main>
</template>
