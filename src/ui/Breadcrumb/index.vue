<script setup lang="ts">
import type { BreadcrumbProps, BreadcrumbSlots } from './types'
import type { VNodeChild } from 'vue'

import { defineProps, isVNode } from 'vue'

import BreadcrumbItem from './item.vue'
import BreadcrumbSeparator from './separator.vue'

defineOptions({ name: 'SphereBreadcrumb' })

const { separator = '/', items = [] } = defineProps<BreadcrumbProps>()

interface BreadcrumbSlotsWithSeparator extends BreadcrumbSlots {
  separator?: () => VNodeChild
}

defineSlots<BreadcrumbSlotsWithSeparator>()

// Expose sub-components
defineExpose({
  Item: BreadcrumbItem,
  Separator: BreadcrumbSeparator,
})
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center">
      <!-- Render items from items prop if provided -->
      <template v-if="items && items.length > 0">
        <template v-for="(item, index) in items" :key="index">
          <li class="flex items-center">
            <BreadcrumbItem :href="item.href" :class="item.class" :onClick="item.onClick">
              <component v-if="isVNode(item.title)" :is="item.title" />
              <template v-else>
                {{ item.title }}
              </template>
            </BreadcrumbItem>
          </li>

          <!-- Separator -->
          <li v-if="index < items.length - 1" class="flex items-center">
            <slot name="separator">
              <BreadcrumbSeparator>{{ separator }}</BreadcrumbSeparator>
            </slot>
          </li>
        </template>
      </template>

      <template v-else>
        <template v-for="(child, index) in $slots.default?.()" :key="index">
          <li class="flex items-center">
            <component :is="child" />
          </li>

          <li v-if="index < ($slots.default?.().length || 0) - 1" class="flex items-center">
            <slot name="separator">
              <BreadcrumbSeparator>{{ separator }}</BreadcrumbSeparator>
            </slot>
          </li>
        </template>
      </template>
    </ol>
  </nav>
</template>
