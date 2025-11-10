import type { CSSProperties, ShallowRef } from 'vue'

import { computed, toValue, watch } from 'vue'

import {
  tryOnScopeDispose,
  useElementBounding,
  useElementSize,
  useMouseInElement,
} from '@vueuse/core'
import { isNil } from 'lodash-es'

export type CornerPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
  | 'left-top'
  | 'left-center'
  | 'left-bottom'
  | 'right-top'
  | 'right-center'
  | 'right-bottom'

export default function useFixedPosition(
  position: CornerPosition,
  trigger: Readonly<ShallowRef<HTMLElement | null>>,
  content: Readonly<ShallowRef<HTMLElement | null>>,
) {
  const triggerBounding = useElementBounding(trigger)
  const contentSize = useElementSize(content)

  const { isOutside } = useMouseInElement(trigger)

  const style = computed<CSSProperties>(() => {
    const tLeft = toValue(triggerBounding.left ?? triggerBounding.x)
    const tTop = toValue(triggerBounding.top ?? triggerBounding.y)
    const tWidth = toValue(triggerBounding.width)
    const tHeight = toValue(triggerBounding.height)
    const cWidth = toValue(contentSize.width)
    const cHeight = toValue(contentSize.height)

    let top: number | undefined
    let left: number | undefined

    switch (position) {
      case 'top-left':
        top = tTop - cHeight
        left = tLeft
        break
      case 'top-center':
        top = tTop - cHeight
        left = tLeft + tWidth / 2 - cWidth / 2
        break
      case 'top-right':
        top = tTop - cHeight
        left = tLeft + tWidth - cWidth
        break
      case 'bottom-left':
        top = tTop + tHeight
        left = tLeft
        break
      case 'bottom-center':
        top = tTop + tHeight
        left = tLeft + tWidth / 2 - cWidth / 2
        break
      case 'bottom-right':
        top = tTop + tHeight
        left = tLeft + tWidth - cWidth
        break
      case 'left-top':
        left = tLeft - cWidth
        top = tTop
        break
      case 'left-center':
        left = tLeft - cWidth
        top = tTop + tHeight / 2 - cHeight / 2
        break
      case 'left-bottom':
        left = tLeft - cWidth
        top = tTop + tHeight - cHeight
        break
      case 'right-top':
        left = tLeft + tWidth
        top = tTop
        break
      case 'right-center':
        left = tLeft + tWidth
        top = tTop + tHeight / 2 - cHeight / 2
        break
      case 'right-bottom':
        left = tLeft + tWidth
        top = tTop + tHeight - cHeight
        break
      default:
        top = tTop + tHeight
        left = tLeft
    }

    const style: CSSProperties = {
      position: 'fixed',
      top: !isNil(top) ? `${Math.round(top)}px` : undefined,
      left: !isNil(left) ? `${Math.round(left)}px` : undefined,
    }

    return style
  })

  const unwatch = watch(isOutside, triggerBounding.update)

  tryOnScopeDispose(() => {
    unwatch()
    contentSize.stop()
  })

  return [style, triggerBounding, contentSize] as const
}
