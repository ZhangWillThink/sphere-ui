import type { VNodeChild } from 'vue'

export interface TabsItem {
  disabled?: boolean
  label: VNodeChild
  value: any
  children?: VNodeChild
}

export interface TabsProps {
  items: TabsItem[]
}

export interface TabsEmits {
  change: [value: any]
}

export interface TabsSlots {
  [key: `tab-${string}`]: () => VNodeChild
}
