<script lang="ts">
interface CollapseItem {
  key: any
  children?: VNodeChild
  label: VNodeChild
}

const collapseItem = cva('transition-all duration-200 ease-in-out', {
  variants: {
    variant: {
      bordered: [
        '[&:not(:last-child)]:border-b [&:not(:last-child)]:border-gray-200 [&:not(:last-child)]:dark:border-gray-700',
      ],
      ghost: ['border-0', '[&:not(:last-child)]:mb-2'],
    },
  },
  defaultVariants: {
    variant: 'bordered',
  },
})

const collapseHeader = cva(
  [
    'flex cursor-pointer items-center justify-between px-4 py-3',
    'font-medium transition-colors duration-200',
  ],
  {
    variants: {
      variant: {
        bordered: 'hover:bg-gray-50 dark:hover:bg-gray-800/50',
        ghost: ['glass rounded-md shadow dark:shadow-lg dark:shadow-black/20', 'hover:glass-light'],
      },
    },
    defaultVariants: {
      variant: 'bordered',
    },
  },
)
</script>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import type { VNodeChild } from 'vue'

import { computed, isVNode } from 'vue'

import { DownOne } from '@icon-park/vue-next'
import { cva } from 'class-variance-authority'

import CollapseTransition from '../Transition/Collapse.vue'

defineOptions({ name: 'SphereCollapse', inheritAttrs: true })

type CollapseVariant = VariantProps<typeof collapseItem>['variant']

const {
  items,
  accordion = false,
  variant = 'bordered',
} = defineProps<{
  items: CollapseItem[]
  accordion?: boolean
  variant?: CollapseVariant
}>()

const modelValue = defineModel<any[] | any>({ required: false })

const activeKeys = computed<any[]>({
  get: () => {
    const val = modelValue.value
    if (accordion) return val ? [val] : []
    return Array.isArray(val) ? val : val ? [val] : []
  },
  set: val => {
    modelValue.value = accordion ? (val.length ? val[0] : undefined) : val
  },
})

const toggleItem = (key: any) => {
  let current: any[] = [...activeKeys.value]
  if (current.includes(key)) {
    current = current.filter(k => k !== key)
  } else {
    if (accordion) current = [key]
    else current = [...current, key]
  }
  activeKeys.value = current
}

defineSlots<{
  [key: `panel-${string}`]: () => VNodeChild
}>()
</script>

<template>
  <div
    v-bind="$attrs"
    :class="[
      'text-text-primary w-full',
      {
        'glass overflow-hidden rounded-lg shadow dark:shadow-lg dark:shadow-black/20':
          variant === 'bordered',
      },
    ]"
  >
    <div v-for="item in items" :key="item.key" :class="collapseItem({ variant })">
      <div :class="collapseHeader({ variant })" @click="toggleItem(item.key)">
        <span class="font-medium">
          <component v-if="isVNode(item.label)" :is="item.label" />
          <template v-else>{{ item.label }}</template>
        </span>
        <DownOne
          :class="[
            'transition-all duration-200 ease-in-out',
            activeKeys.includes(item.key)
              ? 'rotate-180 text-gray-600 dark:text-gray-400'
              : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-400',
          ]"
        />
      </div>

      <CollapseTransition>
        <div
          v-show="activeKeys.includes(item.key)"
          class="px-4 py-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400"
        >
          <slot :name="`panel-${item.key}`">
            <component v-if="isVNode(item.children)" :is="item.children" />
            <template v-else-if="item.children">{{ item.children }}</template>
          </slot>
        </div>
      </CollapseTransition>
    </div>
  </div>
</template>
