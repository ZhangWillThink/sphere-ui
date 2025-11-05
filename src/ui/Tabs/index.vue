<script lang="ts">
export interface TabsItem {
  disabled?: boolean
  label: VNodeChild
  value: any
  children?: VNodeChild
}
</script>

<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { computed, isVNode, useTemplateRef } from 'vue'

defineOptions({ name: 'SphereTabs', inheritAttrs: true })

const { items } = defineProps<{
  items: {
    disabled?: boolean
    label: VNodeChild
    value: any
    children?: VNodeChild
  }[]
}>()

defineSlots<{
  [key: `tab-${string}`]: () => VNodeChild
}>()

const modelValue = defineModel<any>({ default: undefined })

const root = useTemplateRef('root')

// 初始化当前激活的标签
const activeTab = computed({
  get: () => {
    if (modelValue.value !== undefined) return modelValue.value

    // 默认选择第一个未禁用的选项
    const firstEnabled = items.find(item => !item.disabled)
    return firstEnabled?.value
  },
  set: value => (modelValue.value = value),
})

const selectTab = (item: TabsItem) => {
  if (item.disabled) return
  activeTab.value = item.value
}

const isActive = (value: any) => activeTab.value === value

defineExpose({ root })
</script>

<template>
  <div v-bind="$attrs" ref="root" class="w-full">
    <div
      class="glass sticky top-0 mb-4 inline-flex w-full gap-1 rounded-lg p-1 dark:shadow-lg dark:shadow-black/20"
    >
      <button
        v-for="item in items"
        :key="item.value"
        :class="[
          'flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out',
          'focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none dark:focus-visible:ring-blue-400',
          isActive(item.value)
            ? 'bg-white text-blue-600 shadow-sm dark:bg-gray-800 dark:text-blue-400 dark:shadow-lg dark:shadow-black/20'
            : 'text-text-primary/70 hover:text-text-primary hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-800/50',
          item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ]"
        :disabled="item.disabled"
        @click="selectTab(item)"
      >
        <component v-if="isVNode(item.label)" :is="item.label" />
        <template v-else>{{ item.label }}</template>
      </button>
    </div>

    <template v-for="item in items" :key="item.value">
      <slot v-if="isActive(item.value)" :name="`tab-${item.value}`">
        <component v-if="isVNode(item.children)" :is="item.children" />
        <template v-else-if="item.children">{{ item.children }}</template>
      </slot>
    </template>
  </div>
</template>
