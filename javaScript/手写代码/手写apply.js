const data = {
  name: 'data',
  run(params1, params2) {
    console.log(this.name, params1, params2)
  }
}

const data01 = {
  name: 'data01'
}

data.run('p1', 'p2')

data.run.apply(data01, ['p1', 'p2'])

/**
 *
 * 功能和 call 很像
 *
 * 基本一致，传递参数不一样
 *
 * */

Function.prototype._apply = function (context, params = []) {
  context = ((context === undefined || context === null) && window) || Object(context)

  // 创建一个变量，防止污染源
  const symbol = Symbol()

  context[symbol] = this

  const result = context[symbol](...params)

  delete context[symbol]

  return result
}

data.run._apply(data01, ['p1', 'p2'])
