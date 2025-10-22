import type { VNodeChild } from 'vue'

export interface CollapseItem {
  key: any
  label: VNodeChild
  children: VNodeChild
  disabled?: boolean
}

export interface CollapseProps {
  items: CollapseItem[]
  accordion?: boolean
  bordered?: boolean
  ghost?: boolean
}
