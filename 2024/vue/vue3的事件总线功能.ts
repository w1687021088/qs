import { inject, type InjectionKey, onUnmounted, provide, ref } from 'vue'

type BusEvent = {
  message: (id: string) => void
  count: (num: number, str: string, bool: boolean) => void
  open(): void
}

type BusEventName = keyof BusEvent

type BusEventCallbackArgs<T extends BusEventName> = BusEvent[T]

type EventBusListenerCallback = <K extends BusEventName>(eventName: K, handle: BusEventCallbackArgs<K>, id: string) => void

type BusDispatchHandle = <K extends BusEventName>(eventName: K, ...args: Parameters<BusEventCallbackArgs<K>>) => void

const EventBusListenerKey = Symbol() as InjectionKey<EventBusListenerCallback>

const EventBusDispatch = Symbol() as InjectionKey<BusDispatchHandle>

const EventBusDelete = Symbol() as InjectionKey<(eventNames: string[]) => void>

export function useEventBus() {
  const stack = ref<Map<string, BusEventCallbackArgs<BusEventName>>>(new Map())
  // 监听
  provide(EventBusListenerKey, (eventName, handle, id) => {
    const key = `${eventName}-${id}`
    const item = stack.value.has(key)

    if (!item) {
      stack.value.set(key, handle)
    }
  })

  // 派发
  provide(EventBusDispatch, (eventName, ...args) => {
    // @ts-ignore
    for (const [name, handle] of stack.value) {
      if (name.split('-')[0] === eventName) {
        ;(handle as any)?.(...args)
      }
    }
  })

  // 卸载阶段删除
  provide(EventBusDelete, (eventNames) => {
    eventNames.forEach((eventName) => {
      stack.value.delete(eventName)
    })
  })

  // 清除
  onUnmounted(() => {
    stack.value.clear()
  })
}

export function useListenerEventBus() {
  const list = ref<string[]>([])

  const listener = inject(EventBusListenerKey)

  const unmounted = inject(EventBusDelete)

  onUnmounted(() => {
    unmounted?.(list.value)
  })

  return <T extends BusEventName>(eventName: T, handle: BusEventCallbackArgs<T>) => {
    const time = Date.now().toString()
    list.value.push(`${eventName}-${time}`)

    listener?.(eventName, handle, time)
  }
}

export const useDispatchEventBus = () => inject(EventBusDispatch)

// 在 顶层组件内 添加 useEventBus()

// 示例
function useCat() {
  const dispatch = useDispatchEventBus()

  const listener = useListenerEventBus()

  listener('message', (id) => {
    console.log(id)
  })

  listener('count', (a, b, c) => {
    console.log(c)
  })

  listener('open', () => {})

  dispatch?.('count', 1, '2', true)

  dispatch?.('message', '3')
}
