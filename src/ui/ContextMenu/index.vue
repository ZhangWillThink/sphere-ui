<script lang="ts">
interface ContextMenuItem {
  children: VNodeChild
  value?: any
  disabled?: boolean
  suffix?: VNodeChild
  variant: 'default' | 'destructive'
  onClick?: () => void
}
</script>

<script setup lang="ts">
import type { CSSProperties, VNodeChild } from 'vue'

import { computed, isVNode, shallowReactive, shallowRef, useTemplateRef } from 'vue'

import {
  onClickOutside,
  onKeyStroke,
  useElementSize,
  useMouse,
  useToggle,
  useWindowSize,
} from '@vueuse/core'

defineOptions({ name: 'SphereContextMenu', inheritAttrs: true })

const { items = [] } = defineProps<{
  items?: Array<ContextMenuItem>
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

function selectItem(item: ContextMenuItem | undefined) {
  if (!item || item.disabled) return
  emit('select', item.value)
  closeMenu()
}

onClickOutside(menu, () => toggleOpen(false))

onKeyStroke(['ArrowDown', 'ArrowUp', 'Enter', 'Escape'], e => {
  if (!open.value) return
  e.preventDefault()

  switch (e.key) {
    case 'ArrowDown':
      highlighted.value = Math.min(items.length - 1, highlighted.value + 1)
      break
    case 'ArrowUp':
      highlighted.value = Math.max(0, highlighted.value - 1)
      break
    case 'Enter':
      if (highlighted.value >= 0) selectItem(items[highlighted.value])
      break
    case 'Escape':
      closeMenu()
      break
  }
})
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    class="relative inline-block"
    @contextmenu.prevent="onContextMenu"
  >
    <slot name="default" />
  </div>

  <Teleport to="body">
    <Transition
      appear
      enterActiveClass="animate__animated animate__fadeIn animate__faster"
      leaveActiveClass="animate__animated animate__fadeOut animate__faster"
    >
      <div
        v-if="open"
        ref="menu"
        dir="ltr"
        :style="menuStyle"
        class="bg-popover text-popover-foreground border-border z-50 w-52 min-w-32 overflow-x-hidden overflow-y-auto rounded-md border p-1 shadow-md outline-none"
        data-side="right"
        data-align="start"
        role="menu"
        aria-orientation="vertical"
        data-slot="context-menu-content"
        tabindex="-1"
        data-orientation="vertical"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          role="menuitem"
          data-slot="context-menu-item"
          data-inset="true"
          :data-variant="item?.variant"
          class="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:text-destructive! [&amp;_svg:not([class*='text-'])]:text-muted-foreground [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 data-inset:pl-8"
          tabindex="-1"
          data-orientation="vertical"
          @click.stop="item.onClick?.()"
        >
          <component v-if="isVNode(item.children)" :is="item.children" />
          <template v-else-if="item.children"> {{ item.children }} </template>

          <span
            v-if="item?.suffix"
            data-slot="context-menu-shortcut"
            class="text-muted-foreground ml-auto text-xs tracking-widest"
          >
            <component v-if="isVNode(item.suffix)" :is="item.suffix" />
            <template v-else-if="item.suffix"> {{ item.suffix }} </template>
          </span>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
