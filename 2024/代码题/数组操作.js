/**
 * 多数组取交集
 *
 * 要取多个数组中的交集
 *
 * ([0,1,2,3], [2,3,4,5]) = [2, 3]
 *
 * 复杂度 O(n * m)
 *
 * @param {number[]} args
 * @param {number[]} firstList
 * @return {number[]}
 * */
function intersection(firstList, ...args) {
  return removeDuplicates(firstList).filter(v => args.every(b => b.includes(v)))
}

/**
 *
 * 数组去重
 *
 * 复杂度：O(n)
 *
 * @param {number[]} list
 *
 * @return {number[]}
 * */
function removeDuplicates(list) {
  return [...new Set(list)]
}

const s = ['H', 'a', 'n', 'n', 'a', 'h'] // ['h', 'e', 'l', 'l', 'o']

/**
 *
 * 时间复杂度: O(logn)
 *
 * 空间复杂度：O(1)
 *
 * 左右指针
 *
 * 左右指针是指在数组中使用两个指针，分别指向数组的第一个元素和最后一个元素，通过移动指针的位置到中间，直到相遇，从而解决问题。
 *
 * */
function reverse(arr) {
  let left = 0

  let right = arr.length - 1

  while (left <= right) {
    ;[arr[left], arr[right]] = [arr[right], arr[left]]
    left++

    right--
  }

  return arr
}

// console.log(reverse(s))

/**
 *
 * 快慢指针
 * */
const str01 = 'aaa'

function queryStringMaxLength(str) {
  const n = str.length

  let left = 0

  let right = -1

  const data = {}

  let maxLength = 0

  while (left < n) {
    const current = str[right + 1]

    if (!data[current] && current !== undefined) {
      data[current] = 1
      right++
    } else {
      data[str[left]] = 0
      left++
    }
    console.log(right, left)
    maxLength = Math.max(maxLength, right - left + 1)
  }

  return maxLength
}

console.log(queryStringMaxLength(str01))
