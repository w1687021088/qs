## 1. 怎么在代码中判断一个 React 组件是 class component 还是 function component？

```js

function isClassComponent(component) {
  return typeof component === 'function' && !!component.prototype.isReactComponent
}
```
首先 class 也是一个函数，React 的function component是一个纯函数是知道的，重点在 class 组件上，利用 React.Component 原型上的 isReactComponent 方法，判断是否存在即可；

## 2. useEffect 的第二个参数, 传空数组和传依赖数组有什么区别？

在 React 中 useEffect 是一个常用的 hooks， useEffect 用于处理组件挂载阶段、更新阶段和卸载阶段所需要处理的额外操作；

useEffect 接收两个参数，第一个是 回调函数，第二个是监听依赖更新的数组；

如果第二个参数传递空数组，useEffect只会在组件挂载阶段和卸载阶段执行一次；

```tsx
useEffect(() => {
  // 执行一次
  
  return () => {
    // 卸载执行一次
  }
}, []);
```

如果是传递了依赖项，则除了在挂载阶段和卸载阶段执行一次外，将在依赖项更新时重新调用回调函数；

```tsx
useEffect(() => {
  // count挂载执行和更新阶段都执行
  
  return () => {
    // count更新和卸载阶段都执行
  }
}, [count]); // count
```

## 3. 怎么判断一个对象是否是 React 元素？

```tsx

function Fuc({ children }: { children: ReactNode }) {
  console.log(React.isValidElement(children))

  return <div>function component{children}</div>
}

```

需要注意的是，React.isValidElement() 方法只能用于判断是否为 React 元素，并不能判断元素的类型和其他属性。如果需要获取元素的类型或其他属性，可以直接访问元素的属性，例如 type、props、key 等


## 4. React 中的 ref 有什么用？

ref 都是 React 中用于操作 DOM 元素或自定义组件实例的工具;

## 4. useRef、ref、和 forwardsRef区别

useRef 和 ref 都是 React 中用于操作 DOM 元素或自定义组件实例的工具，而 forwardRef 则是用于访问嵌套子组件中的 DOM 元素或自定义组件实例。

它们之间的区别如下：

useRef 是一个 hook 函数，可以在函数组件中使用；ref 是一个对象属性，只能在类组件中使用。
useRef 返回一个可变的 ref 对象，可以在组件的整个生命周期内保持不变，也就是说不会因为重新渲染而改变。而 ref 每次渲染都会被重新创建。
useRef 主要用于存储和更新组件内部状态，以及操作 DOM 元素。而 ref 主要用于获取 DOM 元素或自定义组件实例。
forwardRef 是用于将 ref 属性“向下传递”给一个函数式子组件或自定义组件的工具函数。它允许父组件调用子组件中的 DOM 元素或自定义组件实例。
综上所述，useRef 和 ref 都是用于操作 DOM 元素或自定义组件实例的工具，与之相比，forwardRef 则是一个更高级的工具，用于处理专门的情况，即访问嵌套子组件中的 DOM 元素或自定义组件实例。

## 5. 简述下 React 的事件机制？

`React 事件机制`基于浏览器的事件机制实现`合成事件`

React 并不会把所有的处理函数直接绑定在真实的节点上。而是把所有的事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。

当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。

当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。

解决什么：

减少了事件监听器的创建，节省了内存

统一了写法

磨平浏览器的兼容

## 6. 闭包陷阱

React 由于它的函数组件的状态管理机制，导致了特定的闭包特性；

解决方法：
为了解决闭包陷阱的问题，可以通过正确设置依赖数组来确保在回调函数中使用的状态和 props 始终是最新的值；

useRef 方式：

通过 useRef 存储每次最新的 state 和 props；


## 7. react是否支持给标签设置自定义的属性

支持，但是会受限制，如果自定义的属性不是 string, number 或者 object，该属性依然会被忽略。

可以使用原生 js 在操作 DOM 的方法设置setAttribute；

## 8. 在 React 中可以做哪些性能优化？

使用 shouldComponentUpdate 避免不需要的渲染，但是如果对 props 和 state 做深比较，代价很大，所以需要根据业务进行些取舍；在有子组件的情况下，为了避免子组件的重复渲染，可以通过父组件来判断子组件是否需要 PureRender

## 9. 什么是 useMemo

使用memo可以帮助我们优化性能，让react没必要执行不必要的函数
由于复杂数据类型的地址可能发生改变，于是传递给子组件的props也会发生变化，这样还是会执行不必要的函数，所以就用到了useMemo这个api
`useCallback` 是`useMemo`的`语法糖`

## 10. 什么是Context

`context`（上下文）可以看成是扩大版的props，它可以将全局的数据通过 provider 接口传递value给局部的组件，让包围在provider中的局部组件可以获取到全局数据的读写接口

## 11. 为什么不能在循环、条件或嵌套函数中调用 Hooks？
这与React Hooks的底层设计的数据结构相关，react用链表来严格保证hooks的顺序;

React依赖Hooks的调用顺序来管理组件的状态和副作用。如果在循环、条件或嵌套函数中调用Hooks，可能导致Hooks的调用顺序发生变化，从而引发意外的行为和错误。

## 12. 为什么 useState 返回的是数组而不是对象？

方便于数据解构，数组的解构支持自定义命名，对象的话不支持，只能重新命名；

## 13. useEffect 与 useLayoutEffect 有什么区别？

相同之处：都是 react 函数式组件用来处理副作用的方法；2：用法一致，都是两个参数，一是回调函数，二依赖数组；

不同之处：使用场景不同，useEffect 是在 浏览器绘制之后异步执行，useLayoutEffect 则是同步执行；

## 14. React有哪些性能优化的方法？

从三个反面入手

1. 减少计算的量。 -> 对应到 React 中就是减少渲染的节点 或者 降低组件渲染的复杂度
2. 利用缓存。-> 对应到 React 中就是如何避免重新渲染，利用函数式编程的 memo 方式来避免组件重新渲染
3. 精确重新计算的范围,尽量降低渲染范围.

虚拟列表, 惰性渲染，避免多次渲染，避免无用的渲染，


## 15. 什么是虚拟 DOM
虚拟DOM（VDOM）它是真实DOM的内存表示,一种编程概念，一种模式。它会和真实的DOM同步，比如通过ReactDOM这种库，这个同步的过程叫做调和(reconcilation)。

虚拟DOM更多是一种模式，不是一种特定的技术。

## 16. 什么是高阶组件？
高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。基本上，这是从React的组成性质派生的一种模式，我们称它们为“纯”组件， 因为它们可以接受任何动态提供的子组件，但它们不会修改或复制其输入组件的任何行为


## 17. 如何解析jsx

调用 React.createElement()

## 18. react-fiber

更新过程：调用各个组件的生命周期函数，计算和比对Virtual DOM，最后更新DOM树

将原本更新流程操作分割成一个个小的任务（切片）去执行，每执行完一个切片任务后再把控制权交到 react的调度模块用用于执行更高优先级的任务；

// https://zhuanlan.zhihu.com/p/26027085
