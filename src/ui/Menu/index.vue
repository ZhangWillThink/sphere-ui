<script setup lang="tsx">
import type { VNodeChild } from 'vue'

import { computed, defineComponent, h, isVNode, ref, shallowRef, useTemplateRef } from 'vue'

import { onKeyStroke } from '@vueuse/core'

import { CollapseTransition } from '../Transition'

defineOptions({ name: 'SphereMenu', inheritAttrs: true })

const {
  items = [],
  selectable = true,
  multiple = false,
  mode = 'vertical',
  defaultOpenKeys,
} = defineProps<{
  items?: Array<{
    label: VNodeChild
    key?: string | number
    value?: any
    disabled?: boolean
    icon?: VNodeChild
    children?: any[]
  }>
  mode?: 'vertical' | 'horizontal' | 'inline'
  selectable?: boolean
  multiple?: boolean
  defaultOpenKeys?: (string | number)[]
}>()

const emit = defineEmits<{
  select: [any]
  openChange: [Array<string | number>]
}>()

// Model for selected keys (single or multiple)
const modelValue = defineModel<any>({ required: false })

const root = useTemplateRef('root')

// Track open submenu keys (local state with defaults)
const openKeys = ref<Array<string | number>>(defaultOpenKeys ?? [])

function isOpen(key: string | number) {
  return openKeys.value.includes(key)
}

function toggleOpen(key: string | number) {
  const i = openKeys.value.indexOf(key)
  if (i >= 0) {
    openKeys.value.splice(i, 1)
  } else {
    openKeys.value.push(key)
  }
  emit('openChange', [...openKeys.value])
}

// Selection helpers
function isSelectedKey(k: string | number) {
  if (!selectable) return false
  if (multiple) {
    return Array.isArray(modelValue.value) && modelValue.value.includes(k)
  }
  return modelValue.value === k
}

function selectKey(item: { key?: string | number; value?: any; disabled?: boolean }) {
  if (!selectable || item.disabled) return
  const k = item.key ?? item.value
  if (k === undefined) return
  if (multiple) {
    const arr = Array.isArray(modelValue.value) ? [...modelValue.value] : []
    const idx = arr.findIndex(v => v === k)
    if (idx >= 0) arr.splice(idx, 1)
    else arr.push(k)
    modelValue.value = arr
    emit('select', item.value ?? k)
  } else {
    const newVal = modelValue.value === k ? null : k
    modelValue.value = newVal
    emit('select', item.value ?? k)
  }
}

// Accessibility / keyboard navigation (simple implementation)
const highlighted = shallowRef<{ key: string | number | null; path: number[] }>({
  key: null,
  path: [],
})

function walkVisibleItems(
  list: any[],
  path: number[] = [],
  out: Array<{ item: any; path: number[]; key: string | number }>,
) {
  list.forEach((it, idx) => {
    const p = [...path, idx]
    const k = it.key ?? `${p.join('-')}`
    out.push({ item: it, path: p, key: k })
    if (it.children && isOpen(k)) {
      walkVisibleItems(it.children, p, out)
    }
  })
}

function moveHighlight(dir: 1 | -1) {
  const flat: Array<{ item: any; path: number[]; key: string | number }> = []
  walkVisibleItems(items, [], flat)
  if (!flat.length) return
  let idx = flat.findIndex(f => String(f.key) === String(highlighted.value?.key))
  if (idx === -1) idx = 0
  else idx = (idx + dir + flat.length) % flat.length
  const chosen = flat[idx]
  if (!chosen) return
  const { key: chosenKey, path: chosenPath } = chosen
  highlighted.value = { key: chosenKey, path: chosenPath }
}

