import { EffectCallback, useEffect, useRef } from 'react'

function useMounted(effect: EffectCallback) {
  const init = useRef(true)

  useEffect(() => {
    init.current && effect()

    init.current = false

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export default useMounted
