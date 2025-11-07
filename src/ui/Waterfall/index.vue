<script setup lang="ts" generic="T extends Record<string, any>">
import { computed, shallowRef, useTemplateRef } from 'vue'

import { useElementSize, watchDebounced, watchDeep } from '@vueuse/core'

defineOptions({ name: 'WaterfallLayout' })

defineEmits<{
  itemClick: [item: T, index: number]
}>()

const {
  items,
  columnCount = 3,
  gap = 16,
  minColumnWidth = 250,
} = defineProps<{
  items: T[]
  columnCount?: number
  gap?: number
  minColumnWidth?: number
}>()

const containerRef = useTemplateRef('containerRef')
const columns = shallowRef<T[][]>([])
const actualColumnCount = shallowRef(columnCount)

const { width: containerWidth } = useElementSize(containerRef)

// 计算间距类名
const gapClass = computed(() => {
  // 将 px 值映射到 Tailwind 的间距类
  const gapMap: Record<number, string> = {
    0: 'gap-0',
    4: 'gap-1',
    8: 'gap-2',
    12: 'gap-3',
    16: 'gap-4',
    20: 'gap-5',
    24: 'gap-6',
    32: 'gap-8',
  }
  return gapMap[gap] || 'gap-4'
})

// 计算实际列数（根据容器宽度自适应）
function calculateColumnCount(width: number) {
  if (!width) return columnCount

  const maxColumns = Math.floor(width / minColumnWidth) || 1
  return Math.min(maxColumns, columnCount)
}

// 分配项目到各列（使用贪心算法，将项目放入当前高度最小的列）
function distributeItems() {
  if (!items || items.length === 0) {
    columns.value = []
    return
  }

  const colCount = actualColumnCount.value
  const newColumns: T[][] = Array.from({ length: colCount }, () => [])
  const columnHeights = Array.from({ length: colCount }, () => 0)

  items.forEach(item => {
    const minHeightIndex = columnHeights.indexOf(Math.min(...columnHeights))
    const targetColumn = newColumns[minHeightIndex]
    const targetHeight = columnHeights[minHeightIndex]
    if (targetColumn && targetHeight !== undefined) {
      targetColumn.push(item)
      columnHeights[minHeightIndex] = targetHeight + 1
    }
  })

  columns.value = newColumns
}

watchDeep(
  () => items,
  () => {
    distributeItems()
  },
  { immediate: true },
)

watchDebounced(
  () => [containerWidth.value, columnCount] as const,
  ([newWidth]) => {
    const newCount = calculateColumnCount(newWidth)
    if (newCount !== actualColumnCount.value) {
      actualColumnCount.value = newCount
      distributeItems()
    }
  },
  { debounce: 150, immediate: true },
)
</script>

<template>
  <div ref="containerRef" class="flex w-full items-start" :class="gapClass">
    <div
      v-for="(column, columnIndex) in columns"
      :key="columnIndex"
      class="flex min-w-0 flex-1 flex-col"
      :class="gapClass"
    >
      <div
        v-for="(item, itemIndex) in column"
        :key="item.id || `${columnIndex}-${itemIndex}`"
        class="break-inside-avoid"
      >
        <slot :item="item" :index="columnIndex * columns.length + itemIndex" />
      </div>
    </div>
  </div>
</template>
