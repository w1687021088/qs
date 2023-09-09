import { EffectCallback, useCallback, useEffect, useRef } from 'react'
import useMemoizedFn from 'hooks/advanced/useMemoizedFn'

function useTimeout(effect: EffectCallback, timeout = 0) {
  const timer = useRef<number | undefined>(undefined)

  const timerCallback = useMemoizedFn(effect)

  // 也可以使用下面的
  // const effectRef = useRef(effect)
  // useEffect(() => {
  //   effectRef.current = effect
  // }, [effect])

  const clear = useCallback(() => {
    clearTimeout(timer.current)
  }, [])

  useEffect(() => {
    // @ts-ignore
    timer.current = setTimeout(timerCallback.current, timeout)

    return clear
  }, [timeout, clear, timerCallback])

  return clear
}

export default useTimeout