function onKeydown(e: KeyboardEvent) {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      moveHighlight(1)
      break
    case 'ArrowUp':
      e.preventDefault()
      moveHighlight(-1)
      break
    case 'Enter':
      e.preventDefault()
      if (highlighted.value?.key != null) {
        // find item
        const flat: Array<{ item: any; path: number[]; key: string | number }> = []
        walkVisibleItems(items, [], flat)
        const found = flat.find(f => String(f.key) === String(highlighted.value?.key))
        if (found) {
          const { item: foundItem, key: foundKey } = found
          if (foundItem.children) toggleOpen(foundKey)
          else selectKey(foundItem)
        }
      }
      break
    case 'ArrowRight':
      e.preventDefault()
      // open submenu if any
      if (highlighted.value?.key != null) {
        const flat: Array<{ item: any; path: number[]; key: string | number }> = []
        walkVisibleItems(items, [], flat)
        const found = flat.find(f => String(f.key) === String(highlighted.value?.key))
        if (found) {
          const { item: foundItem, key: foundKey } = found
          if (foundItem.children) toggleOpen(foundKey)
        }
      }
      break
    case 'ArrowLeft':
      e.preventDefault()
      // close submenu containing highlighted
      if (highlighted.value?.key != null) {
        const flat: Array<{ item: any; path: number[]; key: string | number }> = []
        walkVisibleItems(items, [], flat)
        const found = flat.find(f => String(f.key) === String(highlighted.value?.key))
        if (found) {
          // Try to close parent: compute parent key from path
          if (found.path.length > 1) {
            const parentPath = found.path.slice(0, -1)
            // find parent safely
            let parent: any = { children: items }
            for (const idx of parentPath) {
              parent = parent?.children ? parent.children[idx] : undefined
              if (!parent) break
            }
            if (parent) {
              const { key: parentKey } = parent
              const pk = parentKey ?? `${parentPath.join('-')}`
              if (isOpen(pk)) toggleOpen(pk)
            }
          }
        }
      }
      break
  }
}

// Utility render helpers
function renderLabel(label: VNodeChild) {
  if (isVNode(label)) return label
  return label
}

// Local recursive MenuItem component to keep file self-contained
const MenuItem = defineComponent({
  name: 'SphereMenuItem',
  props: {
    item: { type: Object as any, required: true },
    path: { type: Array as () => number[], required: true },
  },
  setup(p) {
    const { item, path } = p
    const key = item.key ?? path.join('-')
    const hasChildren = !!(item.children && item.children.length)

    function onClick(e: Event) {
      e.stopPropagation()
      if (item.disabled) return
      if (hasChildren) {
        toggleOpen(key)
      } else {
        selectKey(item)
      }
    }

    const openLocal = computed(() => isOpen(key))

    return () =>
      h(
        'li',
        {
          class: [
            'flex items-center justify-between rounded-md px-3 py-2 transition-all select-none',
            item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
            isSelectedKey(key) ? 'bg-blue-500/80 text-white' : '',
            highlighted.value?.key === key ? 'bg-blue-100' : '',
          ],
          onClick,
        },
        [
          h('div', { class: 'flex items-center gap-2 truncate' }, [
            item.icon ? (isVNode(item.icon) ? item.icon : h('span', {}, item.icon)) : null,
            (() => {
              const lbl = renderLabel(item.label)
              // h() accepts VNodeChild; wrap primitives in array to satisfy TS
              return h(
                'span',
                { class: 'truncate' },
                Array.isArray(lbl) || isVNode(lbl) ? lbl : String(lbl),
              )
            })(),
          ]),
          hasChildren
            ? h('div', { class: 'ml-2' }, [
                h(
                  'button',
                  { type: 'button', class: 'text-xs text-foreground/60' },
                  isOpen(key) ? '▾' : '▸',
                ),
              ])
            : null,
          // children
          hasChildren
            ? h(CollapseTransition, null, {
                default: () =>
                  openLocal.value
                    ? h(
                        'ul',
                        { class: 'mt-1 ml-3 rounded-md p-1' },
                        item.children.map((c: any, idx: number) =>
                          h(MenuItem, {
                            key: c.key ?? `${key}-${idx}`,
                            item: c,
                            path: [...path, idx],
                          }),
                        ),
                      )
                    : null,
              })
            : null,
        ],
      )
  },
})

onKeyStroke(['ArrowDown', 'ArrowUp', 'Enter', 'ArrowRight', 'ArrowLeft'], onKeydown, {
  target: root,
})
</script>

<template>
  <nav
    ref="root"
    v-bind="$attrs"
    class="inline-block"
    tabindex="0"
    @keydown.prevent.stop="onKeydown"
  >
    <ul :class="[mode === 'horizontal' ? 'flex gap-2' : '', 'glass rounded-md p-1 text-sm']">
      <MenuItem v-for="(it, i) in items" :key="it.key ?? i" :item="it" :path="[i]" />
    </ul>
  </nav>
</template>
