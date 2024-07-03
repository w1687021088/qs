/**
 * @param nums {number[]}
 * @param target {number}
 *
 *  无序的列表查询方式
 * */
function search(nums, target) {
  let result = -1

  if (!nums.length) {
    return result
  }

  let left = 0

  let right = nums.length - 1

  while (left <= right) {
    if (nums[left] === target) {
      result = left
      break
    }
    if (nums[right] === target) {
      result = right
      break
    }
    right--

    left++
  }

  return result
}

console.log(search([0, -1, 2, 3, 19, 5, 7, 20, 18], 3))

/**
 * @param nums {number[]}
 * @param target {number}
 * */
function orderlySearch(nums, target) {
  if (!nums.length) {
    return -1
  }

  let left = 0,
    right = nums.length - 1

  while (left <= right) {
    // 防止数值越来越大
    const i = Math.floor((right - left) / 2 + left)

    if (nums[i] === target) {
      return i
    }
    // 在右侧
    if (target > nums[i]) {
      left = i + 1
    }
    // 在左侧
    if (target < nums[i]) {
      right = i - 1
    }
  }

  return -1
}

// console.log(orderlySearch([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 9))

// 二分查找.js
