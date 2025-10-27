<script setup lang="ts">
import type { RendererElement, VNodeChild } from 'vue'

defineOptions({ name: 'SphereTransitionCollapse', inheritAttrs: true })

defineSlots<{ default?: () => VNodeChild }>()

const reset = (el: RendererElement) => {
  el.style.maxHeight = ''
  el.style.overflow = el.dataset?.oldOverflow || ''
  el.style.paddingTop = el.dataset?.oldPaddingTop || ''
  el.style.paddingBottom = el.dataset?.oldPaddingBottom || ''
}

const onBeforeEnter = (el: RendererElement) => {
  if (!el.dataset) el.dataset = {}

  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  if (el.style.height) el.dataset.elExistsHeight = el.style.height

  el.style.maxHeight = '0'
  el.style.paddingTop = '0'
  el.style.paddingBottom = '0'
}

const onEnter = (el: RendererElement) => {
  requestAnimationFrame(() => {
    el.dataset.oldOverflow = el.style.overflow
    if (el.dataset.elExistsHeight) {
      el.style.maxHeight = el.dataset.elExistsHeight
    } else if (el.scrollHeight !== 0) {
      el.style.maxHeight = `${el.scrollHeight}px`
    } else {
      el.style.maxHeight = '0'
    }

    el.style.paddingTop = el.dataset.oldPaddingTop
    el.style.paddingBottom = el.dataset.oldPaddingBottom
    el.style.overflow = 'hidden'
  })
}

const onAfterEnter = (el: RendererElement) => {
  el.style.maxHeight = ''
  el.style.overflow = el.dataset.oldOverflow
}

const onEnterCancelled = (el: RendererElement) => reset(el)

const onBeforeLeave = (el: RendererElement) => {
  if (!el.dataset) el.dataset = {}
  el.dataset.oldPaddingTop = el.style.paddingTop
  el.dataset.oldPaddingBottom = el.style.paddingBottom
  el.dataset.oldOverflow = el.style.overflow

  el.style.maxHeight = `${el.scrollHeight}px`
  el.style.overflow = 'hidden'
}

const onLeave = (el: RendererElement) => {
  if (el.scrollHeight !== 0) {
    el.style.maxHeight = '0'
    el.style.paddingTop = '0'
    el.style.paddingBottom = '0'
  }
}

const handleAfterLeave = (el: RendererElement) => {
  reset(el)
}

const onLeaveCancelled = (el: RendererElement) => reset(el)
</script>

<template>
  <Transition
    v-bind="$attrs"
    @beforeEnter="onBeforeEnter"
    @enter="onEnter"
    @afterEnter="onAfterEnter"
    @enterCancelled="onEnterCancelled"
    @beforeLeave="onBeforeLeave"
    @leave="onLeave"
    @afterLeave="handleAfterLeave"
    @leaveCancelled="onLeaveCancelled"
    class="transition-all"
  >
    <slot name="default" />
  </Transition>
</template>
