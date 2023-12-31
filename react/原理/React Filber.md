# `React Filber`

React 新的一种协调机制，它重新实现了React的调度算法，旨在帮助React提高性能，增强用户体验。

传统的 `React` 调度算法是基于递归的，通过递归地比较`虚拟 DOM` 树来更新实际 `DOM`。这种方式在大型应用中可能会导致性能问题，因为`递归算法`可能会`阻塞主线程`，导致用户界面`卡顿`。此外，在执行完整的`渲染`之前，无法`中断`或`恢复` `渲染过程`，这可能会导致应用无响应。

`React Fiber` 的目标是解决这些问题。它将渲染过程划分为可中断的单元，允许在执行期间中断和恢复渲染过程，从而实现更好的用户体验。以下是 `React Fiber` 的一些关键特点：

1. `异步`： `React Fiber` 支持`异步渲染`，使得渲染过程可以被`中断`和`恢复`。它使用了浏览器的 `requestIdleCallback` API 或者 `MessageChannel` API 来分解渲染任务，并在主线程空闲时执行任务片段。这样可以确保应用的渲染不会阻塞主线程，提高了用户界面的流畅性和响应性。
2. `优先级`： React Fiber 引入了`任务优先级`的概念，允许开发者根据任务的紧急程度为任务分配不同的`优先级`。这使得 React 能够优先处理高`优先级`的任务，例如`用户交互`和`动画`，从而提供更好的`用户体验`。
   - `Immediate`: 最高优先级，会马上执行的不能中断

   - `UserBlocking`: 这一般是用户交互的结果，需要及时反馈

   - `Normal`: 普通等级的，比如网络请求等不需要用户立即感受到变化的

   - `Low`: 低优先级的，这种任务可以延后，但最后始终是要执行的

   - `Idle`: 最低等级的任务，可以被无限延迟的，比如 console.log()

3. `渲染`： React Fiber 将渲染过程划分为不同的阶段（phases），并使用`协调器（reconciler）`来管理这些阶段。这样可以更好地控制渲染的流程和优先级。React Fiber 的渲染阶段包括` Reconciliation（协调）`、`Commit（提交）`和其他几个阶段，每个阶段都有不同的`任务`和`优先级`。
4. `渐进式渲染`： `React Fiber` 的渲染过程是可`中断`的，它可以逐步完成整个渲染过程。这使得 React 能够更好地处理大型应用和复杂组件树，可以在多个帧中逐步完成渲染，从而提高应用的响应速度。


#### React Fiber 是一个重新实现了调度算法的 React 版本，旨在提高性能和用户体验。它通过异步渲染、优先级和渐进式渲染等特性，使得 React 能够更好地处理复杂应用程序和交互式场景，并提供更流畅、更高效的用户界面。

---

## `Scheduler(调度器)`

负责找出优先级最高的任务。

## `Filber Reconciler(协调器)`

负责找出变化的组件（从递归遍历变成可中断循环）

## `Renderer(渲染)`

负责将变更的组件渲染到页面上。

## 当前是否有高优先级的任务

JS 无法判断，而是按帧的时间，如果一帧内任务还没执行完，就中断当前任务，把控制权交给浏览器

## 浏览器一帧内要做哪些事情

比如布局(`layout`)、绘制(`paint`)、`JS 的执行`、处理`用户输入事件`、`requestAnimation` 调用等，如果在一帧内处理完了这些剩余时间就用来执行 `requetIdleCallback`，直到下一帧开始

## 浏览器什么时候才有空
每秒`60帧`算，每帧就是 `1000/60 = 16.7ms` 差不多，每帧任务执行完会调 `requetIdleCallback(callback)`，并且在 `callback` 中会有一个参数告诉我们当前帧还有多少时间给我们`执行任务`


## React 优先级

  - `Immediate`: 最高优先级，会马上执行的不能中断

  - `UserBlocking`: 这一般是用户交互的结果，需要及时反馈

  - `Normal`: 普通等级的，比如网络请求等不需要用户立即感受到变化的

  - `Low`: 低优先级的，这种任务可以延后，但最后始终是要执行的

  - `Idle`: 最低等级的任务，可以被无限延迟的，比如 console.log()
