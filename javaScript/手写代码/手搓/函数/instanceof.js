/**
 *
 * instanceof
 *
 * 可以正确判断对象的类型。
 *
 * 其内部运行机制是判断在其原型链中能否找到该类型的原型。
 *
 * 而不能判断基本数据类型。
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
function _instanceof(variable, constructor) {
  // 条件1: 右侧是一个构造函数。
  if (constructor && typeof constructor !== 'function') {
    throw `
    -------------  error  -------------
    +++++++++++++ message +++++++++++++
    constructor 不是一个构造函数, instanceof 方法中，constructor 必须是一个构造函数
    +++++++++++++ message +++++++++++++
    -------------  error  -------------
    `
  }

  // 过滤调数据类型不是对象或者函数
  if (variable && (typeof variable === 'object' || typeof variable === 'function')) {
    // 获取原型
    const proto = Reflect.getPrototypeOf(variable) // variable.__proto__

    // 条件2:被检测的左侧数据类型的原型是否出现在右侧构造函数的原型链上

    // 如果当前原型不等与构造函数的原型，则在实例对象的原型链上寻找
    return proto === constructor.prototype || _instanceof(proto, constructor)
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
    console.log(_instanceof(cart, Object))

    console.log(cart instanceof Object)
  } catch (e) {
    console.log(e)
  }
}

run()
