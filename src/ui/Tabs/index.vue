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

import { computed, isVNode } from 'vue'

defineOptions({ name: 'SphereTabs', inheritAttrs: true })

const { items, keepAlive = false } = defineProps<{
  items: TabsItem[]
  keepAlive?: boolean
}>()

defineSlots<{
  [key: `tab-${string}`]: () => VNodeChild
}>()

const modelValue = defineModel<any>({ default: undefined })

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
          'focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          isActive(item.value)
            ? 'text-primary-600 dark:text-primary-400 bg-white shadow-sm dark:bg-gray-800 dark:shadow-lg dark:shadow-black/20'
            : 'text-card-foreground/70 hover:text-card-foreground hover:bg-white/50 dark:text-gray-300 dark:hover:bg-gray-800/50',
          item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
        ]"
        :disabled="item.disabled"
        @click="selectTab(item)"
      >
        <component v-if="isVNode(item.label)" :is="item.label" />
        <template v-else>{{ item.label }}</template>
      </button>
    </div>

    <KeepAlive :max="keepAlive ? items.length : undefined">
      <template v-for="item in items" :key="item.value">
        <slot v-if="isActive(item.value)" :name="`tab-${item.value}`">
          <component v-if="isVNode(item.children)" :is="item.children" />
          <template v-else-if="item.children">{{ item.children }}</template>
        </slot>
      </template>
    </KeepAlive>
  </div>
</template>
