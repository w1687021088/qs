/**
 * @file 二叉树遍历.js
 * */

const treeNode = {
  val: 1,
  left: {
    val: 2,
    left: {val: 4},
    right: {val: 5}
  },
  right: {
    val: 3,
    left: {val: 6},
    right: {val: 7}
  }
}

// 利用数组来模拟“栈”的方式，先进后出
/**
 * 从访问父节点，再遍历左子树，最后遍历右子树
 * 二叉树前序遍历 深度优先遍历
 * */
console.log(
  (function (root) {
    const stack = (root && [root]) || []

    const result = []

    while (stack.length) {
      // 出栈（最后的）
      const node = stack.pop()

      result.push(node.val)

      // 先进后出
      node.right && stack.push(node.right)

      // 后进先出
      node.left && stack.push(node.left)
    }

    return result
  })(treeNode)
) // [1, 2, 4, 5, 3, 6, 7]

/**
 * 其遍历顺序是从左子树开始，再访问上节点，最后访问右子树
 * 二叉树中序遍历
 * */
console.log(
  (function (root) {
    const res = []

    // 创建一个栈
    const stack = []

    while (root || stack.length) {
      if (root) {
        stack.push(root)

        root = root.left
      } else {
        const node = stack.pop()

        res.push(node.val)

        root = node.right || null
      }
    }
    return res
  })(treeNode)
) // [4, 2, 5, 1, 6, 3, 7]

/**
 * 先深入左树节点-再深入右树节点-上节点
 * 二叉树后序遍历
 * */
console.log(
  (function (root) {
    const result = []
    const stack = (root && [root]) || []

    while (stack.length) {
      const node = stack.pop()

      result.unshift(node.val) // 从上开始往前添加

      node.left && stack.push(node.left)

      node.right && stack.push(node.right)
    }

    return result
  })(treeNode)
) // [4,5,2,6,7,3,1]
