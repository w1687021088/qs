/**
 *
 * create
 *
 * 创建一个对象，并将传入的对象作为这个对象的原型。
 *
 * */

/**
 *
 * @param {object | null} object
 *
 * @return {object}
 *
 * 思路：
 *  创建一个对象。
 *  该对象的原型指向传入的参数。通过 Reflect.setPrototypeOf设置对象的原型。
 *
 * */
function _create(object) {
  if (typeof object === 'object' || typeof object === 'function') {
    const data = {}

    Reflect.setPrototypeOf(data, object)

    return data
  }
  throw 'Object prototype may only be an Object or null: ' + object
}

const data = {
  name: 'data'
}

const objectCreateData = Object.create(data)

console.log(Reflect.getPrototypeOf(objectCreateData) === data, objectCreateData.name)

const customObjectCreateData = _create(data)

console.log(Reflect.getPrototypeOf(customObjectCreateData) === data, customObjectCreateData.name)
