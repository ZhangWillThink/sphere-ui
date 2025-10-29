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
    class="glass text-foreground rounded-lg shadow-sm dark:shadow-lg dark:shadow-black/20"
  >
    <header v-if="slot.cover" class="text-2xl leading-none font-semibold tracking-tight">
      <slot name="cover">
        <template v-if="cover">
          <component v-if="isVNode(cover)" :is="cover" />
          <template v-else>{{ cover }}</template>
        </template>
      </slot>
    </header>

    <div class="space-y-6 p-6">
      <header
        v-if="title || slot.title || description || slot.description"
        class="flex flex-col space-y-1.5"
      >
        <h3 v-if="title || slot.title" class="text-xl leading-none font-semibold">
          <slot name="title">
            <template v-if="title">
              <component v-if="isVNode(title)" :is="title" />
              <template v-else>{{ title }}</template>
            </template>
          </slot>
        </h3>
        <p
          v-if="description || slot.description"
          class="text-foreground/70 text-sm leading-relaxed"
        >
          <slot name="description">
            <template v-if="description">
              <component v-if="isVNode(description)" :is="description" />
              <template v-else>{{ description }}</template>
            </template>
          </slot>
        </p>
      </header>

      <slot name="default" />

      <slot name="footer">
        <template v-if="footer">
          <component v-if="isVNode(footer)" :is="footer" />
          <template v-else>{{ footer }}</template>
        </template>
      </slot>
    </div>
  </div>
</template>
