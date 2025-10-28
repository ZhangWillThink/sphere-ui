import type { VNodeChild } from 'vue'

/**
 * 表格列配置
 */
export interface TableColumn<T = any> {
  /** 列的唯一标识 */
  key: string
  /** 列标题 */
  title?: string | VNodeChild
  /** 数据字段名，支持嵌套路径 */
  dataIndex?: string | string[]
  /** 列宽度 */
  width?: string | number
  /** 列最小宽度 */
  minWidth?: string | number
  /** 对齐方式 */
  align?: 'left' | 'center' | 'right'
  /** 固定列位置（暂未实现） */
  fixed?: 'left' | 'right'
  /** 是否可排序 */
  sortable?: boolean
  /** 是否自动省略过长内容 */
  ellipsis?: boolean
  /** 自定义渲染函数 */
  render?: (params: { text: any; record: T; index: number }) => VNodeChild
}

/**
 * 排序状态
 */
export interface SortState {
  /** 排序列的 key */
  key: string
  /** 排序顺序：升序、降序或不排序 */
  order: 'ascend' | 'descend' | null
}

/**
 * 行选择配置
 */
export interface RowSelection<T = any> {
  /** 已选中的行 key 数组 */
  selectedRowKeys?: (string | number)[]
  /** 选择变化时的回调 */
  onChange?: (selectedRowKeys: (string | number)[], selectedRows: T[]) => void
  /** 获取复选框属性（如禁用状态） */
  getCheckboxProps?: (record: T) => {
    disabled?: boolean
  }
}

/**
 * 表格尺寸
 */
export type TableSize = 'sm' | 'md' | 'lg'

/**
 * 表格 Props
 */
export interface TableProps<T = any> {
  /** 表格列配置 */
  columns?: TableColumn<T>[]
  /** 数据源 */
  dataSource?: T[]
  /** 是否显示边框 */
  bordered?: boolean
  /** 是否显示斑马纹 */
  striped?: boolean
  /** 是否显示悬停效果 */
  hoverable?: boolean
  /** 表格尺寸 */
  size?: TableSize
  /** 是否显示加载状态 */
  loading?: boolean
  /** 空数据时显示的文本 */
  emptyText?: string
  /** 行数据的 Key，用于优化渲染 */
  rowKey?: string | ((record: T) => string | number)
  /** 行选择配置 */
  rowSelection?: RowSelection<T>
  /** 是否固定表头 */
  sticky?: boolean
}

/**
 * 表格事件
 */
export interface TableEmits<T = any> {
  /** 点击行时触发 */
  rowClick: [record: T, index: number]
  /** 表格变化时触发（排序、筛选等） */
  change: [pagination: any, filters: any, sorter: SortState]
}

/**
 * 表格插槽参数
 */
export interface TableSlotParams<T = any> {
  /** 单元格文本内容 */
  text: any
  /** 当前行数据 */
  record: T
  /** 当前行索引 */
  index: number
}
