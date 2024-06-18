## setState 是同步还是异步

setState 异步更新 组件内部状态。

### 性能优化：

react 的状态发生变故将会触发更新组件，setState 异步更新 state 的原因是为了在每一次事件循环中合并批次处理多个修改状态并统一更新。

```jsx

function Home() {
    const [count, setCount] = useState(0)

    console.log('commit')

    return (
        <div className="card">
            <button
                onClick={() => {
                    setCount(count + 1) // count = 0
                    setCount(count + 1) // count = 0
                }}
            >
                count is {count} // 1
            </button>
        </div>
    )
}

```

包括异步操作

```js
 Promise.resolve().then(() => {
    setCount(count + 1) // count = 0
    setCount(count + 1) // count = 0
})

// 或者

setTimeout(() => {
    setCount(count + 1) // count = 0
    setCount(count + 1) // count = 0
})
```

### 一致性：

保证在每次事件循环更新之前的 state 是一致的，并保证多次调用 setState 时组件内部的 state 中途不会变更。


```jsx

function Home() {
    const [count, setCount] = useState(0)

    console.log('commit')

    return (
        <div className="card">
            <button
                onClick={() => {
                    setCount(count + 1) // count = 0
                    setCount(count + 1) // count = 0
                    
                    setTimeout(() => {
                        console.log(count); // 0
                    })
                }}
            >
                count is {count} // 1
            </button>
        </div>
    )
}

```
