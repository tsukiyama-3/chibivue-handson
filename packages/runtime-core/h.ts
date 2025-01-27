import { VNode, VNodeProps } from './vnode'

export const h = (
  type: string,
  props: VNodeProps,
  children: (VNode | string)[]
) => {
  return { type, props, children }
}
