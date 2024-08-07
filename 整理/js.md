## 尾递归

尾递归，即在函数尾位置调用自身（或是一个尾调用本身的其他函数等等）。尾递归也是递归的一种特殊情形。即在尾部直接调用自身的递归函数

---

## js函数有哪几种声明方式？有什么区别？

有 表达式 和 声明式 两种函数声明方式

声明式: function， 意味着函数提升，在当前作用域内可以在任意位置调用

```js

function fc() {}

```

表达式：var let const，不会函数提升，调用必须在函数声明之后调用；

```js

const fc = function () {}

```

---

---
## 如何判断某个字符串长度（要求支持表情）？

```js

'哈哈😄123'.length // 7


console.log([...'哈哈😄123'].length); // 6


```
---

## 普通函数与箭头函数的区别

箭头函数无 this 对象，函数内部使用 this 时指的是其当前词法环境，并且在执行函数时无法更改 this 指向；

箭头函数没有 arguments 形参；

箭头函数当做 ES6 之前的构造函数使用；

---

## ToPrimitive 的理解

ToPrimitive 是一个抽象操作，用于将一个值转换为原始值（primitive value），即字符串、数字或布尔值

---

## tree shaking如何工作的呢？

Tree shaking 代码优化方案，旨在删除模块代码中未使用到的代码，减小项目体积大小；

工作原理：

ES6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块;

静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码；

备注： commonjs 是动态的，无法知道哪些模块在运行前需不需要；Es6 import 可以，因为它是静态的

--- 
## 如何确保你的构造函数只能被new调用，而不能被普通调用？


可以通过 instanceof
```js
if (!(this instanceof XX)) {
    throw '....'
} 

```

es6 new.target

```js
function Person() {
    console.log(new.target);
}
// new: Person {}
console.log("new: ",new Person())
// not new: undefined
console.log("not new:", Person())
```

---

## 12. 什么是作用域链？

作用域指的是变量和函数在代码中的可访问范围。在 JavaScript 中，作用域可以分为两种类型：

全局作用域（Global Scope）：

位于最顶层，包含了在整个代码中都可以访问的变量和函数。

局部作用域（Local Scope）：

由函数、块语句（如 if、for）等创建，包含了在特定区域内可访问的变量和函数。

当在Javascript中使用一个变量的时候，首先Javascript引擎会尝试在当前作用域下去寻找该变量，如果没找到，再到它的上层作用域寻找，以此类推直到找到该变量或是已经到了全局作用域

如果在全局作用域里仍然找不到该变量，它就会在全局范围内隐式声明该变量(非严格模式下)或是直接报错

---


## 13. 事件循环

1. js 是单线程的，代码从上往下运行
2. 代码分为：同步、异步；先同步、后异步
3. 异步分为：宏任务、微任务； 先宏任务、后微任务（注意：全局 Script 算一个宏任务）
4. 每当运行一段同步代码时，都会将代码压入调用栈中，等代码执行完毕以后出栈，当调用栈为空时，对于这两个任务队列的检测情况步骤如下：
5. 检测微任务队列是否为空，若不为空则取第一个进栈执行，执行结束后接着重复此步骤，若为空，则本轮事件循环结束，接着下一个任务（宏任务检测）；
6. 检测宏任务队列是否为空，若不为空则取第一个进栈执行，然后按步骤 5 处理，若为空，则直接执行第一步骤；

ui render 将在一轮循环事件结束之后，期间如果有 requestAnimationFrame 函数方法，将先调用该方法，在进行 UI render；

而 requestIdleCallback 调用将先检查 ui render 是否要结束，如果距离下一帧还有剩余事件的话就执行，如果时间不够将在下一帧执行；


微任务 - 宏任务

调用栈 -> 首先执行同步代码，执行完成后出栈，检测任务队列（宏任务队列，微任务队列），

宏任务队列，微任务队列，


首次： script 是个宏任务，初始微任务队列为空，宏任务队列只有一个 script；

js 引擎开始执行代码，宏任务取第一个压入调用栈执行，同步代码执行，异步代码分为宏任务加入宏任务队列，微任务加入微任务队列；



宏任务：

script, setInterval, setTimeout, UI renderer

微任务：

promise.then promise.catch

---

## 14. 执行上下文

执行上下文是在代码执行过程中创建的抽象环境概念，它包含了代码执行所需的所有信息，比如变量、函数、对象的引用以及作用域链等。每当 JavaScript 代码被执行，就会创建一个执行上下文。

全局执行上下文（Global Execution Context）：

整个脚本或模块的默认执行上下文，位于最顶层，拥有全局变量和全局函数。

函数执行上下文（Function Execution Context）：

每当函数被调用时，都会创建一个对应的函数执行上下文，用于保存函数的局部变量、参数和函数内部的声明。

Eval 函数执行上下文（Eval Function Execution Context）：

与 eval 函数相关的执行上下文，不推荐使用 eval，因为它会导致作用域问题。

执行栈

执行栈指的是用来存储 js 代码运行时所创建的所有执行上下文环境；

当 js 引擎首先运行 js 代码时，创建全局执行上下文，并压入执行栈中；

同样每当遇到函数执行时，也会为它创建函数执行上下文压入执行栈；

执行栈优先从栈顶部开始，当顶部的上下文环境执行结束，执行上下文冲栈中弹出，控制流程交到当前执行栈的下一个上下文中，直到结束；

---

## 15. 堆栈

内存场景：

栈内存：

用于存储原始数据类型，以及引用数据类型的指针；

每个方法执行时，都会创建自己的内存栈，方法内创建的变量将逐个存储到内存栈中，等到方法执行结束，则内存栈销毁（闭包除外，如果闭包用了内存栈的变量时，则闭包将会把内存栈的数据保存下来，一直等待闭包结束）

堆内存：

用于存储引用数据类型的值(地址)；

当在程序中创建一个对象，这个对象将存储在堆内存中用来程序反复利用，如果改对象被别的方法使用时，并不会随着方法执行结束而销毁，会在程序停止引用该对象后才会被垃圾回收机制将在某个时期内回收该内存；

数据场景：

栈：

有序的数据结构， 先进后出的表现方式；

堆：

无序的数据结构，key-value 方式；

队列：

队列的特点就是先进先出，数据存储从尾部插入，头部取出；

---

## 16. JS 实现继承有哪些方式

## 17. 数组去重都有哪些方式

## 18. new 的过程发生了什么

1. 创建一个空对象：创建一个新的空对象，该对象将成为实例化后的对象

2. 将构造函数的原型连接到对象：将新创建的对象的原型（`__proto__`）指向构造函数的原型对象(`prototype`)，通过原型链实现继承

3. 执行构造函数

4. 返回对象

## 19. 数组有什么操作方法
[方法](../2024/javascript/代码题/array/方法.md)
