// 输出数组排序， 并且支持从某个下标开始

// [2,1,3] => [1,2,3]

// 利用递归方式

function sort(list, index = 0) {
  if (list.length <= 1) {
    return list
  }
  const left = []

  const right = []

  const start = list.splice(index, 1)[0]

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (item > start) {
      right.push(item)
    } else {
      left.push(item)
    }
  }

  return [...sort(left), start, ...sort(right)]
}

const start = performance.now()

const data = sort([
  4, 6, 44, 31, 23, 7, 8, 90, 43, 32, 4, 5, 5, 76, 43, 4, 4, 3, 234, 3, 72, 3, 2, 13, 2, 2, 5, 79, 80, 65, 433, 5, 2, 1, 0, 4, 6, 44, 31, 23, 7, 8, 90, 43, 32,
  4, 5, 5, 76, 4344, 3, 234, 3, 72, 3, 2, 13, 2, 25, 79, 80, 65, 4, 33, 5, 2, 1, 0, 4, 6, 44, 31, 23, 7, 8, 90, 43, 32, 4, 5, 5, 76, 434, 43, 234, 3, 72, 3, 2,
  13, 22, 5, 79, 80, 65, 433, 5, 2, 1, 0
])

console.log(performance.now() - start)

console.log(data)
