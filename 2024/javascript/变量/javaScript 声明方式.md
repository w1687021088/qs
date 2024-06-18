# javaScript中声明的方式

## var

var定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。


var定义的方式可以说是灵活也可以说是 js 最初设计的缺陷。

1. 可访问，可修改；
2. 可以覆盖原先已经申明的词法变量；
3. 可变量提升；


跨块访问

```js

for (var i = 0; i < 10; i++) {}


console.log(i); // 10 变量 i 没有被销毁

```

变量覆盖


```js

var a = 10

function foo() {
    console.log(a); // undefined
    
    
    var a = 11 // a 变量提升

    console.log(a); // 11
}


foo()

```


## let

let 定义 JavaScript 的变量。

1. 块作用域；
2. 能访问，也能修改；
3. 已定义的词法变量无法二次被使用申明；



## const

用于定义 JavaScript 的常量。

1. 块作用域；
2. 只能访问，无法被修改；
3. 已定义的词法变量无法二次被使用申明；




