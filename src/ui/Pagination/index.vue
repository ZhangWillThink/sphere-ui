<script setup lang="ts">
import { computed } from 'vue'

import { Left, Right } from '@icon-park/vue-next'
import { isNumber } from 'lodash-es'

import Button from '../Button/index.vue'
import Select from '../Select/index.vue'

defineOptions({ name: 'SpherePagination' })

const {
  total,
  pageSizeOptions = [10, 20, 50, 100],
  showSizeChanger = true,
  showQuickJumper = false,
  // showTotal = true,
  disabled = false,
  maxPages = 7,
} = defineProps<{
  total: number
  pageSizeOptions?: number[]
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  showTotal?: boolean
  disabled?: boolean
  maxPages?: number
}>()

const emit = defineEmits<{
  change: [page: number, pageSize: number]
}>()

const currentPage = defineModel<number>('currentPage', {
    required: false,
    default: 1,
    type: Number,
    validator: val => isNumber(val) && val > 0,
  }),
  pageSize = defineModel<number>('pageSize', {
    required: false,
    default: 10,
    type: Number,
    validator: val => isNumber(val) && val > 0,
  })

const totalPages = computed(() => Math.ceil(total / pageSize.value))

const pageNumbers = computed(() => {
  const pages: (number | string)[] = []
  const current = currentPage.value
  const total = totalPages.value

  if (total <= maxPages) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    const leftOffset = Math.floor((maxPages - 3) / 2)
    const rightOffset = maxPages - 3 - leftOffset

    if (current <= leftOffset + 2) {
      for (let i = 1; i <= maxPages - 2; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - rightOffset - 1) {
      pages.push(1)
      pages.push('...')
      for (let i = total - (maxPages - 3); i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - leftOffset; i <= current + rightOffset; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

const canGoPrev = computed(() => currentPage.value > 1 && !disabled)
const canGoNext = computed(() => currentPage.value < totalPages.value && !disabled)

const handlePageChange = (page: number) => {
  if (page === currentPage.value || disabled) return
  if (page < 1 || page > totalPages.value) return

  currentPage.value = page
  emit('change', page, pageSize.value)
}

const handlePrev = () => {
  if (canGoPrev.value) {
    handlePageChange(currentPage.value - 1)
  }
}

const handleNext = () => {
  if (canGoNext.value) {
    handlePageChange(currentPage.value + 1)
  }
}

const handlePageSizeChange = (newSize: number) => {
  if (disabled) return

  pageSize.value = newSize

  const newTotalPages = Math.ceil(total / newSize)
  const newPage = Math.min(currentPage.value, newTotalPages)

  if (newPage !== currentPage.value) {
    currentPage.value = newPage
  }

  emit('change', newPage, newSize)
}

const pageSizeSelectOptions = computed(() =>
  pageSizeOptions.map(size => ({
    label: `${size} 条/页`,
    value: size,
  })),
)

const quickJumperValue = computed({
  get: () => String(currentPage.value),
  set: (val: string) => {
    const page = parseInt(val, 10)
    if (!isNaN(page)) {
      handlePageChange(Math.max(1, Math.min(page, totalPages.value)))
    }
  },
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 select-none">
    <div v-if="showSizeChanger" class="flex items-center gap-2">
      <Select
        :modelValue="pageSize"
        :options="pageSizeSelectOptions"
        :disabled="disabled"
        class="min-w-40"
        size="sm"
        @update:modelValue="handlePageSizeChange"
      />
    </div>

    <div class="flex items-center gap-1">
      <Button variant="ghost" :disabled="!canGoPrev" @click="handlePrev">
        <template #icon> <Left /> </template>
      </Button>

      <template v-for="page in pageNumbers" :key="page">
        <Button
          v-if="isNumber(page)"
          :variant="page === currentPage ? 'default' : 'ghost'"
          :disabled="disabled"
          class="min-w-8"
          size="sm"
          @click="handlePageChange(page)"
        >
          {{ page }}
        </Button>
        <span v-else class="pointer-events-none px-2 text-gray-400 dark:text-gray-600">
          {{ page }}
        </span>
      </template>

      <Button :disabled="!canGoNext" variant="ghost" @click="handleNext">
        <template #icon> <Right /> </template>
      </Button>
    </div>

    <div v-if="showQuickJumper" class="flex items-center gap-2 text-sm">
      <span class="text-secondary-foreground">跳至</span>
      <input
        v-model="quickJumperValue"
        type="number"
        :min="1"
        :max="totalPages"
        :disabled
        class="text-card-foreground focus:ring-primary-500 dark:focus:ring-primary-400 w-16 rounded-md border border-gray-300 bg-white px-2 py-1 text-center text-sm transition-all duration-150 ease-in-out focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        @keydown.enter="($event.target as HTMLInputElement).blur()"
      />
      <span class="text-secondary-foreground">页</span>
    </div>
  </div>
</template>
