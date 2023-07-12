/**
 *
 * 什么是 promise？
 *
 *      Promise 是一个对象，也是js内置Promise构造函数创建的一个对象，简称 Promise对象。
 *
 * 解决什么问题？
 *
 *
 * 优点？
 *
 *
 * 缺点？
 *
 *
 * */


/**
 *
 * Promise 接收一个回调函数，该函数接收两个参数，一个 resolve 函数，另外一个是 reject 函数。
 *
 * resolve 用于处理 Promise决定异步逻辑执行后成功需要调用的方法。
 *
 * reject 用于处理 Promise 处理异步逻辑执行失败后调用。
 *
 *
 * */

/** @param num {number} */
function runPromise(num) {

    const _promise = new Promise((resolve, reject) => {

        const random = parseInt(( Math.random() * num ).toFixed(3));


        setTimeout(() => {
            if (random > 0.5) {
                // 异步处理成功
                resolve({ message: '开大', random })
            } else {
                // 异步失败处理
                reject({ message:'开小', random })
            }
        });

    });


    _promise
        /**
         *
         * Promise.then：接收两个参数
         *
         * onfulfilled：回调函数：Promise 被兑现时执行，并且允许返回参数供后续 Promise.then  onfulfilled回调函数 的形参。
         *
         * onrejected：回调函数： 捕获 Promise 链路当前 Promise.then 之前的错误。
         *
         *      ⚠️ 注意项：
         *          1. 无法捕获 Promise.then 同层级的 onfulfilled回调函数 错误。
         *
         *          2. 如果不做 return catch 处理，会导致 Promise.catch 被拒绝执行。
         *
         *          3. 如果不做 return catch 处理，会导致后续的 Promise.then 都会被兑现执行。
         *
         *          解决方案：
         *              return Promise.reject()；
         *
         *              这种方式只能阻止下一个 Promise.then onfulfilled回调函数 的执行。
         *
         *              如果需要让 Promise.catch 捕获，需要在每一个 Promise.then onrejected 回调函数执行 return Promise.reject()；
         *
         *
         * */

        .then(
            /** Promise 被兑现时，执行 onfulfilled 函数 */
            res => {
                console.log('🚀  -  🚀  -  🚀  -  🚀  ：', res, '第一个 Promise.then 兑现')

                throw Error('错误')
                /**
                 *
                 * Promise resolve 执行到这里。
                 *
                 * */

                // return res
            },
            /** Promise 被拒绝时，执行 onrejected 函数 */
            err => {
                console.log('❌   -  ❌   -  ❌   -   ❌  : ', err, '第一个 err 捕获')

                /**
                 *
                 * 这里无法捕获同层级 onfulfilled 函数的错误。
                 *
                 * 如果不主动返回 reject 或者错误（比如： throw Error()）时，接下来的then链都会执行。
                 *
                 * */

                return Promise.reject(err)
            }
        )
        .then(
            res => {
                console.log('🚀  -  🚀  -  🚀  -  🚀  ：', res, '第二个 Promise.then 兑现')

                return res
            }
        )
        .then(
            res => {
                console.log('🚀  -  🚀  -  🚀  -  🚀  ：', res, '第三个 Promise.then 兑现')

                return res
            }
        )
        /**
         *
         *  Promise.catch 捕获之前定义的 Promise.then 被拒错误。
         *
         *  ⚠️ 注意：如果在 Promise.catch 之后定义的 Promise.then 都会被执行
         *
         * */
        .catch(err => {
            console.log('❌   -  ❌   -  ❌   -   ❌  : ', err, 'Promise.catch 捕获错误')
        })
        /**  不管Promise有没有被拒绝，这里都会执行 */
        .then(
            res => {
                console.log('🚀  -  🚀  -  🚀  -  🚀  ：', res, '第四个 Promise.then 兑现')

            }
        )
        /**  Promise 被兑现或者拒绝都会执行 */
        .finally(() => {
            console.log('🪢  -  🪢  -  🪢  -  🪢  ： 执行结束')
        })
}

typeof window !== 'undefined' && runPromise(100)


/**
 *
 * @typedef {(resolve: (value: any) => void, reject: (value: any) => void) => void} Executor
 * @typedef {{ onfulfilled: (value: any) => void; onrejected: (value: any) => void }} Callback
 * @typedef {'pending' | 'fulfilled' | 'rejected'} State
 *
 * */

let classId = 0

class CustomPromise {

    /**
     *
     * @param {Executor} executor
     * */
    constructor(executor) {

        /** @type State */
        this.state = 'pending'

        /*** @type Array<Callback> */
        this.callbacks = []

        /** @type any */
        this.value = undefined

        classId++

        this.classId = classId

        /**
         *
         * 处理回调函数
         *
         * 根据不同的回调函数设置不同的状态，并清空队列
         *
         * @param {'onfulfilled' | 'onrejected'} type
         * @param {any} value
         * */
        const handleCallback = (type, value) =>  {

            if (this.state === 'pending') {

                this.state = type === 'onfulfilled' ? 'fulfilled' : 'rejected'

                this.value = value

                // 清空执行之前的队列
                this.callbacks.forEach(callback => {
                    callback[type]?.(value) // 通知下一个 CustomPromise 回调
                })
            }
        }


        // 拒绝
        const reject = value => handleCallback('onrejected', value)

        try {
            executor(
                value => handleCallback('onfulfilled', value),
                reject
            )
        } catch (e) {
            reject(e)
        }
    }

    /**
     *
     * 链路
     *
     * */
    then(onfulfilled, onrejected) {
        onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : res => res;

        onrejected = typeof onrejected === 'function' ? onrejected : err => { throw err };

        return new CustomPromise((resolve, reject) => {
            setTimeout(() => {
                const handleExecutor = (callback, value) => {
                    try {
                        const result = callback(value)
                        resolve(result)
                    } catch (e) {
                        reject(e)
                    }
                }

                switch (this.state) {
                    case "fulfilled":
                        handleExecutor(onfulfilled, this.value);
                        break;
                    case "rejected":
                        handleExecutor(onrejected, this.value);
                        break;
                    default:
                        this.callbacks.push({
                            onfulfilled: value => handleExecutor(onfulfilled, value),
                            onrejected: value => handleExecutor(onrejected, value)
                        })
                        break;
                }
            }, 0)
        })
    }

    /**
     *
     * 捕获链路错误
     * @param {(error: any) => void} onrejected
     * */
    catch(onrejected) {
        return this.then(undefined, onrejected)
    }

    /**
     *
     * finally
     * @param {() => void} callback
     * */
    finally(callback) {
        return this.then(value => {
                callback()
                return value
        },
            reason => CustomPromise.resolve(callback()).then(() => { throw reason; })
        )
    }

    static all(pro = []) {}

    // 主动设置一个兑现
    static resolve(value) {
        return new CustomPromise(resolve => resolve(value))
    }

    // 主动设置一个拒绝
    static reject(value) {
        return new CustomPromise((resolve, reject) => reject(value))
    }
}


new CustomPromise((resolve, reject) => {
    console.log('0-Prom', 'a-0');

    setTimeout(() => {
        reject('a-1')
    }, 888)
})
    .then(res => {
        console.log('1-then', res)

        return 'a-2'
    })
    .catch(error => {
        console.log('catch', error);
    })

// 定义状态

// 根据状态执行不同的回调函数

// 并清空then队列
