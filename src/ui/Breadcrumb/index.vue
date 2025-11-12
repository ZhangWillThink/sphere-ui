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
    <ol
      class="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm wrap-break-word sm:gap-2.5"
    >
      <template v-for="(item, i) in items" :key="i">
        <li class="hover:text-foreground inline-flex items-center gap-1.5 transition-colors">
          <span v-if="i !== 0" class="[&>svg]:size-3.5">
            <template v-if="separator">
              <component v-if="isVNode(separator)" :is="separator" />
              <template v-else>{{ separator }}</template>
            </template>
            <template v-else>/</template>
          </span>

          <component :is="item.href ? 'a' : 'span'" :href="item.href" @click="item.onClick?.()">
            <component v-if="isVNode(item.title)" :is="item.title" />
            <template v-else-if="item.title">{{ item.title }}</template>
          </component>
        </li>
      </template>
    </ol>
  </nav>
</template>
