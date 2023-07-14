const data = [1, 1, 1, 2, 2, 2, undefined]

Array.prototype._map = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  let index = 0

  const list = []

  const source = Object(this)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (index > this.length) {
      return list
    }

    if (index in source) {
      list.push(callback.call(thisArg, source[index], index, source))
    }
    index++
  }
}

console.log(
  data._map(item => {
    return item || 0
  })
)
