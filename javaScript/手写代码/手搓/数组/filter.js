const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]

Array.prototype._filter = function (callback, thisArg) {
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
      const result = callback.call(thisArg, source[index], index, source)

      result && list.push(source[index])
    }
    index++
  }
}

const list = data._filter((item, index) => {
  console.log(item, index)

  return item > 4
})

console.log(list)
