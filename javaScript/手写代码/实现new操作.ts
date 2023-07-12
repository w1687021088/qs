/**
 *
 * 实现new操作
 *
 * */

/**
 *
 * 在javaScript 中 new 操作符干了什么事？
 *
 * 1. 在js语言中, 通过new操作符实现了在内存中创建一个对象。
 *
 * 2. 创建一个构造函数，该构造函数用于处理创建对象的的属性逻辑实现。
 *
 * 3. 构造函数中 this 的上下文指向新创建的对象。
 *
 * 4. 新对象的[[Prototype]]隐式原型赋值为构造函数的prototype属性。
 *
 * */

// 现实中 通过 new操作符创建对象
function Foo(name: string) {
  this.name = name
}

const _object = new Foo('张张')

console.log(_object) // {name: "张张"}

// 模拟new操作符

// 创建构造函数

function Fc(name: string) {
  this.name = name
}

Fc.prototype.getName = function () {
  return `name: ${this.name}`
}

// 模拟 new 操作
function _new(
  // 接收构造函数
  fc: (name: string) => void,
  // 构造函数参数
  ...args
) {
  // 创建新对象
  const _newObject = Object.create(fc.prototype)

  // 将 构造函数指向 新对象
  const values = fc.apply(_newObject, args)

  return values instanceof Object ? values : _newObject
}

const _obj = _new(Fc, '张张')

console.log(_obj.name) // '张张'

console.log(_obj.getName) // name: '张张'
