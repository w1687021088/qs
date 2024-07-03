# 初始阶段

## 1. 组件实例化

通过 React.createElement 或者 ReactDOM.createRoot 实例化组件。

## 2. 执行生命周期方法

 - 类组件
    - `constructor` 方法执行
    - 如有定义 `getDeriveStateFromProps`， 也执行
    - `render` 执行，并生成 filber 节点
    - `componentDidMount`

 - 函数组件
    - useState
    - useEffect
 ## 3.创建虚拟 DOM

在调用 render 方法或函数组件时，React 会生成虚拟 DOM 树。虚拟 DOM 是 React 内部使用的轻量级表示，描述了组件的结构和属性。

## 4. 初始渲染
创建真实的 DOM，并插入到页面中。

## 5. 提交阶段

组件已挂载到页面中，同时执行 类组件的 componentDidMount， 或者函数组件的 useEffect 的副作用。

---
 
# 更新阶段

## 1. 触发更新

更新组件内部的状态和属性；

## 2. 执行生命周期的方法

类组件执行，
- getDerivedStateFromProps
- shouldComponentUpdate
- render
- getSnapshotBeforeUpdate
- componentDidUpdate

函数式组件：

- 清理 useEffect 和重新执行副作用。

## 3.生成新的虚拟 DOM

通过 render 函数生成新的虚拟 DOM。

## 4.diff算法

将新旧 虚拟DOM 进行比较，根据差异的比较可以操作 create/delete/update 等操作


## 提交阶段

### 生命周期方法

- 类组件在组件更新之前，做最后的操作 getSnapshotBeforeUpdate，componentDidUpdate

- 对于函数组件，执行清理副作用（如果依赖数组变化）并重新执行副作用。

### DOM 更新

根据 Diff 算法的结果，React 将变更应用到实际的 DOM 中

### 副作用

执行 useEffect 和 useLayoutEffect 中的副作用                                  

---

# 卸载阶段
