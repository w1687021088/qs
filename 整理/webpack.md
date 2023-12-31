## 1.webpack5 模块联邦的了解？

Webpack 5 的模块联邦（Module Federation）是一种新的技术，可以实现多个独立 Webpack 构建之间的共享模块和代码。它通过让每个构建的应用程序能够使用其他应用程序中的模块来提高代码共享和复用的效率

Module Federation 的主要优势包括：

多个应用程序之间可以共享代码和模块，从而减少重复代码量。
应用程序可以更加灵活地划分为更小的子应用程序，从而降低应用程序的复杂度。
可以避免在应用程序之间传递大量数据，从而提高应用程序的性能和效率。
可以支持应用程序的动态加载和升级，从而实现更好的版本管理和迭代。

---

## 2. common.js 和 es6 中模块引入的区别？

从这道题目我们可以很容易地引申出来另外一道“明星”面试题：common.js 和 es6 中模块引入的区别？

CommonJS 是一种模块规范，最初被应用于 Nodejs，成为 Nodejs 的模块规范。运行在浏览器端的 JavaScript 由于也缺少类似的规范，在 ES6 出来之前，前端也实现了一套相同的模块规范 (例如: AMD)，用来对前端模块进行管理。自 ES6 起，引入了一套新的 ES6 Module 规范，在语言标准的层面上实现了模块功能，而且实现得相当简单，有望成为浏览器和服务器通用的模块解决方案。但目前浏览器对 ES6 Module 兼容还不太好，我们平时在 Webpack 中使用的 export 和 import，会经过 Babel 转换为 CommonJS 规范。在使用上的差别主要有：

1、CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。

2、CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

3、CommonJs 是单个值导出，ES6 Module可以导出多个

4、CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层

5、CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined

---

## 3. tree shaking如何工作的呢？

Tree shaking 代码优化方案，旨在删除模块代码中未使用到的代码，减小项目体积大小；

工作原理：

ES6 Module引入进行静态分析，故而编译的时候正确判断到底加载了那些模块;

静态分析程序流，判断那些模块和变量未被使用或者引用，进而删除对应代码；

备注： commonjs 是动态的，无法知道哪些模块在运行前需不需要；Es6 import 可以，因为它是静态的

---
## 4.

---
## 5.

---
