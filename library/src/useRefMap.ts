import { useRef } from 'react'

export const useRefMap = <K, V>() => {
  const refMap = useRef<Map<K, V>>()

  const getCurrent = () => {
    if (refMap.current === undefined) {
      refMap.current = new Map()
    }
    return refMap.current
  }

  const get = (key: K) => getCurrent().get(key)

  const set = (key: K, value: V) => {
    getCurrent().set(key, value)
  }

  const remove = (key: K) => getCurrent().delete(key)

  return {
    get,
    initRef: (key: K, ref: V | null) => {
      if (ref) {
        set(key, ref)
      } else {
        remove(key)
      }
    },
  }
}
