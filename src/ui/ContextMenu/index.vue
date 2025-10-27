<script setup lang="ts">
import type { CSSProperties, VNodeChild } from 'vue'

import {
  computed,
  isVNode,
  nextTick,
  onBeforeUnmount,
  onMounted,
  shallowReactive,
  shallowRef,
  useTemplateRef,
} from 'vue'

import {
  onClickOutside,
  useElementSize,
  useEventListener,
  useMouse,
  useToggle,
  useWindowSize,
} from '@vueuse/core'

defineOptions({ name: 'SphereContextMenu', inheritAttrs: true })

const { items = [] } = defineProps<{
  items?: Array<{ label: VNodeChild; value?: any; disabled?: boolean }>
}>()

defineSlots<{
  default?: () => VNodeChild
}>()

const emit = defineEmits<{
  select: [any]
  open: []
  close: []
}>()

const menu = useTemplateRef('menu')

const menuSize = useElementSize(menu)

const { x: mouseX, y: mouseY } = useMouse()
const { width: windowWidth, height: windowHeight } = useWindowSize()
const anchor = shallowReactive<{
  x: number | null
  y: number | null
}>({
  x: null,
  y: null,
})

const [open, toggleOpen] = useToggle(false)
const highlighted = shallowRef(-1)

const menuStyle = computed<CSSProperties>(() => {
  const left = anchor.x ?? 0
  const top = anchor.y ?? 0
  const menuH = menuSize.height?.value ?? 0
  const vpH = windowHeight.value
  const vpW = windowWidth.value
  const menuW = menuSize.width?.value ?? 200

  let finalLeft = left
  let finalTop = top

  // Check if menu would go outside viewport boundaries
  if (left + menuW > vpW) {
    finalLeft = vpW - menuW
  }

  if (top + menuH > vpH) {
    finalTop = vpH - menuH
  }

  // Make sure menu doesn't go negative
  finalLeft = Math.max(0, finalLeft)
  finalTop = Math.max(0, finalTop)

  return {
    position: 'fixed',
    left: `${finalLeft}px`,
    top: `${Math.round(finalTop)}px`,
    minWidth: '160px',
  }
})

function openMenu() {
  toggleOpen(true)
  emit('open')
  nextTick(() => {
    highlighted.value = items.findIndex(i => !i.disabled)
  })
}

function closeMenu() {
  toggleOpen(false)
  highlighted.value = -1
  anchor.x = null
  anchor.y = null
  emit('close')
}

function onContextMenu() {
  anchor.x = mouseX.value
  anchor.y = mouseY.value
  openMenu()
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) return
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      highlighted.value = Math.min(items.length - 1, highlighted.value + 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      highlighted.value = Math.max(0, highlighted.value - 1)
      break
    case 'Enter':
      e.preventDefault()
      if (highlighted.value >= 0) selectItem(items[highlighted.value])
      break
    case 'Escape':
      e.preventDefault()
      closeMenu()
      break
  }
}

function selectItem(item: { label: VNodeChild; value?: any; disabled?: boolean } | undefined) {
  if (!item || item.disabled) return
  emit('select', item.value)
  closeMenu()
}

onClickOutside(menu, () => toggleOpen(false))

onMounted(() => {
  const keydownListenerCleanup = useEventListener(document, 'keydown', onKeydown)

  onBeforeUnmount(() => {
    keydownListenerCleanup()
  })
})
</script>

<template>
  <div ref="root" class="relative inline-block" @contextmenu.prevent="onContextMenu">
    <slot name="default">
      <button type="button" class="glass rounded-md px-3 py-1">···</button>
    </slot>
  </div>

  <Teleport to="body">
    <ul
      v-if="open"
      ref="menu"
      :style="menuStyle"
      class="glass z-50 overflow-auto rounded-lg p-1.5 text-sm shadow"
      role="menu"
    >
      <li
        v-for="(it, i) in items"
        :key="i"
        :class="[
          'cursor-pointer rounded-md px-3 py-2 transition-all select-none',
          i === highlighted ? 'bg-blue-400/70' : '',
          it.disabled ? 'cursor-not-allowed opacity-50' : '',
        ]"
        role="menuitem"
        @blur="highlighted = -1"
        @click="() => selectItem(it)"
      >
        <component v-if="isVNode(it.label)" :is="it.label" />
        <template v-else>{{ it.label }}</template>
      </li>
    </ul>
  </Teleport>
</template>
