/**
 *
 * forEach
 *
 * @param {(value: T, index: number, array: T[]) => void} callback
 * @param {any} thisArg
 * */
Array.prototype._forEach = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }

  for (let index = 0; index < this.length; index++) {
    callback.call(thisArg, this[index], index, this)
  }
}

const list = [1, 2, 3]

// arg.add(list)

list._forEach((item, index, list) => {
  console.log(item, index, list)
})
