/**
 *
 *
 * */
Array.prototype._reduce = function (callback, ...args) {
  if (this === null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  const source = Object(this)

  const length = source.length >>> 0

  // initialValue 参数
  const initialValue = args[0]

  // 设置 previousValue 初始值
  let previousValue = args.length ? initialValue : source[0]

  let index = 0

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (index >= length) {
      return previousValue
    }

    if (index in source) {
      previousValue = callback(previousValue, source[index], index, source)
    }

    index++
  }
}

const data = [1]

console.log(
  data._reduce((previousValue, currentValue, currentIndex, array) => {
    console.log(previousValue, currentValue, currentIndex, array)

    return previousValue + currentValue
  }, 0)
)
