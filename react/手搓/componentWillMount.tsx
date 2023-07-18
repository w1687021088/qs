/**
 *
 * 手搓
 * */
import { useEffect, useRef, useState } from 'react'

/**
 *
 * useState 版本
 * */
function useComponentWillMountState(callback: () => void) {
  const [state, setState] = useState(false)

  if (!state) {
    callback?.()
  }

  useEffect(() => setState(false), [state])
}

/**
 *
 * useRef 版本
 * */

function useComponentWillMountRef(callback: () => void) {
  const ref = useRef(false)

  if (!ref.current) {
    ;(function () {
      ref.current = true

      callback?.()
    })()
  }
}

function App() {
  console.log('render start')

  // 利用useState的方式实现
  useComponentWillMountState(() => {
    console.log('componentWillMount') // componentWillMount 在render更新之前操作
  })

  // 利用 useRef的方式实现
  useComponentWillMountRef(() => {
    console.log('componentWillMount')
  })

  console.log('render end')
  return <></>
}

export default App
