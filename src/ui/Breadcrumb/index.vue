<script setup lang="ts">
import type { VNodeChild } from 'vue'

import { isVNode } from 'vue'

defineOptions({ name: 'SphereBreadcrumb', inheritAttrs: true })

defineProps<{
  separator?: VNodeChild
  items: Array<{ title: VNodeChild; href?: string; onClick?: () => void }>
}>()
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex items-center gap-1.5">
      <template v-for="(item, i) in items" :key="i">
        <li
          :class="[
            'flex cursor-pointer items-center gap-1.5',
            i === items.length - 1 ? 'text-text-primary' : 'text-text-secondary',
          ]"
        >
          <span v-if="i !== 0">
            <template v-if="separator">
              <component v-if="isVNode(separator)" :is="separator" />
              <template v-else>{{ separator }}</template>
            </template>
            <template v-else>/</template>
          </span>
          <component
            :is="item.href ? 'a' : 'span'"
            class="hover:bg-primary-300 rounded-lg px-1.5 py-1"
            :href="item.href"
            @click="item.onClick?.()"
          >
            <component v-if="isVNode(item.title)" :is="item.title" />
            <template v-else>{{ item.title }}</template>
          </component>
        </li>
      </template>
    </ol>
  </nav>
</template>
