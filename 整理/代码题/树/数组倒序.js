/**
 * @param s {string[]}
 * */
function reverseString(s) {
  let left = 0,
    right = s.length - 1

  while (left < right) {
    // 数组同时替换位置
    // eslint-disable-next-line no-self-assign
    ;[s[left], s[right]] = [s[right], s[left]]

    left++

    right--
  }
}

const s = ['h', 'e', 'l', 'l', 'o']

reverseString(s)

console.log(s.join('') === 'olleh')

// 数组倒序.js
