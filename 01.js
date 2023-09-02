function reactive(data) {
  return new Proxy(data, {
    get(target, p, receiver) {
      console.log('获取')
      // 依赖收集
      return Reflect.get(target, p, receiver)
    },
    set(target, p, newValue, receiver) {
      console.log('设置')
      // 触发依赖
      return Reflect.set(target, p, newValue, receiver)
    }
  })
}

const data = reactive({
  count: 0,
  msg: 'msg'
})

// data.count++

// const arr = reactive([0, 1])

// 收集依赖
// function track() {}
//
// // 触发依赖
// function trigger() {}
