import type { VNodeChild } from 'vue'

export interface DescriptionItem {
  key: any
  label: VNodeChild
  children: VNodeChild
  span?: number
}

export type DescriptionLabelStyle = 'default' | 'inline'

export interface DescriptionProps {
  title?: VNodeChild
  items: DescriptionItem[]
  column?: 1 | 2 | 3 | 4
  bordered?: boolean
  colon?: boolean
  labelStyle?: DescriptionLabelStyle
}
