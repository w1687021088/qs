/**
 * new操作符创建一个实例对象。
 *
 * 该实例对象的构造函数中this上下文指向该实例对象。
 *
 * 实例对象的隐式原型的指针指向该构造函数的prototype。
 *
 * */

function Foo(name) {
  this.name = name
}

Foo.prototype.getAge = function () {
  return 28
}

const foo = new Foo('张张')

/**
 *
 *
 * 手写模拟实现new操作符的实现
 *
 *
 * */

function _new(_function, ...ages) {
  if (typeof _function !== 'function') {
    throw '_function 不是一个构造函数'
  }

  const $object = Object.create(_function.prototype)

  // 执行构造函数，并将this上下文指向该构造函数
  const value = _function.apply($object, ages)

  // 如果函数有返回类型是对象时，在构造函数中如果返回一个对象类型，则将覆盖原有在构造函数定义的属性。
  return value instanceof Object ? value : $object
}

const foe = _new(Foo, '李李')

console.log('isFoo: ', foo instanceof Foo, 'name: ', foo.name, 'age: ', foo.getAge()) // isFoo: true name: 张张 age: 28

console.log('--------------------')
console.log('--------------------')

console.log('isFoo: ', foe instanceof Foo, 'name: ', foe.name, 'age: ', foe.getAge()) // isFoo: true name: 李李 age: 28
