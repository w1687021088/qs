# `useCallback`

#### React的一个hooks方法，是用来缓存计算结果的 Hook。

#### `useCallback`接受一个回调函数作为第一个参数，第二个参数依赖项，并返回一个 `memoized（记忆化的）`回调函数

#### 当依赖数组中的任意一个值发生变化时，`useCallback` 会返回一个新的回调函数，否则会直接返回之前缓存的回调函数。`useCallback` 适用于那些需要传递给子组件的回调函数，可以避免不必要的重复渲染。


```tsx

const handleSubmit = useCallBack(() => {
  // ...逻辑
  // ...使用到props或者组件内部变量或者状态
}, [
  // ...deps
])


// handleSubmit // 用于传递给自组件，或给到其他记忆函数作为依赖

    
```

# `useMemo`

#### React的一个hooks方法，是用来缓存计算结果的 Hook

#### `useMemo` 接收第一个回调函数，第二个参数依赖项。同样只在依赖项发生变更时更改返回值。

#### `useMemo` 当依赖数组中的任意一个值发生变化时，`useMemo` 会重新计算函数的值，否则会直接返回之前缓存的结果。`useMemo` 适用于那些需要进行复杂计算的场景，可以避免不必要的重复计算。

------

#### `useCallback` 和 `useMemo`区别在于：useMemo 返回的是计算结果，而 `useCallback` 返回的是 `memoized` 回调函数。`useMemo` 适用于那些需要进行复杂计算的场景，`useCallback` 适用于那些需要传递给子组件的回调函数。
