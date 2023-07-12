const deepClone = data => {
  // 基础数据类型或者null，直接返回
  if (data === null) {
    return data
  }

  // 如果时时间对象，则包裹一层Date返回
  if (data instanceof Date) {
    return new Date(data.getTime())
  }

  // 正则
  if (data instanceof RegExp) {
    return new RegExp(data)
  }

  // 函数
  if (typeof data === 'function') {
    return function (...args) {
      return data.apply(this, args)
    }
  }

  // 如果时数据，则遍历递归拷贝数组元素
  if (Array.isArray(data)) {
    return data.map(item => deepClone(item))
  }

  // 如果时对象，则遍历并递归拷贝对象属性
  if (typeof data === 'object') {
    const result = {}

    for (const key in data) {
      result[key] = deepClone(data[key])
    }

    return result
  }

  return data
}

const data = {
  name: 'data',
  list: [
    {
      id: 1,
      flag: true,
      item: {
        code: 1
      }
    },
    {
      id: 2,
      flag: false,
      item: {
        code: 2
      }
    },
    {
      id: 3,
      flag: true,
      item: {
        code: 1
      }
    }
  ],
  run(id) {
    console.log(id, this)
  },
  to: {
    router: {
      query: {
        key: 'key-query',
        id: '345345435435'
      },
      params: {
        key: 'key-params',
        id: '345345435435'
      }
    }
  }
}

const newData = deepClone(data)

console.log(newData)
