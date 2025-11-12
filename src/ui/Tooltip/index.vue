<script setup lang="ts">
import type { CornerPosition } from '../shared/hooks/useFixedPosition'
import type { VNodeChild } from 'vue'

import { isVNode, useTemplateRef } from 'vue'

import { useMouseInElement, useToggle, watchDebounced } from '@vueuse/core'

import useFixedPosition from '../shared/hooks/useFixedPosition'

defineOptions({ name: 'SphereTooltip', inheritAttrs: true })

const {
  content,
  position = 'bottom-center',
  disabled = false,
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
const tooltip = useTemplateRef('tooltip')

const [visible, toggleVisible] = useToggle(false)

const { isOutside: isOutsideTrigger } = useMouseInElement(trigger)
const { isOutside: isOutsideTooltip } = useMouseInElement(tooltip)

const [tooltipStyle] = useFixedPosition(position, trigger, tooltip)

watchDebounced(
  [isOutsideTrigger, isOutsideTooltip] as const,
  ([isOutsideTrigger, isOutsideTooltip]) => {
    const shouldShow = (!isOutsideTrigger || !isOutsideTooltip) && !disabled
    toggleVisible(shouldShow)
  },
  { debounce: 300, deep: true },
)
</script>

<template>
  <div v-bind="$attrs" ref="trigger" class="inline-block">
    <slot name="default" />
  </div>

  <Teleport to="body">
    <Transition
      appear
      enterActiveClass="animate__animated animate__fadeIn"
      leaveActiveClass="animate__animated animate__fadeOut"
    >
      <div
        v-if="visible && (content || slot.content)"
        ref="tooltip"
        :style="tooltipStyle"
        class="bg-foreground/70 text-background z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance backdrop-blur-lg"
        data-slot="tooltip-content"
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
