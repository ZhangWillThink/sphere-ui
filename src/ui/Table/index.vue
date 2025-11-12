<script lang="ts">
const sizeClasses = cva('', {
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: { size: 'md' },
})
const cellPaddingClasses = cva('', {
  variants: {
    size: {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    },
  },
  defaultVariants: { size: 'md' },
})
</script>

<script setup lang="ts" generic="T extends Record<string, any> = Record<string, any>">
import type { SortState, TableColumn } from './types'
import type { VariantProps } from 'class-variance-authority'
import type { CSSProperties, VNodeChild } from 'vue'

import { computed, isVNode, ref } from 'vue'

import { DataNull, Down, Up } from '@icon-park/vue-next'
import { cva } from 'class-variance-authority'
import { isFunction, isNumber, isString } from 'lodash-es'

import Checkbox from '../Checkbox/index.vue'
import Loading from '../Loading/index.vue'

defineOptions({ name: 'SphereTable' })

type SizeProp = VariantProps<typeof sizeClasses>

const {
  columns = [],
  bordered = false,
  striped = false,
  size = 'md',
  loading = false,
  emptyText = '暂无数据',
  rowKey = 'id',
  rowSelection,
  sticky = false,
} = defineProps<{
  columns?: TableColumn<T>[]
  bordered?: boolean
  striped?: boolean
  size?: SizeProp['size']
  loading?: boolean
  emptyText?: string
  rowKey?: string | ((record: T) => string | number)
  rowSelection?: {
    selectedRowKeys?: (string | number)[]
    onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void
    getCheckboxProps?: (record: T) => { disabled?: boolean }
  }
  sticky?: boolean
}>()

const emit = defineEmits<{
  rowClick: [record: T, index: number]
  change: [pagination: any, filters: any, sorter: SortState]
}>()

const dataSource = defineModel<T[]>({ required: false, default: [] })

const slot = defineSlots<{
  [key: `column-${string}`]: (params: { text: any; record: T; index: number }) => VNodeChild
  expandedRowRender?: (params: { record: T; index: number }) => VNodeChild
  empty?: () => VNodeChild
}>()

// 排序状态
const sortState = ref<SortState>({ key: '', order: null })

// 选中行的 keys
const selectedRowKeys = ref<(string | number)[]>(rowSelection?.selectedRowKeys || [])

// 获取行的 key
const getRowKey = (record: T, index: number): string | number => {
  if (isFunction(rowKey)) {
    return rowKey(record)
  }
  return record[rowKey] ?? index
}

// 获取嵌套属性值
const getNestedValue = (obj: any, path: string | string[]): any => {
  if (isString(path)) {
    return obj[path]
  }
  return path.reduce((acc, key) => acc?.[key], obj)
}

// 处理排序
const handleSort = (column: TableColumn<T>) => {
  if (!column.sortable) return

  const key = (column.dataIndex as string) || column.key

  if (sortState.value.key === key) {
    if (sortState.value.order === 'ascend') {
      sortState.value.order = 'descend'
    } else if (sortState.value.order === 'descend') {
      sortState.value.order = null
      sortState.value.key = ''
    } else {
      sortState.value.order = 'ascend'
    }
  } else {
    sortState.value.key = key
    sortState.value.order = 'ascend'
  }

  emit('change', {}, {}, sortState.value)
}

// 排序后的数据
const sortedData = computed(() => {
  if (!sortState.value.order || !sortState.value.key) {
    return dataSource.value
  }

  const data = [...dataSource.value]
  const column = columns.find(col => ((col.dataIndex as string) || col.key) === sortState.value.key)

  if (!column) return data

  return data.sort((a, b) => {
    const aVal = getNestedValue(a, column.dataIndex || column.key)
    const bVal = getNestedValue(b, column.dataIndex || column.key)

    if (aVal === bVal) return 0

    const result = aVal > bVal ? 1 : -1
    return sortState.value.order === 'ascend' ? result : -result
  })
})

