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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm dark:bg-black/60"
        @click="toggleOpen(false)"
      >
        <div
          class="glass flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-lg shadow-xl dark:shadow-2xl dark:shadow-black/40"
          role="dialog"
          aria-modal="true"
          @click.stop
        >
          <header class="flex items-center justify-between p-4">
            <aside>
              <div class="text-lg font-semibold">
                <slot name="title">
                  <template v-if="title">
                    <component v-if="isVNode(title)" :is="title" />
                    <template v-else>{{ title }}</template>
                  </template>
                </slot>
              </div>

              <div v-if="description || slot.description" class="text-foreground/70 mt-1 text-xs">
                <slot name="description">
                  <template v-if="description">
                    <component v-if="isVNode(description)" :is="description" />
                    <template v-else>{{ description }}</template>
                  </template>
                </slot>
              </div>
            </aside>
            <button
              type="button"
              class="text-gray-400 transition-colors duration-150 ease-in-out hover:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:text-gray-300"
              @click="toggleOpen(false)"
            >
              <Close />
            </button>
          </header>

          <div class="flex-1 space-y-4 overflow-y-auto p-4">
            <slot name="default" />
          </div>

          <footer v-if="slot.footer || footer" class="p-4">
            <slot name="footer">
              <template v-if="footer">
                <component v-if="isVNode(footer)" :is="footer" />
                <template v-else>{{ footer }}</template>
              </template>
            </slot>
          </footer>
        </div>
      </main>
    </Transition>
  </Teleport>
</template>
