<script setup lang="ts">
import type { TabsProps, TabsSlots, TabsItem } from './types'

import { computed, isVNode } from 'vue'

defineOptions({ name: 'UiTabs', inheritAttrs: true })

const { items } = defineProps<TabsProps>()

const modelValue = defineModel<any>({ default: undefined })

defineSlots<TabsSlots>()

// 初始化当前激活的标签
const activeTab = computed({
  get: () => {
    if (modelValue.value !== undefined) {
      return modelValue.value
    }
    // 默认选择第一个未禁用的选项
    const firstEnabled = items.find(item => !item.disabled)
    return firstEnabled?.value
  },
  set: value => {
    modelValue.value = value
  },
})

const selectTab = (item: TabsItem) => {
  if (item.disabled) return
  activeTab.value = item.value
}

const isActive = (value: any) => {
  return activeTab.value === value
}
</script>

<template>
  <div class="w-full">
    <div class="glass mb-4 inline-flex gap-1 rounded-lg p-1">
      <button
        v-for="item in items"
        :key="item.value"
        :class="[
          'rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none',
          isActive(item.value)
            ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-400'
            : 'text-foreground/70 hover:text-foreground hover:bg-white/50 dark:hover:bg-gray-800/50',
          item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ]"
        :disabled="item.disabled"
        @click="selectTab(item)"
      >
        <component v-if="isVNode(item.label)" :is="item.label" />
        <template v-else>{{ item.label }}</template>
      </button>
    </div>

    <div v-for="item in items" :key="item.value">
      <template v-if="isActive(item.value)">
        <slot :name="`tab-${item.value}`">
          <component v-if="isVNode(item.children)" :is="item.children" />
          <template v-else-if="item.children">{{ item.children }}</template>
        </slot>
      </template>
    </div>
  </div>
</template>
