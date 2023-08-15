## 1.Vue3.0里为什么要用 Proxy API 替代 defineProperty API ？

defineProperty

检测不到对象属性的添加和删除
数组API方法无法监听到
需要对每个属性进行遍历监听，如果嵌套对象，需要深层监听，造成性能问题

Proxy的监听是针对一个对象的，那么对这个对象的所有操作会进入监听操作，这就完全可以代理所有属性

## Vue 3.0 性能提升主要是通过哪几方面体现的

1. 响应式系统提升：vue2.0 采用 Object.defineProperties 方式作为响应式的核心，劫持整个对象，并进行深层次遍历，给每个属性添加 getter / setter； vue3.0 采用 Proxy 来代替 Object.defineProperties的响应式方案，通过代理拦截对象的属性访问、修改、添加和删除等以及使用 Reflect（反射）对代理的源对象操作；

   * 可以监听动态新增的属性；

   * 可以监听删除的属性；

   * 可以监听数组的索引和 length 属性


2. 编译优化：优化编译和重写虚拟dom，让首次渲染和更新dom性能有更大的提升 vue2 通过标记静态根节点,优化 diff 算法 vue3 标记和提升所有静态根节点,diff 的时候只比较动态节点内容

3. 源码体积的优化：ue3移除了一些不常用的api，例如：inline-template、filter等 使用tree-shaking

## 双向绑定实现原理

当一个Vue实例创建时，Vue会遍历data选项的属性，用 Object.defineProperty 将它们转为 getter/setter并且在内部追踪相关依赖，在属性被访问和修改时通知变化。每个组件实例都有相应的 watcher 程序实例，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher重新计算，从而致使它关联的组件得以更新。

