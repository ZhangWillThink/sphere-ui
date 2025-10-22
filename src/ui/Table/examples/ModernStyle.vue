<script setup lang="ts">
import type { TableColumn } from '../types'

import { ref } from 'vue'

import { Delete, Edit, Mail, Phone, Star } from '@icon-park/vue-next'

import Button from '../../Button/index.vue'
import Tag from '../../Tag/index.vue'
import Table from '../index.vue'

defineOptions({ name: 'ModernStyleDemo' })

interface Employee {
  id: number
  name: string
  role: string
  department: string
  email: string
  phone: string
  rating: number
  status: 'online' | 'offline' | 'away'
  projects: number
}

const columns: TableColumn<Employee>[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    width: 150,
    sortable: true,
  },
  {
    key: 'role',
    title: '职位',
    dataIndex: 'role',
    width: 150,
  },
  {
    key: 'department',
    title: '部门',
    dataIndex: 'department',
    width: 120,
    sortable: true,
  },
  {
    key: 'contact',
    title: '联系方式',
    width: 200,
  },
  {
    key: 'rating',
    title: '评分',
    dataIndex: 'rating',
    width: 120,
    align: 'center',
    sortable: true,
  },
  {
    key: 'projects',
    title: '项目数',
    dataIndex: 'projects',
    width: 100,
    align: 'center',
    sortable: true,
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    align: 'center',
  },
  {
    key: 'actions',
    title: '操作',
    width: 180,
    align: 'center',
  },
]

const dataSource = ref<Employee[]>([
  {
    id: 1,
    name: '张三',
    role: '高级前端工程师',
    department: '技术部',
    email: 'zhangsan@company.com',
    phone: '138-0000-1111',
    rating: 4.8,
    status: 'online',
    projects: 12,
  },
  {
    id: 2,
    name: '李四',
    role: 'UI/UX 设计师',
    department: '设计部',
    email: 'lisi@company.com',
    phone: '138-0000-2222',
    rating: 4.6,
    status: 'away',
    projects: 8,
  },
  {
    id: 3,
    name: '王五',
    role: '后端工程师',
    department: '技术部',
    email: 'wangwu@company.com',
    phone: '138-0000-3333',
    rating: 4.9,
    status: 'online',
    projects: 15,
  },
  {
    id: 4,
    name: '赵六',
    role: '产品经理',
    department: '产品部',
    email: 'zhaoliu@company.com',
    phone: '138-0000-4444',
    rating: 4.7,
    status: 'offline',
    projects: 6,
  },
  {
    id: 5,
    name: '钱七',
    role: '测试工程师',
    department: '质量部',
    email: 'qianqi@company.com',
    phone: '138-0000-5555',
    rating: 4.5,
    status: 'online',
    projects: 10,
  },
  {
    id: 6,
    name: '孙八',
    role: 'DevOps 工程师',
    department: '技术部',
    email: 'sunba@company.com',
    phone: '138-0000-6666',
    rating: 4.8,
    status: 'away',
    projects: 9,
  },
])

const selectedRowKeys = ref<number[]>([])

const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: (string | number)[], selectedRows: Employee[]) => {
    selectedRowKeys.value = keys as number[]
    console.log('已选中:', selectedRows)
  },
}

const getStatusInfo = (status: Employee['status']) => {
  const statusMap = {
    online: { variant: 'success' as const, text: '在线', icon: '🟢' },
    offline: { variant: 'error' as const, text: '离线', icon: '🔴' },
    away: { variant: 'warning' as const, text: '离开', icon: '🟡' },
  }
  return statusMap[status]
}

const handleEdit = (record: Employee) => {
  console.log('编辑:', record)
}

