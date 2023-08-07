##  在 javaScript 中， 什么是this

在 `JavaScript` 中 `this` 是关键字，用于指向当前函数执行的上下文；

另外，函数的上下文的指向并非固定，只有在函数被执行时才会确定上下文；


```js

(function () {
    var name = 'zjw'
    
    function x() {
        console.log(this)
    }
    
    x() // 执行时才确定 this 指向 window(浏览器运行，非严格模式)
})()

```

例子

```js
var obj = {
    name: 'zjw'
    foo: function () {
        console.log(this.name)
    }
}


obj.foo() // this 指向 obj


var foo = obj.foo


foo() // this指向 window


(false || obj.foo)() // this --> window

```

箭头函数
```js
var obj = {
    c: function () {
        return this
    },
    f: () => this,
    b: function () {
        return () => this
    },
    v: function () {
        var x = () => this
        
        return x
    }
}

```
