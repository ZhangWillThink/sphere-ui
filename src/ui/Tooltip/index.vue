<script setup lang="ts">
import type { CornerPosition } from '../shared/hooks/useFixedPosition'
import type { VNodeChild } from 'vue'

import { isVNode, useTemplateRef } from 'vue'

import { useToggle } from '@vueuse/core'

import useFixedPosition from '../shared/hooks/useFixedPosition'

defineOptions({ name: 'UiTooltip', inheritAttrs: true })

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
const tooltip = useTemplateRef('tooltip')

const [visible, toggleVisible] = useToggle(false)

const [tooltipStyle] = useFixedPosition(position, trigger, tooltip)

const showTooltip = () => {
  if (disabled) return
  toggleVisible(true)
}

const hideTooltip = () => {
  toggleVisible(false)
}
</script>

<template>
  <div
    v-bind="$attrs"
    ref="trigger"
    class="inline-block"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
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
        class="glass rounded-lg p-2 shadow-lg"
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
