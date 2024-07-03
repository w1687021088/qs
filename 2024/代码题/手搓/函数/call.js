/**
 *
 * call
 *
 * js中将执行函数的指向更改为传入的对象。
 *
 * 思路：
 *    通过Function.prototype 原型创建的方法，其内部的this为调用该者（函数）的本身。
 *    对象下的方法，其this默认指向这个对象。
 *
 * */

Function.prototype._call = function (context, args) {
  // 第一： 防止指向错误，添加默认值,并包裹对象
  context = ((context === undefined || context === null) && (typeof window !== 'undefined' ? window : global)) || Object(context)

  // 第二： 创建一个Symbol变量，防止属性重复
  const symbol = Symbol()

  // 第三： 将调用者赋值给到这个新指向（对象）。
  context[symbol] = this // this = 调用者本身（函数）

  // 第四： 指向该函数。
  const result = context[symbol](...args)

  // 第五： 完成后删除
  // delete context[symbol]
  Reflect.deleteProperty(context, symbol)

  // 第六： 返回执行结果
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
