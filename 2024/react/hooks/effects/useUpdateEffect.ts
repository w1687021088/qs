import { DependencyList, EffectCallback, useEffect, useRef } from 'react'

function useUpdateEffect(effect: EffectCallback, deps: DependencyList) {
  const init = useRef(true)

  useEffect(() => {
    if (!init.current) {
      effect()
    }

    return () => {
      init.current = false
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useUpdateEffect
