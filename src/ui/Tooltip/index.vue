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
  () => [isOutsideTrigger, isOutsideTooltip] as const,
  ([isOutsideTrigger, isOutsideTooltip]) => {
    const shouldShow = (!isOutsideTrigger.value || !isOutsideTooltip.value) && !disabled
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
        class="glass z-50 rounded-lg p-2 shadow-lg dark:shadow-xl dark:shadow-black/40"
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