// 全选状态
const isAllSelected = computed(() => {
  if (!dataSource.value.length) return false
  const selectableRows = dataSource.value.filter(record => {
    const props = rowSelection?.getCheckboxProps?.(record)
    return !props?.disabled
  })
  return (
    selectableRows.length > 0 &&
    selectableRows.every(record => selectedRowKeys.value.includes(getRowKey(record, 0)))
  )
})

// 全选/取消全选
const handleSelectAll = (checked: boolean | undefined) => {
  if (checked) {
    const selectableKeys = dataSource.value
      .filter(record => {
        const props = rowSelection?.getCheckboxProps?.(record)
        return !props?.disabled
      })
      .map((record, index) => getRowKey(record, index))
    selectedRowKeys.value = selectableKeys
  } else {
    selectedRowKeys.value = []
  }

  const selectedRows = dataSource.value.filter((record, index) =>
    selectedRowKeys.value.includes(getRowKey(record, index)),
  )
  rowSelection?.onChange?.(selectedRowKeys.value, selectedRows)
}

// 单行选择
const handleSelectRow = (record: T, index: number, checked: boolean | undefined) => {
  const key = getRowKey(record, index)
  if (checked) {
    selectedRowKeys.value = [...selectedRowKeys.value, key]
  } else {
    selectedRowKeys.value = selectedRowKeys.value.filter(k => k !== key)
  }

  const selectedRows = dataSource.value.filter((record, index) =>
    selectedRowKeys.value.includes(getRowKey(record, index)),
  )
  rowSelection?.onChange?.(selectedRowKeys.value, selectedRows)
}

// 是否选中
const isRowSelected = (record: T, index: number) => {
  return selectedRowKeys.value.includes(getRowKey(record, index))
}

// 行点击
const handleRowClick = (record: T, index: number) => {
  emit('rowClick', record, index)
}

// 渲染单元格内容
const renderCell = (column: TableColumn<T>, record: T, index: number) => {
  const slotName = `column-${column.key}` as const
  const text = getNestedValue(record, column.dataIndex || column.key)

  if (slot[slotName]) {
    return slot[slotName]!({ text, record, index })
  }

  if (column.render) {
    return column.render({ text, record, index })
  }

  return text
}

// 列宽度样式
const getColumnStyle = (column: TableColumn<T>) => {
  const style: CSSProperties = {}
  if (column.width) {
    style.width = isNumber(column.width) ? `${column.width}px` : column.width
  }
  if (column.minWidth) {
    style.minWidth = isNumber(column.minWidth) ? `${column.minWidth}px` : column.minWidth
  }
  return style
}

// 对齐样式
const getAlignClass = (align?: 'left' | 'center' | 'right') => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }
  return alignClasses[align || 'left']
}
</script>

