/**
 *
 * call
 *
 * js中将执行函数的指向更改为传入的对象。
 *
 * */

Function.prototype._call = function (context, ...args) {
  // 创建一个Symbol变量，防止属性重复
  const symbol = Symbol()

  // 将函数指向这个symbol变量
  context[symbol] = this

  // 指向该函数
  const result = context[symbol](...args)

  // 完成后删除
  delete context[symbol]

  // 返回执行结果
  return result
}

const data = {
  name: 'data',
  run(params) {
    return params + ': ' + this.name
  }
}

console.log(data.run('参数')) // 参数: data

const data01 = {
  name: 'data01'
}

console.log(data.run.call(data01, '参数')) // 参数: data01

console.log(data.run._call(data01, '参数')) // 参数: data01

const fn = function () {
  return this
}

console.log(fn._call(data) === data) // true
