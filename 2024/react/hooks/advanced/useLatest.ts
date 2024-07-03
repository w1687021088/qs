import { useRef } from 'react'

function useLatest<T = any>(value: T) {
  const valueRef = useRef<T>(value)

  valueRef.current = value

  return valueRef
}

export default useLatest
