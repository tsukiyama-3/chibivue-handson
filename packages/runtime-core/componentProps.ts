import { reactive } from '../reactivity'
import { camelize, hasOwn } from '../shared/general'
import { ComponentInternalInstance, Data } from './component'

export type Props = Record<string, PropsOptions | null>

export interface PropsOptions<T = any> {
  type?: PropsType<T> | true | null
  required?: boolean
  default?: null | undefined | object
}

export type PropsType<T> = { new (...args: any[]): T & {} }

export const initProps = (
  instance: ComponentInternalInstance,
  rawProps: Data | null
) => {
  const props: Data = {}
  setFullProps(instance, rawProps, props)
  instance.props = reactive(props)
}

export const updateProps = (
  instance: ComponentInternalInstance,
  rawProps: Data | null
) => {
  const { props } = instance
  Object.entries(rawProps ?? {}).forEach(([key, value]) => {
    props[camelize(key)] = value
  })
}

const setFullProps = (
  instance: ComponentInternalInstance,
  rawProps: Data | null,
  props: Data
) => {
  const options = instance.propsOptions

  if (rawProps) {
    for (let key in rawProps) {
      const value = rawProps[key]
      let camelKey
      if (options && hasOwn(options, (camelKey = camelize(key)))) {
        props[camelKey] = value
      }
    }
  }
}
