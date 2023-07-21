什么是JavaScript 原型

什么是JavaScript 原型琏

什么是构造函数?

---

了解原型之前，先看下js 的数据类型。

1. 原始类型（`Primitive Types`）：

 - 布尔值（`Boolean`）：表示真或假，只有两个值：true 和 false。
- 数字（`Number`）：表示数字，包括整数和浮点数。
- 字符串（`String`）：表示文本。
- `null`：表示一个空值。
- `undefined`：表示一个未定义的值。
- `Symbol`：表示唯一的标识符。 

2. 复合类型（`Composite Types`）：

- 对象（`Object`）：由键值对组成的集合，可以包含属性和方法。
- 数组（`Array`）：表示一组有序的值的集合。
- 函数（`Function`）：可执行的对象，可以包含可执行的代码块。

3. 特殊类型：

- `BigInt`：表示任意精度的整数，用于处理超过Number类型范围的大整数。

js中数据类型的创建方法

`string`

```js
var str = '字符串'

console.log(str); // '字符串'

// 也可以下面的创建方式

var _str = new String('字符串')

console.log(str); // '字符串'


// str 等价与 _str

```

上面的例子适用于所有的js类型（不包括 undefined 和 null）


```js

var _str = new String('字符串')

console.log(String); // ƒ String() { [native code] }

console.log(typeof String); //'function'

```



---

简答： 在 `JavaScript` 中 通过 `new` 操作符调用的函数称这为构造函数（**`箭头函数除外`**）。

```js
// Foo 函数称为 构造函数
function Foo() {
    
}

// foo 称为 构造函数对象实例
const foo = new Foo()
```

---

# 原型

在 JavaScript 中`function`天然拥有 `prototype`(`函数原型`) 属性.

```js
console.log(Foo.prototype); // { constructor: f }
```

## `prototype`(`函数原型`)`


`prototype`(`函数原型`) 属性下拥有 `constructor` 属性，它也是一个对象，它指向`构造函数`本身。

```js
function foo() {
    
}


console.log(foo.prototype.constructor === foo); // true 
```
---

解决问题： `prototype`是什么?

`prototype` 本质上也是一个对象，也可以称为(`函数原型`)。


```js
var obj_1 = {};

var obj_2 = new Object()

// obj_1 和 obj_2 是等价的。都是做一件事，创建 js对象数据类型并引用给变量。

var fun_1 = function () {}

var fun_2 = new Function()

// fun_1 和 fun_2 也是等价，同样创建 js函数


console.log(Object) // ƒ Object() { [native code] }

console.log(Function) // ƒ Function() { [native code] }

// Object 和 Function 都是函数，也可以称为构造函数。
```


## `__proto__`(`隐式原型`)

在js中对象类型被设计拥有 `__proto__`属性，而该属性称之为`隐式原型`。

```js
// 普通对象
var obj = {}

// obj.__proto__ => 对象

console.log(obj.__proto__ === Object.prototype); // true


// 字符串
var str = ''

console.log(str.__proto__ === String.prototype); // true

console.log(String.prototype.__proto__ === Object.prototype); // true

// 数组
var arr = []

console.log(arr.__proto__ === Array.prototype); // true

console.log(Array.prototype.__proto__ === Object.prototype); // true

// 布尔值
var bool = true

console.log(arr.__proto__ === Boolean.prototype); // true

console.log(Boolean.prototype.__proto__ === Object.prototype); // true


// 函数
var fnc = function () {}

console.log(fnc.__proto__ === Function.prototype); // true

console.log(Function.prototype.__proto__ === Object.prototype); // true

// 所有数据类型的隐式原型__proto__指向 Object.prototype

console.log(Object.prototype.__proto__) // null

// Object.prototype 隐式原型__proto__指向是 null

```

默认情况下, `__proto__` 指向创建它的`prototype`(`函数原型`);

---

# 原型链

```js
var obj = {}

obj.toString() // '[object Object]'

```
obj 本身没有 `toString` 方法，但是有`__proto__`属性，每个js类型都有该属性（不包括 `undefined` 和 `null`）；
obj.__proto__ 指向 指向创建它的`prototype`(`函数原型`) ==> Object.prototype

而 `Object.prototype` 拥有 `toString` 方法。

源于 js 的设计，当一个对象本身没有的属性时，它将首先在对象本身去找，找不到的时候指向它的原型去找，直到最终的`Object.prototype`的指向 `null`。

这就能理解为什么obj可以调用`toString`方法。

---

## 总结：

1. 每个数据类型都有`__proto__`属性（不包括 `undefined` 和 `null`），`__proto__`属性指向创建它们本身的构造函数 `prototype`。


2. 在js 中，每个`构造函数`都拥有一个 `prototype` 原型，它是一个普通的对象。而该这个 `prototype` 对象被用作`构造函数`的`原型`。可以在 `prototype` 对象上定义属性和方法，这些属性和方法将被`继承`到通过`构造函数`创建的对象上。


3. 所有`__proto__`属性最终都指向 `Object.prototype`,  `Object.prototype`指向 `null`。


4. 所有的数据类型（不包括 `undefined` 和 `null`）都可以通过`__proto__`属性拿到`构造函数 prototype 原型`下定义的`方法`或者`属性`, 如果当前`构造函数 prototype 原型`中并没有，则接着在`构造函数` 本身的 `prototype 原型` 下查找`prototype 原型`属性，直至到`null`。


在 JavaScript 中，函数对象是一种特殊的对象，它们除了具有普通对象的特性外，还具有一个额外的原型属性。这个原型属性指向一个对象，我们通常称之为原型对象（prototype object）。

当我们使用关键字 new 来调用一个函数时，JavaScript 引擎会创建一个新的对象，并将这个新对象的原型设置为该函数的原型对象。这样，新对象就可以继承原型对象上的属性和方法。

通过原型链，JavaScript 实现了对象之间的继承。每个对象都有一个隐藏的 __proto__ 属性，它指向该对象的原型对象。当我们访问一个对象的属性或方法时，如果对象本身没有这个属性或方法，JavaScript 引擎会通过 __proto__ 属性找到对象的原型对象，然后继续在原型对象上查找，直到找到对应的属性或方法，或者到达原型链的顶端。

原型链的顶端是 Object.prototype，它是所有对象的最终原型。它包含了一些常用的方法，例如 toString() 和 valueOf()。所有对象都继承了 Object.prototype 上的这些方法。
