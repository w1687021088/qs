import { useEffect } from 'react'
import { type DependencyList } from 'react'

type IsAsyncGenerator = AsyncGenerator<void, void, void> | Promise<void>

function isAsyncGenerator(value: IsAsyncGenerator): value is AsyncGenerator<void, void, void> {
  // @ts-ignore
  return typeof value?.[Symbol?.asyncIterator] === 'function'
}

function useAsyncEffect(effect: () => IsAsyncGenerator, deps?: DependencyList) {
  useEffect(() => {
    /**
     * Generator函数: 返回 AsyncGenerator异步对象
     *
     * Promise函数：返回 Promise 异步对象
     *
     * 普通函数：返回该函数执行后的返回值
     * */
    const fn = effect()

    // 取消 Generator 等待执行队列，用于组件卸载阶段
    let canceled = false

    async function ex() {
      if (isAsyncGenerator(fn)) {
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const result = await fn.next()

          if (result.done || canceled) {
            break
          }
        }
      } else {
        await fn
      }
    }

    ex()

    return () => {
      // 组件卸载阶段取消执行队列
      canceled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useAsyncEffect
