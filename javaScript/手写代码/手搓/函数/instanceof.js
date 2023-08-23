/**
 *
 * instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
 *
 * */

/**
 *
 * @param {any} variable 实例对象
 *
 * @param {ObjectConstructor | FunctionConstructor | StringConstructor | BooleanConstructor | NumberConstructor | ArrayConstructor | SetConstructor | MapConstructor} constructor 构造函数
 *
 * @return {boolean}
 *
 * 思路：
 *  条件1:instanceof左侧接收任意类型，右侧是一个构造函数。
 *
 *  条件2:被检测的左侧数据类型的原型是否出现在右侧构造函数的原型链上。
 *
 *  条件3:左侧数据类型如果是基础数据类型，直接返回false。
 *
 * */
function $instanceof(variable, constructor) {
  // 条件1: 右侧是一个构造函数。
  if (typeof constructor !== 'function') {
    throw TypeError(`
    -------------  error  -------------
    +++++++++++++ message +++++++++++++
    constructor ${constructor} 不是一个构造函数, instanceof 方法中，constructor 必须是一个构造函数
    +++++++++++++ message +++++++++++++
    -------------  error  -------------
    `)
  }

  // 过滤调数据类型不是对象或者函数
  if (variable && (typeof variable === 'object' || typeof variable === 'function')) {
    // 获取原型
    const proto = Reflect.getPrototypeOf(variable) // variable.__proto__

    // 条件2:被检测的左侧数据类型的原型是否出现在右侧构造函数的原型链上

    // 如果当前原型不等与构造函数的原型，则在实例对象的原型链上寻找
    return proto === constructor.prototype || $instanceof(proto, constructor)
  }

  // 条件3:左侧数据类型如果是基础数据类型，直接返回 false。
  return false
}

class Cart {
  constructor() {
    this.name = 'cart'
  }
}

const cart = new Cart()

function run() {
  try {
    console.log($instanceof(cart, Cart))

    console.log(cart instanceof Cart)
  } catch (e) {
    console.log(e)
  }
}

run()
