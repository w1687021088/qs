/**
 *
 * @param {any} target
 *
 * TODO: 待完善第二参数，和第三个参数
 * */
function _stringify(target) {
  const protoType = Object.prototype.toString.call(target)

  const empty = ['[object Symbol]', '[object Undefined]', '[object Function]']

  if (typeof target === 'bigint') {
    throw TypeError('Do not know how to serialize a BigInt')
  }

  if (empty.includes(protoType)) {
    return undefined
  }

  // 字符串类型
  if (protoType === '[object String]') {
    return `"${target}"`
  }

  // 数字类型
  if (protoType === '[object Number]') {
    return String(target)
  }

  // 布尔值类型
  if (protoType === '[object Boolean]') {
    return String(target)
  }

  // null
  if (protoType === '[object Null]') {
    return String(null)
  }

  // 时间对象
  if (protoType === '[object Date]') {
    return `"${target.toJSON()}"`
  }

  // 数组
  if (protoType === '[object Array]') {
    return `[${target.reduce(
      (pre, cur) => (pre === '' ? pre : pre + ',') + (empty.includes(Object.prototype.toString.call(cur)) ? _stringify(null) : _stringify(cur)),
      ''
    )}]`
  }

  // null
  if (protoType === '[object Object]') {
    return `{${Object.keys(target).reduce((pre, cur) => {
      const proto = Object.prototype.toString.call(target[cur])

      const last = pre === '' ? pre : pre + ','

      if (!empty.includes(proto)) {
        return `${last}"${cur}":${_stringify(target[cur])}`
      }

      return `${last}`
    }, '')}}`
  }

  if (typeof target === 'object') {
    return '{}'
  }

  return target
}

const s = {
  undef: undefined,
  func: () => true,
  symbol: Symbol(),
  nu: null,
  number: 3,
  string: '12',
  _set: new Set(),
  _map: new Set(),
  reg: new RegExp(/^[0-9]/),
  date: new Date(),
  promise: Promise.resolve(3),
  array: [
    new Set(),
    new Map(),
    Symbol(),
    undefined,
    null,
    '99',
    88,
    () => true,
    {
      undef: undefined,
      func: () => true,
      symbol: Symbol(),
      nu: null,
      number: 3,
      string: '12',
      _set: new Set(),
      _map: new Set(),
      reg: new RegExp(/^[0-9]/),
      date: new Date(),
      promise: Promise.resolve(3),
      array: [new Set(), new Map(), Symbol(), undefined, null, '99', 88, () => true]
    }
  ]
}

const str = JSON.stringify(s, null, 1)

const _str = _stringify(s)

console.log('Hello World\r\n\t2021')
//
// console.log(typeof _str, _str === str)
