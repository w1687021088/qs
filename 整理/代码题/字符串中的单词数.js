/*
输入: "Hello, my name is John"
输出: 5
解释: 这里的单词是指连续的不是空格的字符，所以 "Hello," 算作 1 个单词。*/

console.log(countSegments('Hello, my name is John') === 5)

function countSegments(s) {
  // 思路一：split api方法
  // return s.split(' ').length

  // 思路二：单词没有中间没有空格，右侧才会出现空格，
  // 尾部添加上一个空格

  s += ' '

  let count = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i + 1] === ' ' && s[i] !== ' ') {
      count++
    }
  }

  return count
}

// 给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。（符串是否是由子集重复的拼接而成）
// https://leetcode.cn/problems/repeated-substring-pattern/description/
function repeatedSubstringPattern(s) {
  if (!s.length || s.length === 1) {
    return false
  }

  return (s + s).substring(1, (s + s).length - 1).includes(s)
}

console.log(repeatedSubstringPattern('abab') === true)

console.log(repeatedSubstringPattern('abcab') === false)

console.log(repeatedSubstringPattern('abcabcabcabc') === true)

// 检测大写字母

/**
 * @param word {string}
 * */
function detectCapitalUse(word) {
  if (word.length === 0) {
    return false
  }
  if (word.length === 1) {
    return true
  }
  // 首位字母是否小写
  const firstIsLowe = word[0] === word[0].toLocaleLowerCase()

  // 第二位字母是否小写
  const towIsLower = word[1] === word[1].toLocaleLowerCase()

  let bool = true

  for (let i = firstIsLowe ? 1 : 2; i < word.length; i++) {
    // 若第 1 个字母为小写，则其他字母必须均为小写

    // 若第 1 个字母为大写，则其他字母必须均为大写或均为小写，即其他字母必须与第 2 个字母的大小写相同；
    const code = firstIsLowe ? word[i].toLocaleLowerCase() : towIsLower ? word[i].toLocaleLowerCase() : word[i].toLocaleUpperCase()

    // 判断
    if (word[i] !== code) {
      bool = false
      break
    }
  }

  return bool
}
