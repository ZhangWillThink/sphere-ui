<script setup lang="tsx">
import type { VNodeChild } from 'vue'

import { computed, defineComponent, h, isVNode, ref } from 'vue'

import { RightOne } from '@icon-park/vue-next'

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

// Local recursive MenuItem component to keep file self-contained
const MenuItem = defineComponent({
  name: 'SphereMenuItem',
  inheritAttrs: true,
  props: {
    item: { type: Object as any, required: true },
    path: { type: Array as () => number[], required: true },
  },
  setup(props) {
    const { item, path } = props
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
            'items-center justify-between text-foreground transition-colors select-none',
            item.disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
          ],
          onClick,
        },
        [
          h(
            'div',
            {
              class: [
                'flex items-center justify-between truncate px-3 rounded-md py-2 hover:bg-blue-100 dark:hover:bg-blue-900/40',
                isSelectedKey(key) ? 'bg-blue-100 dark:bg-blue-900/40' : '',
              ],
            },
            [
              h('div', { class: 'flex items-center space-x-2' }, [
                item.icon ? (isVNode(item.icon) ? item.icon : h('span', {}, item.icon)) : null,
                h('span', { class: 'truncate' }, item.label),
              ]),
              hasChildren
                ? h(RightOne, {
                    class: ['ml-2 transition-transform', isOpen(key) ? 'rotate-90' : ''],
                  })
                : null,
            ],
          ),

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
</script>

<template>
  <nav ref="root" v-bind="$attrs" class="inline-block" tabindex="0">
    <ul :class="[mode === 'horizontal' ? 'flex gap-2' : '', 'glass rounded-md p-1 text-sm']">
      <MenuItem v-for="(it, i) in items" :key="it.key ?? i" :item="it" :path="[i]" />
    </ul>
  </nav>
</template>
