/**
 *
 * Object.assign.js
 * */

/**
 *
 * @param {object} target
 * @param {any} sources
 *
 * 返回一个浅拷贝的对象。
 *
 * target 不能是 null ｜ undefined
 *
 * @return object
 * */
function _assign(target, ...sources) {
  if (target === null || target === undefined) {
    throw TypeError('Cannot convert undefined or null to object')
  }

  target = Object(target)

  if (!sources || sources.length <= 0) {
    return target
  }

  while (sources.length) {
    const data = sources[0]

    for (const key in data) {
      if (data[key]) {
        // 当前key值是否可枚举
        if (Object.hasOwn(data, key)) {
          target[key] = data[key]
        }
      }
    }

    sources.splice(0, 1)
  }

  return target
}

const obj1 = { a: 1 },
  obj2 = { b: 2 },
  obj3 = { c: 3 }

const t = Symbol(3242234)

const newData = _assign(
  t,
  () => {
    console.log(45)
  },
  obj1,
  obj2,
  obj3
)

console.log(newData)

console.log(newData.a)