<template>
  <div class="relative w-full">
    <!-- Loading 遮罩 -->
    <div v-if="loading" class="absolute inset-0 z-10 flex items-center justify-center">
      <Loading size="md" />
    </div>

    <div
      :class="[
        'bg-background/70 w-full overflow-auto rounded-xl shadow-xl backdrop-blur-lg',
        { 'border-border border': bordered },
      ]"
    >
      <table
        :class="[
          'w-full border-collapse transition-opacity duration-300',
          sizeClasses({ size: size }),
          { 'opacity-50': loading },
        ]"
      >
        <thead
          :class="[
            'from-secondary/70 to-background/70 bg-linear-to-br backdrop-blur-lg',
            {
              'sticky top-0 z-1 shadow-lg': sticky,
              'border-border border-b': bordered,
            },
          ]"
        >
          <tr>
            <th
              v-if="rowSelection"
              :class="[
                cellPaddingClasses({ size }),
                'w-12 font-medium text-gray-700 dark:text-gray-300',
                { bordered: 'border-r border-white/20 dark:border-gray-700/30' },
              ]"
            >
              <div class="flex items-center justify-center">
                <Checkbox
                  :modelValue="isAllSelected"
                  size="sm"
                  @update:modelValue="handleSelectAll"
                />
              </div>
            </th>

            <th
              v-for="column in columns"
              :key="column.key"
              :class="[
                cellPaddingClasses({ size }),
                'font-semibold text-gray-700 dark:text-gray-300',
                getAlignClass(column.align),
                {
                  'border-r border-white/20 last:border-r-0 dark:border-gray-700/30': bordered,
                  'hover:bg-background/60 cursor-pointer backdrop-blur-lg transition-all duration-200 select-none':
                    column.sortable,
                },
              ]"
              :style="getColumnStyle(column)"
              @click="handleSort(column)"
            >
              <div class="flex items-center gap-2" :class="getAlignClass(column.align)">
                <component v-if="isVNode(column.title)" :is="column.title" />
                <span v-else>{{ column.title }}</span>
                <span
                  v-if="column.sortable"
                  class="text-accent-foreground flex flex-col transition-colors duration-200"
                  :class="{
                    'text-primary drop-shadow-sm':
                      sortState.key === (column.dataIndex || column.key),
                  }"
                >
                  <Up
                    :class="{
                      'text-primary':
                        sortState.key === (column.dataIndex || column.key) &&
                        sortState.order === 'ascend',
                    }"
                    :size="10"
                    :strokeWidth="4"
                  />
                  <Down
                    :class="{
                      'text-primary':
                        sortState.key === (column.dataIndex || column.key) &&
                        sortState.order === 'descend',
                    }"
                    :size="10"
                    :strokeWidth="4"
                  />
                </span>
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          <template v-if="sortedData.length > 0">
            <tr
              v-for="(record, index) in sortedData"
              :key="getRowKey(record, index)"
              :class="[
                'cursor-pointer transition-all',
                'hover:from-secondary/70 hover:to-default hover:bg-linear-to-r hover:shadow-md hover:backdrop-blur-lg',
                isRowSelected(record, index)
                  ? 'from-primary-50/70 to-primary-50/20 shadow-primary-200/30 dark:from-primary-900/30 dark:to-primary-900/10 dark:shadow-primary-900/20 bg-linear-to-r shadow-md backdrop-blur-sm'
                  : 'bg-transparent',
                {
                  'from-secondary/30 to-secondary/30 bg-linear-to-r': striped && index % 2 === 1,
                  'border-b border-white/20 last:border-b-0 dark:border-gray-700/30': bordered,
                },
              ]"
              @click="handleRowClick(record, index)"
            >
              <td
                v-if="rowSelection"
                :class="[
                  cellPaddingClasses({ size }),
                  'text-secondary',
                  { bordered: 'border-border border-r' },
                ]"
              >
                <div class="flex items-center justify-center">
                  <Checkbox
                    :modelValue="isRowSelected(record, index)"
                    :disabled="rowSelection.getCheckboxProps?.(record)?.disabled"
                    size="sm"
                    @update:modelValue="checked => handleSelectRow(record, index, checked)"
                  />
                </div>
              </td>

              <td
                v-for="column in columns"
                :key="column.key"
                :class="[
                  cellPaddingClasses({ size }),
                  'text-gray-900 dark:text-gray-100',
                  getAlignClass(column.align),
                  {
                    'border-r border-white/20 last:border-r-0 dark:border-gray-700/30': bordered,
                    truncate: column.ellipsis,
                  },
                ]"
                :style="getColumnStyle(column)"
              >
                <component :is="() => renderCell(column, record, index)" />
              </td>
            </tr>
          </template>

          <tr v-else>
            <td
              :colspan="columns.length + (rowSelection ? 1 : 0)"
              class="py-16 text-center text-gray-400 backdrop-blur-sm dark:text-gray-600"
            >
              <slot name="empty">
                <div class="animate-in fade-in flex flex-col items-center gap-2 duration-500">
                  <DataNull size="48" />

                  <span class="text-sm font-medium">{{ emptyText }}</span>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
