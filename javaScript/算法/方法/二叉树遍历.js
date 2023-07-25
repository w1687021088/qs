const treeNode = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: {
        val: 0,
        left: null,
        right: null
      },
      right: null
    },
    right: {
      val: 5,
      left: null,
      right: null
    }
  },
  right: {
    val: 3,
    left: {
      val: 6,
      left: null,
      right: null
    },
    right: {
      val: 7,
      left: null,
      right: {
        val: 8,
        left: null,
        right: {
          val: 9,
          left: null,
          right: null
        }
      }
    }
  }
}

/**
 *
 * 二叉树前序遍历
 *
 * 从访问父节点，再遍历左子树，最后遍历右子树
 *
 * 预期： [1, 2, 4, 5, 3, 6, 7]
 *
 * */

function preorderTraversal(root) {
  const arr = []

  const res = []

  // 初始化进栈
  root && res.push(root)

  while (res.length > 0) {
    // 出栈（最后的）
    const t = res.pop()
    arr.push(t.val)

    // 先进后出
    t.right && res.push(t.right)

    // 后进先出
    t.left && res.push(t.left)
  }

  return arr
}

console.log(preorderTraversal(treeNode))

/**
 *
 * 其遍历顺序是从左子树开始，再访问父节点，最后访问右子树
 *
 * 预期： [4, 2, 5, 1, 6, 3, 7]
 *
 * 思路
 *
 * 创建一个栈 stack
 *
 * 再将左树压入栈，一直到左树为null为止。
 *
 * 后进先出
 *
 *
 * 二叉树中序遍历
 * */
function inorderTraversal(root) {
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

      root = node.right
    }
  }
  return res
}

console.log(inorderTraversal(treeNode))

/**
 *
 * 先深入左树节点-再深入右树节点-根节点
 * */
// function postorderTraversal(root, arr = []) {
//   if (root) {
//     postorderTraversal(root.left, arr)
//     postorderTraversal(root.right, arr)
//     arr.push(root.val)
//   }
//   return arr
// }

// console.log(postorderTraversal(treeNode))

function postorderTraversal(root) {
  const arr = []
  const stack = []

  root && stack.push(root)

  while (stack.length) {
    const node = stack.pop()

    arr.unshift(node.val) // [2, 6, 9, 8, 7, 3, 1]

    node.left && stack.push(node.left)

    node.right && stack.push(node.right)
  }

  return arr
}

console.log(postorderTraversal(treeNode))
