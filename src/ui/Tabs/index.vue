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
  [key: `item-${string}`]: () => VNodeChild
}>()

const modelValue = defineModel<any>({ default: undefined })

const activeTab = computed({
  get: () => {
    if (modelValue.value !== undefined) return modelValue.value

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
  <div
    v-bind="$attrs"
    ref="root"
    class="text-foreground flex flex-col gap-2"
    dir="ltr"
    data-orientation="horizontal"
    data-slots="tabs"
  >
    <div
      role="tablist"
      aria-orientation="horizontal"
      data-slot="tabs-list"
      class="bg-muted/70 text-muted-foreground sticky top-0 mb-4 inline-flex h-9 w-full items-center justify-center gap-1 rounded-lg p-1 dark:shadow-lg dark:shadow-black/20"
    >
      <button
        v-for="item in items"
        :key="item.value"
        class="data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow,background-color] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
        :disabled="item.disabled"
        type="button"
        role="tab"
        :aria-selected="isActive(item.value)"
        :data-state="isActive(item.value) ? 'active' : ''"
        data-orientation="horizontal"
        tabindex="0"
        @click="selectTab(item)"
      >
        <component v-if="isVNode(item.label)" :is="item.label" />
        <template v-else>{{ item.label }}</template>
      </button>
    </div>

    <KeepAlive :max="keepAlive ? items.length : undefined">
      <template v-for="item in items" :key="item.value">
        <slot v-if="isActive(item.value)" :name="`item-${item.value}`">
          <component v-if="isVNode(item.children)" :is="item.children" />
          <template v-else-if="item.children">{{ item.children }}</template>
        </slot>
      </template>
    </KeepAlive>
  </div>
</template>
