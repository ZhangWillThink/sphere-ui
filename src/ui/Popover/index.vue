<script setup lang="ts">
import type { CornerPosition } from '../shared/hooks/useFixedPosition'
import type { VNodeChild } from 'vue'

import { isVNode, useTemplateRef } from 'vue'

import { onClickOutside, useToggle } from '@vueuse/core'

import useFixedPosition from '../shared/hooks/useFixedPosition'

defineOptions({ name: 'SpherePopover', inheritAttrs: true })

const {
  content,
  position = 'bottom-center',
  disabled,
} = defineProps<{
  content?: VNodeChild
  disabled?: boolean
  position?: CornerPosition
}>()

const slot = defineSlots<{
  default: () => VNodeChild
  content?: () => VNodeChild
}>()

const trigger = useTemplateRef('trigger')
const popover = useTemplateRef('popover')

const [visible, toggleVisible] = useToggle(false)

const [popoverStyle] = useFixedPosition(position, trigger, popover)

const hidePopover = () => {
  toggleVisible(false)
}

const togglePopover = () => {
  if (disabled) return
  toggleVisible()
}

onClickOutside(trigger, hidePopover, {
  ignore: [popover],
})
</script>

<template>
  <div v-bind="$attrs" ref="trigger" class="inline-block" @click="togglePopover">
    <slot name="default" />
  </div>

  <Teleport to="body">
    <Transition
      appear
      enterActiveClass="animate__animated animate__fadeIn duration-200"
      leaveActiveClass="animate__animated animate__fadeOut duration-200"
    >
      <div
        v-if="visible && (content || slot.content)"
        ref="popover"
        :style="popoverStyle"
        class="bg-background/40 text-foreground z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance shadow-2xl backdrop-blur-lg"
        data-slot="popover-content"
      >
        <slot name="content">
          <template v-if="content">
            <component v-if="isVNode(content)" :is="content" />
            <template v-else-if="content">{{ content }}</template>
          </template>
        </slot>
      </div>
    </Transition>
  </Teleport>
</template>
