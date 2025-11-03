import type { ComponentPublicInstance, VNodeChild } from 'vue'

export interface BreadcrumbRoute {
  path: string
  breadcrumbName: string
  children?: BreadcrumbRoute[]
}

export interface BreadcrumbItem {
  /**
   * The title of the breadcrumb item
   */
  title: string | VNodeChild
  /**
   * Target of hyperlink
   */
  href?: string
  /**
   * The additional css class
   */
  class?: string
  /**
   * Set the handler to handle click event
   */
  onClick?: (event: MouseEvent) => void
}

export interface BreadcrumbProps {
  /**
   * Custom separator character
   * @default '/'
   */
  separator?: string | VNodeChild
  /**
   * Routing parameters
   */
  params?: Record<string, any>
  /**
   * The routing stack information
   */
  routes?: BreadcrumbRoute[]
  /**
   * Custom item renderer
   */
  itemRender?: (route: any, params: any, routes: any[], paths: string[]) => VNodeChild
  /**
   * The breadcrumb items
   */
  items?: BreadcrumbItem[]
}

export interface BreadcrumbItemProps {
  /**
   * Target of hyperlink
   */
  href?: string
  /**
   * The additional css class
   */
  class?: string
  /**
   * Set the handler to handle click event
   */
  onClick?: (event: MouseEvent) => void
}

export interface BreadcrumbSlots {
  /**
   * Breadcrumb content
   */
  default?: () => VNodeChild
  /**
   * Custom separator
   */
  separator?: () => VNodeChild
}

export interface BreadcrumbItemSlots {
  /**
   * Breadcrumb item content
   */
  default?: () => any
}

export interface BreadcrumbEmits {
  /**
   * Click event on breadcrumb item
   */
  click: [event: MouseEvent]
}

export interface BreadcrumbItemEmits {
  /**
   * Click event on breadcrumb item
   */
  click: [event: MouseEvent]
}

export type BreadcrumbExpose = Record<string, any>

export type BreadcrumbInstance = ComponentPublicInstance<BreadcrumbProps, BreadcrumbExpose>
