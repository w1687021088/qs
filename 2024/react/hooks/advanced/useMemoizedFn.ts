import { useMemo, useRef } from 'react'

type noop = (this: any, ...args: any[]) => any

type PickFunction<T extends noop> = (this: ThisParameterType<T>, ...args: Parameters<T>) => ReturnType<T>

function useMemoizedFn<T extends noop>(fn: T) {
  const fnRef = useRef<T>(fn)

  fnRef.current = useMemo(() => {
    console.log(34)
    return fn
  }, [fn])

  const memoizedFn = useRef<PickFunction<T>>()

  if (!memoizedFn.current) {
    memoizedFn.current = function (this, ...args) {
      return fnRef.current.apply(this, args)
    }
  }

  return memoizedFn
}

export default useMemoizedFn
