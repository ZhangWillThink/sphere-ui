<script setup lang="ts">
import type { TableColumn } from '../types'

import { h, ref } from 'vue'

import { Delete, Edit, More } from '@icon-park/vue-next'

import Button from '../../Button/index.vue'
import Tag from '../../Tag/index.vue'
import Table from '../index.vue'

interface DataType {
  id: number
  name: string
  age: number
  address: string
  email: string
  tags: string[]
  status: 'active' | 'inactive' | 'pending'
}

const columns: TableColumn<DataType>[] = [
  {
    key: 'name',
    title: '姓名',
    dataIndex: 'name',
    width: 150,
    sortable: true,
  },
  {
    key: 'age',
    title: '年龄',
    dataIndex: 'age',
    width: 100,
    align: 'center',
    sortable: true,
  },
  {
    key: 'address',
    title: '地址',
    dataIndex: 'address',
    ellipsis: true,
  },
  {
    key: 'tags',
    title: '标签',
    dataIndex: 'tags',
    width: 200,
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 120,
    align: 'center',
  },
  {
    key: 'actions',
    title: '操作',
    width: 200,
    align: 'center',
  },
]

const dataSource = ref<DataType[]>([
  {
    id: 1,
    name: '张三',
    age: 28,
    address: '北京市朝阳区某某街道123号',
    email: 'zhangsan@example.com',
    tags: ['开发', '前端', 'Vue'],
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    address: '上海市浦东新区某某路456号',
    email: 'lisi@example.com',
    tags: ['设计', 'UI/UX'],
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    address: '广州市天河区某某大道789号',
    email: 'wangwu@example.com',
    tags: ['后端', 'Java', 'Spring'],
    status: 'pending',
  },
  {
    id: 4,
    name: '赵六',
    age: 35,
    address: '深圳市南山区某某科技园101号',
    email: 'zhaoliu@example.com',
    tags: ['产品', '项目管理'],
    status: 'inactive',
  },
  {
    id: 5,
    name: '钱七',
    age: 29,
    address: '杭州市西湖区某某路202号',
    email: 'qianqi@example.com',
    tags: ['测试', '自动化'],
    status: 'active',
  },
])

const getStatusVariant = (status: string): 'success' | 'error' | 'warning' | 'default' => {
  const variantMap: Record<string, 'success' | 'error' | 'warning' | 'default'> = {
    active: 'success',
    inactive: 'error',
    pending: 'warning',
  }
  return variantMap[status] || 'default'
}

const getStatusText = (status: string) => {
  const textMap = {
    active: '活跃',
    inactive: '禁用',
    pending: '待审核',
  }
  return textMap[status as keyof typeof textMap] || status
}

const handleEdit = (record: DataType) => {
  console.log('编辑:', record)
  alert(`编辑用户: ${record.name}`)
}

const handleDelete = (record: DataType) => {
  console.log('删除:', record)
  if (confirm(`确定要删除 ${record.name} 吗？`)) {
    dataSource.value = dataSource.value.filter(item => item.id !== record.id)
  }
}

const handleMore = (record: DataType) => {
  console.log('更多操作:', record)
}
</script>

<template>
  <div class="space-y-6 p-6">
    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        自定义列渲染（使用插槽）
      </h2>
      <Table v-model="dataSource" :columns="columns" :bordered="true" :hoverable="true">
        <!-- 自定义标签列 -->
        <template #column-tags="{ text }">
          <div class="flex flex-wrap gap-1">
            <Tag
              v-for="(tag, index) in text"
              :key="index"
              :variant="(['primary', 'success', 'warning', 'error'] as const)[index % 4]"
              size="sm"
            >
              {{ tag }}
            </Tag>
          </div>
        </template>

        <!-- 自定义状态列 -->
        <template #column-status="{ text }">
          <Tag :variant="getStatusVariant(text)" size="md" :removable="false">
            {{ getStatusText(text) }}
          </Tag>
        </template>

        <!-- 自定义操作列 -->
        <template #column-actions="{ record }">
          <div class="flex items-center justify-center gap-2">
            <Button size="sm" variant="ghost" @click="handleEdit(record)">
              <template #icon>
                <Edit :size="16" />
              </template>
              编辑
            </Button>
            <Button size="sm" variant="ghost" @click="handleDelete(record)">
              <template #icon>
                <Delete :size="16" />
              </template>
              删除
            </Button>
            <Button size="sm" variant="ghost" @click="handleMore(record)">
              <template #icon>
                <More :size="16" />
              </template>
            </Button>
          </div>
        </template>

        <!-- 自定义空状态 -->
        <template #empty>
          <div class="flex flex-col items-center gap-4 py-12">
            <div class="text-6xl">📭</div>
            <div class="text-lg font-medium text-gray-500 dark:text-gray-400">暂无数据</div>
            <Button variant="primary" size="sm">
              <template #icon>➕</template>
              添加数据
            </Button>
          </div>
        </template>
      </Table>
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
        使用 render（渲染函数）
      </h2>
      <Table
        v-model="dataSource"
        :columns="[
          {
            key: 'name',
            title: '姓名',
            dataIndex: 'name',
            width: 150,
            render: ({ text }) =>
              h('div', { class: 'flex items-center gap-2' }, [
                h(
                  'div',
                  {
                    class:
                      'flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-semibold dark:bg-blue-900 dark:text-blue-300',
                  },
                  text.charAt(0),
                ),
                h('span', { class: 'font-medium' }, text),
              ]),
          },
          {
            key: 'age',
            title: '年龄',
            dataIndex: 'age',
            width: 100,
            align: 'center',
            sortable: true,
          },
          {
            key: 'email',
            title: '邮箱',
            dataIndex: 'email',
            render: ({ text }) =>
              h(
                'a',
                {
                  href: `mailto:${text}`,
                  class: 'text-blue-600 hover:underline dark:text-blue-400',
                },
                text,
              ),
          },
          {
            key: 'status',
            title: '状态',
            dataIndex: 'status',
            width: 120,
            align: 'center',
            render: ({ text }) =>
              h(
                'span',
                {
                  class: [
                    'inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium',
                    text === 'active'
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : text === 'inactive'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300',
                  ],
                },
                [
                  h('span', {
                    class: [
                      'h-2 w-2 rounded-full',
                      text === 'active'
                        ? 'bg-green-500'
                        : text === 'inactive'
                          ? 'bg-red-500'
                          : 'bg-yellow-500',
                    ],
                  }),
                  getStatusText(text),
                ],
              ),
          },
        ]"
        :bordered="true"
      />
    </div>
  </div>
</template>
