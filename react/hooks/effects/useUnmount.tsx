import { useEffect } from 'react'
import useLatest from '../advanced/useLatest'

function useUnmount(fn: () => void) {
  const callback = useLatest<() => void>(fn)

  if (typeof fn !== 'function') {
    throw TypeError('fn is not a function')
  }

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      callback?.current?.()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useUnmount
