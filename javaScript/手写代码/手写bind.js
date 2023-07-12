const data = {
  name: 'data',
  run(p1, p2) {
    console.log(this.name, p1, p2)
  }
}

// data.run('p1', 'p2')

const data01 = {
  name: 'data01'
}

/**
 *
 * 绑定对象，返回一个函数
 * */
const run = data.run.bind(data01, '33')

run('p1', 'p2')

Function.prototype._bind = function (context, ...args) {
  context = ((context === undefined || context === null) && window) || Object(context)

  // 实现原理很简单，基本和 call 一致
  // 区别在于不立即执行，返回一个函数
  // 并且绑定时的函数参数优先级最高
  return (...params) => {
    // 申明一个symbol属性作为一个变量
    const symbol = Symbol()

    // 将函数赋值到绑定的对象上
    context[symbol] = this

    // 执行函数并接收函数执行结果
    const result = context[symbol](...args, ...params)

    // 删除属性，防止污染源
    delete context[symbol]

    // 返回函数的执行结果
    return result
  }
}

const _run = data.run._bind(data01, '33')

_run('p1', 'p2')
