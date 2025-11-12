<script setup lang="ts">
import { isVNode, type VNodeChild } from 'vue'

defineOptions({ name: 'SphereCard', inheritAttrs: true })

const { title, description, cover, footer } = defineProps<{
  title?: VNodeChild
  description?: VNodeChild
  cover?: VNodeChild
  footer?: VNodeChild
}>()

const slot = defineSlots<{
  title?: () => VNodeChild
  description?: () => VNodeChild
  cover?: () => VNodeChild
  default?: () => VNodeChild
  footer?: () => VNodeChild
}>()
</script>

<template>
  <div
    v-bind="$attrs"
    class="bg-card/70 text-card-foreground border-accent flex flex-col gap-4 rounded-xl border py-4 shadow-sm backdrop-blur-lg"
  >
    <header v-if="slot.cover" class="text-2xl leading-none font-semibold tracking-tight">
      <slot name="cover">
        <component v-if="isVNode(cover)" :is="cover" />
        <template v-else-if="cover">{{ cover }}</template>
      </slot>
    </header>

    <div class="space-y-4 p-4">
      <header
        v-if="title || slot.title || description || slot.description"
        class="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-4 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-4"
      >
        <h3 v-if="title || slot.title" class="leading-none font-semibold">
          <slot name="title">
            <component v-if="isVNode(title)" :is="title" />
            <template v-else-if="title">{{ title }}</template>
          </slot>
        </h3>
        <p v-if="description || slot.description" class="text-muted-foreground text-sm">
          <slot name="description">
            <component v-if="isVNode(description)" :is="description" />
            <template v-else-if="description">{{ description }}</template>
          </slot>
        </p>
      </header>

      <div v-if="slot.default" class="px-4">
        <slot name="default" />
      </div>

      <footer v-if="footer || slot.footer" class="flex items-center px-4 [.border-t]:pt-4">
        <slot name="footer">
          <component v-if="isVNode(footer)" :is="footer" />
          <template v-else-if="footer">{{ footer }}</template>
        </slot>
      </footer>
    </div>
  </div>
</template>
