<script setup lang="ts">
import { isVNode, type VNodeChild } from 'vue'

import { Close } from '@icon-park/vue-next'
import { useToggle } from '@vueuse/core'

defineOptions({ name: 'SphereDialog', inheritAttrs: false })

defineProps<{
  title?: VNodeChild
  description?: VNodeChild
  footer?: VNodeChild
}>()

const slot = defineSlots<{
  default: () => VNodeChild
  title?: () => VNodeChild
  description?: () => VNodeChild
  footer?: () => VNodeChild
}>()

const modelValue = defineModel<boolean>({ required: false })

const toggleOpen = useToggle(modelValue)
</script>

<template>
  <Teleport to="body">
    <Transition
      appear
      enterActiveClass="animate__animated animate__fadeIn animate__faster"
      leaveActiveClass="animate__animated animate__fadeOut animate__faster"
    >
      <main
        v-if="modelValue"
        class="bg-default/60 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
        @click="toggleOpen(false)"
      >
        <div
          role="dialog"
          data-slot="dialog-content"
          class="bg-background/70 border-border pointer-events-auto fixed top-1/2 left-1/2 z-50 grid w-full max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border p-6 shadow-lg backdrop-blur-lg sm:max-w-105"
          tabindex="-1"
          @click.stop
        >
          <div data-slot="dialog-header" class="flex flex-col gap-2 text-center sm:text-left">
            <h2
              v-if="title || slot.title"
              data-slot="dialog-title"
              class="text-lg leading-none font-semibold"
            >
              <slot name="title">
                <component v-if="isVNode(title)" :is="title" />
                <template v-else-if="title">{{ title }}</template>
              </slot>
            </h2>
            <p
              v-if="description || slot.description"
              data-slot="dialog-description"
              class="text-muted-foreground text-sm"
            >
              <slot name="description">
                <component v-if="isVNode(description)" :is="description" />
                <template v-else-if="description">{{ title }}</template>
              </slot>
            </p>
          </div>

          <slot name="default" />

          <div
            data-slot="dialog-footer"
            class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
          >
            <slot name="footer">
              <component v-if="isVNode(footer)" :is="footer" />
              <template v-else-if="footer">{{ footer }}</template>
            </slot>
          </div>
          <button
            type="button"
            data-slot="dialog-close"
            class="ring-offset-background focus:ring-ring [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 absolute top-4 right-4 cursor-pointer rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none"
          >
            <Close />
            <span class="sr-only">Close</span>
          </button>
        </div>
      </main>
    </Transition>
  </Teleport>
</template>
