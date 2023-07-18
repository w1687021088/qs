import { useEffect, useRef } from 'react'

function useComponentDidMount(callback: () => void) {
  const ref = useRef(true)

  useEffect(() => {
    if (ref.current) {
      callback?.()

      ref.current = false
    }
  }, [callback])
}

function App() {
  useComponentDidMount(() => {
    console.log('初始化执行')
  })
  return <></>
}