const handleDelete = (record: Employee) => {
  if (confirm(`确定删除员工 ${record.name} 吗？`)) {
    dataSource.value = dataSource.value.filter(item => item.id !== record.id)
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-8 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
    <div class="mx-auto max-w-7xl space-y-8">
      <!-- 标题区域 -->
      <div class="text-center">
        <h1 class="mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent dark:from-blue-400 dark:to-purple-400">
          现代化毛玻璃表格
        </h1>
        <p class="text-gray-600 dark:text-gray-400">
          采用毛玻璃效果（Glassmorphism）设计，带来更加现代和优雅的视觉体验
        </p>
      </div>

      <!-- 统计卡片 -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="glass group cursor-pointer rounded-2xl border border-white/20 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">总员工</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {{ dataSource.length }}
              </p>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100/80 backdrop-blur-sm dark:bg-blue-900/30">
              <span class="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div class="glass group cursor-pointer rounded-2xl border border-white/20 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">在线人数</p>
              <p class="text-3xl font-bold text-green-600 dark:text-green-400">
                {{ dataSource.filter(e => e.status === 'online').length }}
              </p>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-green-100/80 backdrop-blur-sm dark:bg-green-900/30">
              <span class="text-2xl">🟢</span>
            </div>
          </div>
        </div>

        <div class="glass group cursor-pointer rounded-2xl border border-white/20 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">平均评分</p>
              <p class="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {{ (dataSource.reduce((sum, e) => sum + e.rating, 0) / dataSource.length).toFixed(1) }}
              </p>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100/80 backdrop-blur-sm dark:bg-yellow-900/30">
              <span class="text-2xl">⭐</span>
            </div>
          </div>
        </div>

        <div class="glass group cursor-pointer rounded-2xl border border-white/20 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl dark:border-gray-700/30">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-600 dark:text-gray-400">已选中</p>
              <p class="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {{ selectedRowKeys.length }}
              </p>
            </div>
            <div class="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100/80 backdrop-blur-sm dark:bg-purple-900/30">
              <span class="text-2xl">✓</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 表格区域 -->
      <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <Table
          v-model="dataSource"
          :columns="columns"
          :bordered="true"
          :hoverable="true"
          :row-selection="rowSelection"
          size="md"
        >
          <!-- 联系方式列 -->
          <template #column-contact="{ record }: { text: any; record: Employee; index: number }">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2 text-sm">
                <Mail :size="14" class="text-blue-500" />
                <a
                  :href="`mailto:${record.email}`"
                  class="text-blue-600 transition-colors hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  {{ record.email }}
                </a>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Phone :size="14" class="text-green-500" />
                <span>{{ record.phone }}</span>
              </div>
            </div>
          </template>

          <!-- 评分列 -->
          <template #column-rating="{ text }: { text: number; record: Employee; index: number }">
            <div class="flex items-center justify-center gap-1">
              <Star
                v-for="i in 5"
                :key="i"
                :size="16"
                :class="
                  i <= Math.round(text)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                "
              />
              <span class="ml-1 text-sm font-semibold text-gray-700 dark:text-gray-300">
                {{ text }}
              </span>
            </div>
          </template>

          <!-- 项目数列 -->
          <template #column-projects="{ text }: { text: number; record: Employee; index: number }">
            <div class="flex items-center justify-center">
              <span
                class="rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-3 py-1 text-sm font-semibold text-blue-700 backdrop-blur-sm dark:from-blue-500/30 dark:to-purple-500/30 dark:text-blue-300"
              >
                {{ text }} 个
              </span>
            </div>
          </template>

          <!-- 状态列 -->
          <template #column-status="{ text }: { text: Employee['status']; record: Employee; index: number }">
            <div class="flex items-center justify-center">
              <Tag :variant="getStatusInfo(text).variant" size="md" :removable="false">
                <span class="flex items-center gap-1">
                  <span>{{ getStatusInfo(text).icon }}</span>
                  <span>{{ getStatusInfo(text).text }}</span>
                </span>
              </Tag>
            </div>
          </template>

          <!-- 操作列 -->
          <template #column-actions="{ record }: { text: any; record: Employee; index: number }">
            <div class="flex items-center justify-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                class="hover:bg-blue-50 dark:hover:bg-blue-900/30"
                @click.stop="handleEdit(record)"
              >
                <template #icon>
                  <Edit :size="16" class="text-blue-600 dark:text-blue-400" />
                </template>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                class="hover:bg-red-50 dark:hover:bg-red-900/30"
                @click.stop="handleDelete(record)"
              >
                <template #icon>
                  <Delete :size="16" class="text-red-600 dark:text-red-400" />
                </template>
              </Button>
            </div>
          </template>

          <!-- 自定义空状态 -->
          <template #empty>
            <div class="flex flex-col items-center gap-4 py-16">
              <div class="text-7xl opacity-50">📭</div>
              <div class="text-lg font-semibold text-gray-500 dark:text-gray-400">暂无员工数据</div>
              <Button variant="primary" size="sm">
                <template #icon>➕</template>
                添加员工
              </Button>
            </div>
          </template>
        </Table>
      </div>

      <!-- 特性说明 -->
      <div class="glass rounded-2xl border border-white/20 p-8 shadow-xl backdrop-blur-xl dark:border-gray-700/30">
        <h2 class="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
          ✨ 毛玻璃效果特性
        </h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div class="flex gap-4">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-sm">
              <span class="text-2xl">🎨</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">渐变背景</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                使用渐变色和毛玻璃效果，营造现代感
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-sm">
              <span class="text-2xl">💎</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">半透明层</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                backdrop-blur 创造出优雅的毛玻璃质感
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-sm">
              <span class="text-2xl">✨</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">悬停动画</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                平滑的过渡和缩放效果提升交互体验
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 backdrop-blur-sm">
              <span class="text-2xl">🌓</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">深色模式</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                完美适配深色模式，自动调整透明度
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/20 backdrop-blur-sm">
              <span class="text-2xl">🎯</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">选中高亮</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                选中行使用渐变和阴影效果突出显示
              </p>
            </div>
          </div>

          <div class="flex gap-4">
            <div class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 backdrop-blur-sm">
              <span class="text-2xl">🚀</span>
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-gray-100">性能优化</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                GPU 加速的动画，流畅不卡顿
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- 代码示例 -->
      <div class="glass rounded-2xl border border-white/20 p-8 shadow-xl backdrop-blur-xl dark:border-gray-700/30">
        <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">💻 核心 CSS 类</h2>
        <div class="space-y-3 text-sm">
          <div class="rounded-lg bg-gray-900/90 p-4 font-mono text-gray-100 backdrop-blur-sm">
            <span class="text-blue-400">backdrop-blur-xl</span>
            <span class="text-gray-400"> - 毛玻璃模糊效果</span>
          </div>
          <div class="rounded-lg bg-gray-900/90 p-4 font-mono text-gray-100 backdrop-blur-sm">
            <span class="text-purple-400">bg-white/80</span>
            <span class="text-gray-400"> - 半透明背景（80% 不透明度）</span>
          </div>
          <div class="rounded-lg bg-gray-900/90 p-4 font-mono text-gray-100 backdrop-blur-sm">
            <span class="text-green-400">shadow-xl shadow-gray-200/50</span>
            <span class="text-gray-400"> - 柔和的阴影效果</span>
          </div>
          <div class="rounded-lg bg-gray-900/90 p-4 font-mono text-gray-100 backdrop-blur-sm">
            <span class="text-yellow-400">hover:backdrop-blur-lg</span>
            <span class="text-gray-400"> - 悬停时增强模糊</span>
          </div>
          <div class="rounded-lg bg-gray-900/90 p-4 font-mono text-gray-100 backdrop-blur-sm">
            <span class="text-red-400">transition-all duration-300</span>
            <span class="text-gray-400"> - 平滑过渡动画</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
