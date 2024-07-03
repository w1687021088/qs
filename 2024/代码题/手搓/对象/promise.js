/**
 *
 * @typedef {'pending' | 'fulfilled' | 'rejected'} State
 *
 *
 * @typedef { (resolve: (value: any) => void, reject: (value: any) => void) => void } Executor
 * */

class $Promise {
  /**
   *
   * @param {Executor} executor
   *
   * */
  constructor(executor) {
    /**
     *
     * 自定义 Promise 状态
     *
     * @type State
     * */
    this.state = 'pending'

    // 更新状态结果
    this.value = undefined

    /**
     *
     * @type {Array<{ fulfilled: (value: any) => void; rejected: (value: any) => void }>}
     * */
    this.callBacks = []

    /**
     *
     * 更新状态回调函数
     *
     * 只有在状态是pending
     *
     * @param {'fulfilled' | 'rejected'} state
     *
     * @param {any} value
     *
     * */
    const updateStateCallback = (state, value) => {
      if (this.state === 'pending') {
        // 更新状态
        this.state = state

        // 更新回调结果
        this.value = value

        // 清空等待队列
        this.callBacks.forEach(callback => {
          // 当前的value传递到下一个链
          callback[state]?.(value)
        })
      }
    }

    // 被拒回调
    const reject = value => updateStateCallback('rejected', value)

    try {
      executor(value => updateStateCallback('fulfilled', value), reject)
    } catch (e) {
      reject(e)
    }
  }

  /**
   *
   * 链路
   *
   * onfulfilled, onrejected 回调不会立即执行，需要等上一个链路执行完毕后才执行。
   *
   * */
  then(onfulfilled, onrejected) {
    const wrapper = handleExecutor => {
      onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : result => result

      onrejected =
        typeof onrejected === 'function'
          ? onrejected
          : error => {
              /**
               *
               * 这里 throw 的原因是模拟 Promise.then不传递第二参数的效果。将会在链路的下一个 catch 阶段被捕获（前提是有调用catch，并且在catch之前不会有其他的then 第二参数参与捕获错误）。
               *
               * */
              throw error
            }

      setTimeout(() => {
        switch (this.state) {
          case 'fulfilled':
            handleExecutor(onfulfilled, this.value)

            break

          case 'rejected':
            handleExecutor(onrejected, this.value)

            break

          default:
            // 加入队列
            this.callBacks.push({
              fulfilled: value => handleExecutor(onfulfilled, value),
              rejected: value => handleExecutor(onrejected, value)
            })
        }
      }, 0)
    }

    // 重新创建一个 Promise，每个then链路都等待上一个状态的变更之后才执行。
    return new $Promise((resolve, reject) =>
      wrapper((callBack, value) => {
        try {
          const result = callBack(value) // onrejected 如果不传递将会被 throw

          // 处理返回 Promise 类型
          if (result instanceof $Promise) {
            result.then(resolve, reject)
          } else {
            resolve(result)
          }
        } catch (e) {
          reject(e)
        }
      })
    )
  }

  /**
   *
   * 捕获错误
   *
   * 延用then思路，等待上一个链路执行完成在执行回调。
   *
   * */
  catch(rejected) {
    return this.then(undefined, rejected)
  }

  /**
   *
   * finally
   *
   * 延用then思路，等待上一个链路执行完成在执行回调。
   *
   * 并在执行结束之后将上一个链路的结果传递到下一个链路。
   *
   * */
  finally(callBack) {
    return this.then(
      value => {
        callBack()
        return value
      },
      error => {
        callBack()
        return error
      }
    )
  }

  static reject(value) {
    return new $Promise((resolve, reject) => reject(value))
  }

  static resolve(value) {
    return new $Promise(resolve => resolve(value))
  }

  /**
   *
   * 全部执行，只有全部执行后才返回最终结果。
   *
   *
   *
   * */
  static all(promises) {
    return new $Promise((resolve, reject) => {
      const results = []

      let count = 0

      promises.forEach((promise, index) => {
        // 判断是否 Promise
        if (promise instanceof $Promise) {
          promise.then(res => {
            results[index] = res

            count++

            if (count === promises.length) {
              resolve(results)
            }
          }, reject)
        } else {
          count++

          // 否则返回自身
          results[index] = promise

          if (count === promises.length) {
            resolve(results)
          }
        }
      })
    })
  }

  /**
   *
   * 最先执行完成返回。
   *
   * */
  static race(promises) {
    return new $Promise((resolve, reject) => {
      promises.forEach(promise => {
        if (promise instanceof $Promise) {
          promise.then(resolve, reject)
        } else {
          resolve(promise)
        }
      })
    })
  }
}

/**
 * 定义状态
 *  'pending' | 'fulfilled' | 'rejected'
 *
 * 重点 then 思路：
 *  每次执行 then 都返回一个 Promise。
 *  异步模拟微任务采用 setTimeout 方法模拟。
 *  链路执行时，如果时等待状态下，将下一个then回调函数存储起来，一直到状态变更为 'fulfilled' | 'rejected' 时再一起清空回调队列（fulfilled回调 或者 rejected回调）。
 *
 * 静态方法：
 *  模拟 Promise 每次都返回一个 Promise 实例。
 *
 * */

new $Promise((resolve, reject) => {
  console.log(resolve, reject)
})
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err)
  })
  .finally(() => {
    console.log('finally')
  })

$Promise.race([
  new $Promise(resolve => {
    setTimeout(() => {
      resolve(1)
    }, 3000)
  }),
  new $Promise(resolve => {
    setTimeout(() => {
      resolve(2)
    }, 5000)
  })
])

$Promise
  .all([
    new $Promise(resolve => {
      setTimeout(() => {
        resolve(1)
      }, 3000)
    }),
    new $Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, 5000)
    })
  ])
  .then(() => {
    return $Promise.reject(222)
  })

$Promise
  .resolve(333)
  .then(res => res)
  .then(res => {
    console.log(res)
  })
