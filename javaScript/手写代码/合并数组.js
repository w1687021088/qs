/**
 *
 * 输入为一维数组，将这多个数组合并，去重，不要求排序，返回一维数组
 *
 * */
function deal(...args) {
  return Array.from(new Set([...args].flat()))
}

console.log(deal([1, 2, 3], [0, 3, 4, 5], [5, 6, 7, 8], [4, 5, 6]))

/**
 *
 * 要求排序
 *
 * */
function deal2(...args) {
  return Array.from(new Set([...args].flat())).sort((a, b) => a - b)
}

console.log(deal2([1, 2, 3], [0, 3, 4, 5], [5, 6, 7, 8], [4, 5, 6]))
