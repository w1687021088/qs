##  React 实现原理的理解

日常开发web应用中用到的最多的就是React架构，这段时间来整理下React 的实现原理（较浅）；

### 首先了解下什么是React

1. `React` 是一个用于构建用户界面的 `JavaScript` 库。 它由 `Facebook` 开发，并且已经成为构建`大规模`、`可重用`、`高性能`的 `Web` 应用程序的首选工具之一;


2. `React` 采用 `JSX`的语法来座位它的开发方式；`JSX（JavaScript XML）`是一种 `JavaScript语法`扩展，用于在`React`中描述`UI组件`的结构和内容。它允许您在`JavaScript`代码中编写类似`HTML`的标记；


3. `React` 中更新视图的方式只能通过 `setState` 方法修改 `state` 来驱动 `视图UI` 的变化更新；


4. `React` 强调`单向数据流（One-way Data Binding）`。`数据流`从父组件向子组件`单向传递`，子组件无法直接修改父组件的数据，只能通过回调函数向父组件发送消息。这种数据流的设计使得应用程序的数据流动更加`可控`和`可预测`，方便`调试`和`维护`；

5. `React` 组件化思路；


6. `React` 组件具有`生命周期`方法，在`class组件`中这些方法允许开发者在组件的不同阶段执行特定的操作。例如，组件被创建时会触发 `componentDidMount` 方法，组件被销毁时会触发 `componentWillUnmount` 方法。`生命周期`方法可以用于处理组件的`初始化`、`数据获取`、`状态更新`等操作，在`React16`开始之后比较推崇`函数组件`的方式，同样具备可以在`class组件`生命周期需要的执行操作,代码量可以减少；

以上基本对React架构的一个总结，其中的第三点还是需要了解下

---

react 和 vue 都是基于 vdom 的前端框架

## React 更新

`React` 作为一个响应式框架，实现更新视图的过程中有一个叫做 `虚拟DOM（Virtual DOM）` 的概念，它是为了提高页面渲染性能而引入的一种机制。

### `vdom(虚拟DOM)`

虚拟DOM是一个轻量级的JavaScript对象，它和真实的DOM节点具有相似的结构，并且可以描述整个DOM树的结构、属性、事件等信息。

#### vdom就是用 JS 对象

```js
{
    type: 'div',
    props: {
        id: 'aaa',
        className: ['bbb', 'ccc'],
        onClick: function() {}
    },
    children: []
}
```

#### vdom的好处

- 可以避免直接操作大量真实的DOM节点，而是在虚拟DOM上进行操作；
- 可以在比的平台上渲染比如 `native`、`canvas` `nodejs` 等等;

### `render`(渲染)


### `commit`(提交阶段)

