<script setup lang="ts">
import type { DescriptionProps, DescriptionItem } from './types'
import type { VNodeChild } from 'vue'

import { isVNode } from 'vue'

defineOptions({ name: 'SphereDescription', inheritAttrs: true })

const {
  title,
  items,
  column = 3,
  bordered = false,
  colon = true,
  labelStyle = 'default',
} = defineProps<DescriptionProps>()

const slots = defineSlots<{
  title?: () => VNodeChild
  [key: `label-${string}`]: () => VNodeChild
  [key: `item-${string}`]: () => VNodeChild
}>()

const getColumnClass = () => {
  const columnMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 xl:grid-cols-4',
  }
  return columnMap[column]
}

const getSpanClass = (span?: number) => {
  if (!span || span === 1) return ''
  const spanMap: Record<number, string> = {
    2: 'md:col-span-2',
    3: 'md:col-span-2 xl:col-span-3',
    4: 'md:col-span-2 xl:col-span-4',
  }
  return spanMap[Math.min(span, column)] || ''
}

// 将 items 按行分组（带边框模式使用）
const getGroupedRows = () => {
  const rows: DescriptionItem[][] = []
  let currentRow: DescriptionItem[] = []
  let currentRowSpan = 0

  items.forEach(item => {
    const span = Math.min(item.span || 1, column)

    // 如果当前行放不下这个项目，开始新行
    if (currentRowSpan + span > column) {
      if (currentRow.length > 0) {
        rows.push(currentRow)
      }
      currentRow = [item]
      currentRowSpan = span
    } else {
      currentRow.push(item)
      currentRowSpan += span
    }
  })

  // 添加最后一行
  if (currentRow.length > 0) {
    rows.push(currentRow)
  }

  return rows
}

// 获取项目在带边框模式下的列数（标签1列+内容span-1列）
const getBorderedColSpan = (span?: number) => Math.min(span || 1, column)
</script>

<template>
  <div class="w-full">
    <!-- 标题区域 -->
    <div
      v-if="title || slots.title"
      class="mb-5 border-b border-gray-200 pb-3 dark:border-gray-700"
    >
      <slot name="title">
        <h3 class="text-card-foreground text-base font-semibold">
          <component v-if="isVNode(title)" :is="title" />
          <template v-else>{{ title }}</template>
        </h3>
      </slot>
    </div>

    <!-- 描述列表 - 无边框 -->
    <div v-if="!bordered" :class="['grid gap-x-8 gap-y-5', getColumnClass()]">
      <div
        v-for="item in items"
        :key="item.key"
        :class="[
          labelStyle === 'inline' ? 'flex items-baseline gap-3' : 'flex flex-col gap-2',
          getSpanClass(item.span),
        ]"
      >
        <dt
          :class="[
            'text-card-foreground/60 text-sm font-medium',
            labelStyle === 'inline' ? 'shrink-0' : '',
          ]"
        >
          <slot :name="`label-${item.key}`">
            <component v-if="isVNode(item.label)" :is="item.label" />
            <template v-else>{{ item.label }}</template>
            <template v-if="colon">:</template>
          </slot>
        </dt>
        <dd class="text-card-foreground text-sm leading-relaxed">
          <slot :name="`item-${item.key}`">
            <component v-if="isVNode(item.children)" :is="item.children" />
            <template v-else>{{ item.children }}</template>
          </slot>
        </dd>
      </div>
    </div>

    <!-- 描述列表 - 带边框 -->
    <div v-else class="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <table class="w-full table-fixed border-collapse">
        <colgroup>
          <col v-for="i in column" :key="i" class="w-[12.5%]" />
          <col v-for="i in column" :key="`content-${i}`" />
        </colgroup>
        <tbody>
          <tr
            v-for="(row, rowIndex) in getGroupedRows()"
            :key="rowIndex"
            class="border-gray-200 dark:border-gray-700"
            :class="{ 'border-t': rowIndex > 0 }"
          >
            <template v-for="item in row" :key="item.key">
              <th
                class="text-card-foreground/60 bg-gray-50/80 px-4 py-3 text-left text-sm font-medium dark:bg-gray-800/30"
              >
                <slot :name="`label-${item.key}`">
                  <component v-if="isVNode(item.label)" :is="item.label" />
                  <template v-else>{{ item.label }}</template>
                  <template v-if="colon">:</template>
                </slot>
              </th>
              <td
                :colspan="getBorderedColSpan(item.span)"
                class="text-card-foreground border-l border-gray-200 bg-white px-4 py-3 text-sm leading-relaxed dark:border-gray-700 dark:bg-gray-900/50"
              >
                <slot :name="`item-${item.key}`">
                  <component v-if="isVNode(item.children)" :is="item.children" />
                  <template v-else>{{ item.children }}</template>
                </slot>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
