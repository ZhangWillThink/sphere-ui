<script setup lang="ts">
import type { TableColumn } from '../types'

import { ref } from 'vue'

import Table from '../index.vue'

interface DataType {
  id: number
  name: string
  age: number
  address: string
  email: string
  status: 'active' | 'inactive'
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
    key: 'email',
    title: '邮箱',
    dataIndex: 'email',
    width: 200,
  },
  {
    key: 'status',
    title: '状态',
    dataIndex: 'status',
    width: 100,
    align: 'center',
    render: ({ text }: { text: string }) => {
      return text === 'active' ? '✅ 活跃' : '⛔ 禁用'
    },
  },
]

const dataSource = ref<DataType[]>([
  {
    id: 1,
    name: '张三',
    age: 28,
    address: '北京市朝阳区某某街道123号',
    email: 'zhangsan@example.com',
    status: 'active',
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    address: '上海市浦东新区某某路456号',
    email: 'lisi@example.com',
    status: 'active',
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    address: '广州市天河区某某大道789号',
    email: 'wangwu@example.com',
    status: 'inactive',
  },
  {
    id: 4,
    name: '赵六',
    age: 35,
    address: '深圳市南山区某某科技园101号',
    email: 'zhaoliu@example.com',
    status: 'active',
  },
  {
    id: 5,
    name: '钱七',
    age: 29,
    address: '杭州市西湖区某某路202号',
    email: 'qianqi@example.com',
    status: 'inactive',
  },
])

const loading = ref(false)
const selectedRowKeys = ref<number[]>([])

const rowSelection = {
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: (string | number)[], selectedRows: DataType[]) => {
    selectedRowKeys.value = keys as number[]
    console.log('选中的行:', keys, selectedRows)
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.status === 'inactive',
  }),
}

const handleRowClick = (record: DataType, index: number) => {
  console.log('点击行:', record, index)
}

const handleChange = (pagination: any, filters: any, sorter: any) => {
  console.log('表格变化:', { pagination, filters, sorter })
}

const loadData = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div class="space-y-6 p-6">
    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">基础表格</h2>
      <Table
        v-model="dataSource"
        :columns="columns"
        :bordered="true"
        :hoverable="true"
        @rowClick="handleRowClick"
        @change="handleChange"
      />
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">粘性表头</h2>
      <div class="max-h-96 overflow-auto">
        <Table v-model="dataSource" :columns="columns" :sticky="true" :bordered="true" />
      </div>
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">带斑马纹的表格</h2>
      <Table v-model="dataSource" :columns="columns" :striped="true" />
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">小尺寸表格</h2>
      <Table v-model="dataSource" :columns="columns" size="sm" :bordered="true" />
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">大尺寸表格</h2>
      <Table v-model="dataSource" :columns="columns" size="lg" :bordered="true" />
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">加载状态</h2>
      <button
        class="mb-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        @click="loadData"
      >
        加载数据
      </button>
      <Table v-model="dataSource" :columns="columns" :loading="loading" :bordered="true" />
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">带行选择的表格</h2>
      <div class="mb-4 text-sm text-gray-600 dark:text-gray-400">
        已选中 {{ selectedRowKeys.length }} 项
      </div>
      <Table
        v-model="dataSource"
        :columns="columns"
        :row-selection="rowSelection"
        :bordered="true"
      />
    </div>

    <div>
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">空数据表格</h2>
      <Table :columns="columns" :data-source="[]" :bordered="true" />
    </div>
  </div>
</template>
