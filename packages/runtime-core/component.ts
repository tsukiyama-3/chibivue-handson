import { ReactiveEffect } from '../reactivity'
import { VNode, VNodeChild } from './vnode'
import { ComponentOptions } from './componentOptions'

export type Component = ComponentOptions

export interface ComponentInternalInstance {
  type: Component // 元となるユーザ定義のコンポーネント（旧 rootComponent）
  vnode: VNode
  subTree: VNode // 旧 n1
  next: VNode | null // 旧 n2
  effect: ReactiveEffect // 旧 effect
  render: InternalRenderFunction // 旧 componentRender
  update: () => void // 旧 updateComponent
  isMounted: boolean
}

export type InternalRenderFunction = {
  (): VNodeChild
}

export const createComponentInstance = (
  vnode: VNode
): ComponentInternalInstance => {
  const type = vnode.type as Component

  const instance: ComponentInternalInstance = {
    type,
    vnode,
    next: null,
    effect: null!,
    subTree: null!,
    update: null!,
    render: null!,
    isMounted: null!,
  }

  return instance
}
