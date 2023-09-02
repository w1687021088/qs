## 什么是响应式

响应式是一种面向数据流与变化传播的声明式编程范式。 

在编程语言中很方便地表达静态或动态的数据流，而相关的计算模型会自动将变化的值通过数据流进行传播。

## 响应式原理

响应式是一种面向数据流与数据变化传播的声明式编程范式，通过检测数据流的变化，触发与之相关的计算模型变更。

响应式原理是Vue的核心特性之一，数据驱动视图，修改数据与之相关的视图将响应更新。

v2 与 v3 的响应式有实现的区别；

v2 采用 Object.definedPrototype API实现，

v3 采用 Proxy API（reactive） 和 getter/setter(ref)自定义方法处理响应式。

但本质上的原理差不多，都是通过代理对象或者劫持对象下属性的方式实现，通过 getter 操作时“收集依赖”，setter 操作是“触发依赖”。
### ref
ref 通过 `createRef` 函数返回 `RefImpl` 类， RefImpl构造函数 `get value` 收集依赖，`set value` 触发依赖;

ref 用于处理 `Proxy` 无法代理对象之外的基础数据类型数据，如果接收的是对象类型参数则调用 toReactive方法通过Proxy 代理对象；


`trackRefValue`：收集依赖

`triggerRefValue`: 更新依赖

```ts

// 拦截 getter器 属性访问时触发
get value() {
    // 在我们进行.value 操作时， 触发trackRefValue(this) 进行依赖收集
    trackRefValue(this)
    // 返回 原始值/proxy 代理对象
    return this._value
}
// setter 拦截器 属性改变时触发
set value(newVal) {
    // useDirectValue 判断是否使用原始值（不需要响应式的标识）以下3种 使用原始值
    // 1. 入参 __v_isShalloww 值为true
    // 2. isShallow 新增是浅层ref
    // 3. 新值是只读
    const useDirectValue =
        this.__v_isShallow || isShallow(newVal) || isReadonly(newVal)
    newVal = useDirectValue ? newVal : toRaw(newVal)
    if (hasChanged(newVal, this._rawValue)) {
        // 如果 新值和旧值 发生了改变， 跟新旧值
        this._rawValue = newVal
        // 设置 value 值，需要使用原始值，则直接用newVal,否则转Proxy
        this._value = useDirectValue ? newVal : toReactive(newVal)
        // 派发事件 响应式跟新
        triggerRefValue(this, newVal) // 在下面有详细介绍
    }
}
```

### reactive
reactive 通过 `createReactiveObject` 创建 `Proxy` 代理对象，内部处理`get`  收集依赖，`set`  触发依赖；

`track`： 收集依赖

`trigger`： 更新依赖

