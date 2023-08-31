## 1. 响应式及原理

响应式是一种面向数据流与变化传播的声明式编程范式。
这意味着可以在编程语言中很方便地表达静态或动态的数据流，而相关的计算模型会自动将变化的值通过数据流进行传播。

### Vue2

Vue2的响应式是基于`Object.defineProperty`

tips：
```js

function reavtive(data, key, value) {
   Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
        console.log('访问')
        return value
    },
    set: function(newValue) {
        console.log('设置', newValue)
        value = newValue
    }
}) 
}

var list = [13]

reavtive(list, Object.keys(list)[0], Object.values(list)[0])

console.log(list[0]); // 13

list[0] = 12 // // 设置

// 所以说该方法也是可以监听到数组已有的参数变化。

// 作者给出 vue 为什么没有使用的原因是基于性能上的考虑。

```

### vue3 

Vue3的响应式基于 `Proxy`



---

## 2. 通信方式

vuex

props 透传

v-modal

自定义事件 // defineEmits emits

依赖注入 provide/inject

---

## 3. Vue2 和 Vue3 有什么区别

vue3 引入了 Composition API

多根组件

引入了 Teleport（传送）

响应式系统升级

编译优化

源码体积优化

打包优化

---
## 4. Vue2 相比 Vue3 有什么缺点

---
## 5. 虚拟 dom 是什么，为什么要使用虚拟 dom


---
