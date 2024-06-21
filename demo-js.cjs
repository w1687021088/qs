const data = {
  value: 3,
  next: {
    value: 1,
    next: {
      value: 7,
      next: {
        value: 0,
        next: {
          value: 2,
          next: {
            value: 8,
            next: {
              value: 6,
              next: {
                value: 4,
                next: {
                  value: 5
                }
              }
            }
          }
        }
      }
    }
  }
}

/**  @typedef {{ value: number; next?: DataNode }} DataNode */

/**
 * @param data {DataNode}
 *
 * @return {{ value: number}[]}
 * */
function flat(data) {
  /** @type {{ value: number}[]} */
  const list = []

  /** @type {DataNode[]} */
  const stack = [data]

  while (stack.length) {
    const item = stack.shift()

    list.push({ value: item.value })

    item.next && stack.push(item.next)
  }

  return list
}

console.log(flat(data))
