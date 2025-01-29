import { VNode, VNodeProps, createVNode } from './vnode'

export const h = (
  type: string,
  props: VNodeProps,
  children: (VNode | string)[]
) => {
  return createVNode(type, props, children)
}
