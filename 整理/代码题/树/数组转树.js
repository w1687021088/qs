/**
 * @description 子集
 * @typedef {{id: number; name: string; pid: number; children?: Array<Item>}} Item
 * */

/**
 *
 * @param list {Array<Item>} 列表
 * @param pid {number | null} pid
 *
 * 时间复杂度：O(n)
 *
 * 利用js复杂数据类型的引用地址赋值的特性来改变数组的子集
 * */
const conversionTree = (list, pid) => {
  /** @type Array<Item> */
  const newList = []

  // 创建一个对象来临时存储
  const data = {}

  // 先找到第一层
  const s = new Set()

  const firstPids = new Set()

  for (let i = 0; i < list.length; i++) {
    s.add(list[i].id)
  }

  for (let i = 0; i < list.length; i++) {
    if (!s.has(list[i].pid)) {
      firstPids.add(list[i].pid)
    }
  }

  // 遍历数组
  for (let i = 0; i < list.length; i++) {
    const item = list[i]

    const itemPid = item.pid

    const itemId = item.id

    // 将id 作为 data 的 key 值，存储 item
    data[itemId] = data[itemId] ? { ...data[itemId], ...item } : item

    if (firstPids.has(itemPid)) {
      newList.push(data[itemId])
    } else {
      data[itemPid] = data[itemPid] || {}

      data[itemPid].children = data[itemPid].children || []

      data[itemPid].children.push(data[itemId])
    }
  }

  return newList
}

const arr = conversionTree(
  [
    { id: 0, pid: null, name: '生物' },
    { id: 7, pid: 2, name: '蕨类植物' },
    { id: 1, pid: 0, name: '动物' },
    { id: 2, pid: 0, name: '植物' },
    { id: 3, pid: 0, name: '微生物' },
    { id: 4, pid: 1, name: '哺乳动物' },
    { id: 5, pid: 1, name: '卵生动物' },
    { id: 6, pid: 2, name: '种子植物' },
    { id: 8, pid: 4, name: '大象' },
    { id: 9, pid: 4, name: '海豚' },
    { id: 10, pid: 4, name: '猩猩' },
    { id: 11, pid: 5, name: '蟒蛇' },
    { id: 12, pid: 5, name: '麻雀' }
  ],
  null
)

console.log(JSON.stringify(arr, null, 2))

const tree = [
  {
    id: 0,
    pid: null,
    name: '生物',
    children: [
      {
        id: 1,
        pid: 0,
        name: '动物',
        children: [
          {
            id: 4,
            pid: 1,
            name: '哺乳动物',
            children: [
              {
                id: 8,
                pid: 4,
                name: '大象'
              },
              {
                id: 9,
                pid: 4,
                name: '海豚'
              },
              {
                id: 10,
                pid: 4,
                name: '猩猩'
              }
            ]
          },
          {
            id: 5,
            pid: 1,
            name: '卵生动物',
            children: [
              {
                id: 11,
                pid: 5,
                name: '蟒蛇'
              },
              {
                id: 12,
                pid: 5,
                name: '麻雀'
              }
            ]
          }
        ]
      },
      {
        children: [
          {
            id: 7,
            pid: 2,
            name: '蕨类植物'
          },
          {
            id: 6,
            pid: 2,
            name: '种子植物'
          }
        ],
        id: 2,
        pid: 0,
        name: '植物'
      },
      {
        id: 3,
        pid: 0,
        name: '微生物'
      }
    ]
  }
]

// console.log(tree)

// TODO： 遍历集合的时候，不一定固定死思维，在遍历的时候数组的长度可以考虑可变

/** @typedef {{id: number; pid: number; name: string; children?: TreeItem[] }} TreeItem */

/**
 * 广度优先遍历
 * @param stack {Array<TreeItem>}
 * */
function treeToList(stack) {
  /** @type Array<TreeItem> */
  const result = []

  while (stack.length) {
    const { children, ...item } = stack.pop()

    result.push(item)

    if (children?.length) {
      stack = stack.concat(children)
    }
  }

  return result
}

console.log(treeToList(tree).sort((a, b) => a.id - b.id))

// 深度 && 广度图
// https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f4e309558e694f42a56f6cda86d9300d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp
