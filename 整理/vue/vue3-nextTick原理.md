## nextTicket用来干什么的

nextTicket 是 vue 提供的一个异步工具函数，用于在下一次 DOM 更新结束后执行的回调函数，它基于 javaScript 的事件循环机制，以及宏任务与微任务的调度。

## nextTicket怎么实现的

v3 通过 Promise.resolve().then() 实现；

v2 也是 promise，如果不兼容则使用 MutationObserver；

## nextTicket在什么时候执行

nextTicket会将回调函数添加到异步队列的微任务队列中，等待当前任务结束后依次执行微任务队列。

## 原理

1. vue 在更新过程中是异步的，当数据发送变化是，视图并未立即更改，vue 会将更新任务加入到一个队列中；
2. nextTicket 利用 javaScript 的事件循环机制，将回调函数加入到异步任务中的微任务队列；
3. 然后等待当前任务执行结束，javaScript 引擎将执行微任务队列中的任务并包括加入到微任务的nextTicket回调函数。

---


vue3 源码实现方式

```ts
import { SchedulerJob } from './scheduler';

const queue: SchedulerJob[] = [];
let flushIndex = 0;
let pending = false;

function nextTick(flushCallbacks?: any, ctx?: any) {
  const job: SchedulerJob = () => {
    try {
      flushCallbacks.call(ctx);
    } catch (e) {
      // 错误处理
    }
  };

  if (!pending) {
    pending = true;
    queue.push(job);

    queueFlush();
  }
}

function queueFlush() {
  if (!pending) {
    return;
  }
  // 使用微任务调度
  Promise.resolve().then(flushJobs);
}

function flushJobs() {
  pending = false;
  const currentQueue = queue.slice();
  queue.length = 0;
  for (flushIndex = 0; flushIndex < currentQueue.length; flushIndex++) {
    currentQueue[flushIndex]();
  }
  flushIndex = 0;
}

export { nextTick };
```

---
