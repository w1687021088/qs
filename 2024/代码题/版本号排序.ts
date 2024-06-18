const versions = ['2.0', '1.4', '1.3', '1.0', '0.2', '0.1.6', '0.1.5', '0.1.4', '0.1.3', '0.1.2', '0.1.1']

// 自定义比较函数 a > b ？ 1 ： -1
function compareVersions(a: string, b: string) {
  if (a === b) {
    return -1
  }

  const aParts = a.split('.')
  const bParts = b.split('.')

  // 找到最短的数组长度
  const length = Math.min(aParts.length, bParts.length)

  // 比较每个部分
  for (let i = 0; i < length; i++) {
    const partA = parseInt(aParts[i], 10)
    const partB = parseInt(bParts[i], 10)

    if (partA < partB) {
      return -1
    }
    if (partA > partB) {
      return 1
    }
  }
  return aParts.length - bParts.length
}

// 对数组进行排序
// versions.sort(compareVersions)

function sort(list: string[]) {
  const len = list.length
  for (let i = 0; i < len; i++) {
    // len - i 为了不重复多余的循环， - 1是为了不拿最后的一位做判断
    for (let j = 0; j < len - i - 1; j++) {
      // 不减去 1 就得判断下以为是否为空
      // if (list[j + 1]) {
      if (compareVersions(list[j], list[j + 1]) > 0) {
        // 交换元素
        ;[list[j], list[j + 1]] = [list[j + 1], list[j]]
      }
      // }
    }
  }

  return list
}

console.log(JSON.stringify(sort(versions)) === JSON.stringify(['0.1.1', '0.1.2', '0.1.3', '0.1.4', '0.1.5', '0.1.6', '0.2', '1.0', '1.3', '1.4', '2.0']))
