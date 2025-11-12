<script lang="ts">
interface CollapseItem {
  key: any
  disabled?: boolean
  children?: VNodeChild
  label: VNodeChild
}
</script>

<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { isVNode } from 'vue'

import { Down } from '@icon-park/vue-next'

import TransitionCollapse from '../Transition/Collapse.vue'

defineOptions({ name: 'SphereCollapse', inheritAttrs: true })

const { items, accordion = false } = defineProps<{
  items: CollapseItem[]
  accordion?: boolean
}>()

const modelValue = defineModel<any[] | any>({ required: false, default: () => [] })

const toggleItem = (item: CollapseItem) => {
  if (item.disabled) return
  let current: any[] = [...modelValue.value]
  if (current.includes(item.key)) {
    current = current.filter(k => k !== item.key)
  } else {
    if (accordion) current = [item.key]
    else current = [...current, item.key]
  }
  modelValue.value = current
}

defineSlots<{
  [key: `item-${string}`]: () => VNodeChild
}>()
</script>

<template>
  <div data-slot="accordion" class="w-full" data-orientation="vertical">
    <div
      v-for="item in items"
      :key="item.key"
      data-orientation="vertical"
      data-slot="accordion-item"
      class="border-border text-card-foreground border-b last:border-b-0"
    >
      <h3
        data-orientation="vertical"
        :data-state="modelValue.includes(item.key) ? 'open' : 'closed'"
        class="flex"
        @click="toggleItem(item)"
      >
        <button
          type="button"
          :aria-expanded="modelValue.includes(item.key)"
          data-orientation="vertical"
          id="radix-_r_2g_"
          :disabled="item.disabled"
          data-slot="accordion-trigger"
          class="focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 cursor-pointer items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          <component v-if="isVNode(item.label)" :is="item.label" />
          <template v-else-if="item.label">{{ item.label }}</template>

          <Down
            :class="[{ 'rotate-180': modelValue.includes(item.key) }, 'transition-transform']"
          />
        </button>
      </h3>
      <TransitionCollapse>
        <div
          v-if="modelValue.includes(item.key)"
          role="region"
          data-orientation="vertical"
          data-slot="accordion-content"
          class="overflow-hidden pb-4 text-sm"
        >
          <slot :name="`item-${item.key}`">
            <component v-if="isVNode(item.children)" :is="item.children" />
            <template v-else-if="item.children">{{ item.children }}</template>
          </slot>
        </div>
      </TransitionCollapse>
    </div>
  </div>
</template>
