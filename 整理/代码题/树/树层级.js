const tree = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4
    },
    right: {
      val: 5
    }
  },
  right: {
    val: 3
  }
}

// 思路：找到说有的层级， 广度优先遍历
console.log(
  (function (root) {
    let level = 0

    let stack = (root && [root]) || []

    while (stack.length) {
      // 创建一个空的栈，用来添加当前节点下的所有节点，用来下一次循环
      const arr = []
      stack.forEach(node => {
        // 将节点下的的所有添加到新的栈
        node.left && arr.push(node.left)

        node.right && arr.push(node.right)
      })

      // 替换当前栈
      stack = arr

      // 每次查询都代表一个层级
      level++
    }

    return level
  })(tree)
)
