/**
 *
 * @param {number} num
 *
 * @param {number} sliceNum
 *
 * */
function convert(num, sliceNum = 3) {
  // 根据切分位置数量，过滤低于该长度的值
  if (Math.floor(num) < parseFloat(new Array(sliceNum).fill(0).reduce((a, b) => a + b, '1'))) {
    return num
  }

  // 切分 整数 和 小数
  const [integerString, tail] = num.toString().split('.')

  // 找出剩余的位数。
  const startSliceNumber = integerString.length % sliceNum

  // 找出需要切分多少份
  const sliceLength = (integerString.length - startSliceNumber) / sliceNum

  // 开始切分的起点位数
  let start = startSliceNumber > 0 ? startSliceNumber : 0

  // 先切分开始的部分
  let result = startSliceNumber > 0 ? integerString.slice(0, startSliceNumber) : ''

  for (let i = 0; i < sliceLength; i++) {
    // 拼接
    result += `${start > 0 ? ',' : ''}${integerString.slice(start, sliceNum + start)}`

    // 设置起始切分位置
    start = sliceNum + start
  }

  return `${result}${(tail && '.' + tail) || ''}`
}

const num = convert(11345007600) // 23 // 15

console.log(num)
