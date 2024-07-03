https://zhuanlan.zhihu.com/p/670914853

https://github.com/lecepin/blog/blob/main/create-react-app%20%E4%BD%BF%E7%94%A8%E4%BB%A3%E7%90%86%E5%81%9A%20mock.md

https://dev.to/abhijitdotsharma/production-essentials-logging-in-nextjs-13-43l0

## react-Fiber架构

Fiber 是 React 16.8开始加入的一种新的架构，旨在解决旧的核心算法机制；

运行机制：就是一种让出机制，可以让出线程给到浏览器处理其他的任务；

数据：就是一种链表数据结构；


## fiber 解决之前的渲染问题

之前的渲染方式是通过递归渲染的方式创建虚拟 DOM 结构，一旦开始创建将无可中断。

而为了解决该为题：

### 任务分片：
将一个大块的渲染任务分成多个小的任务；

### 动态任务优先级：

允许 React 通过跟踪当前状态并不断调整确定调整任务的优先等级；

### 可中断渲染：

React 将可以在渲染过程中被暂停，将任务挂起等待下次浏览器空闲时执行；


## Fiber是怎么做到让出控制权

react-Fiber 在处理一个大块的渲染任务是会分成多个小块，然后分批处理任务，并在每一批任务间让出主线程给到浏览器去执行其他昂贵的渲染或者用户交互事件


React Fiber 使用让出控制权的技术来提高 UI 渲染的性能，但这并不意味着它会一直让出控制权。当浏览器可用的 CPU 资源充足时，React Fiber 可以继续执行任务而不让出控制权，以便尽快完成 UI 渲染。
