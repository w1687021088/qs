```tsx
import {useState} from "react";

function App() {
  const [count, setCount] = useState(0);
  
  return <>
      <button onClick={() => {
        setCount(4)
        setCount(count + 1)
        setCount(1 + 1)
        setCount((updateCount) => updateCount + 1)
        setCount(6 + 1) 
      }
      }}>{count}<button>
    <>
}
```

`setState` 更新机制，属于合并更新；

只有更新完成才会变更 `state`；

针对同一个状态将每次调用 `setState`，都像是压入一个栈；

```ts
// 模拟更新栈
const updateStateStack = new Set<(newState?: number) => number>()

// 模拟当前更新阶段状态
let memoryStateCount = 0
```
每次调用 `setState`,相当于加入`更新栈`,加入之前将参数进行转化成函数;

```ts

setCount(4) // === setCount(() => 4)

// count 更新之前的状态 count === 0
setCount(count + 1) // === setCount(() => (count === 0) + 1)

setCount(1 + 1) // setCount(() => 2)

// updateCount 当前 === 0，还未更新
setCount((updateCount) => updateCount + 1) // setCount((updateCount) => updateCount + 1)

setCount(6 + 1) // === setCount(() => 7)
```
开始更新, 更新方式像下方的方式

```ts
// setCount(4)
updateStateStack.add(() => 4)

// setCount(count + 1) PS: 更新之前的 count 状态 === 0
updateStateStack.add(() => 1)

// setCount(1 + 1)
updateStateStack.add(() => 2)

// setCount((updateCount) => updateCount + 1)
updateStateStack.add((updateCount: number) => updateCount + 1)

// setCount(6 + 1)
updateStateStack.add(() => 7)


updateStateStack.forEach(callback => {
  memoryStateCount = callback(memoryStateCount)
  // 第一阶段 () => 4； memoryStateCount = 4；
  // 第二阶段 () => 1； memoryStateCount = 1；
  // 第三阶段 () => 2； memoryStateCount = 2；
  // 第四阶段 (updateCount: number) => updateCount + 1； memoryStateCount = 2 + 1 = 3；
  // callback 接收上一个阶段的状态
  // 第五阶段 () => 7；memoryStateCount = 7；
})

console.log(memoryStateCount); // 7
```
最终更新状态 count = 7；
