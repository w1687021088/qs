/**
 *
 * @typedef {'pending' | 'fulfilled' | 'rejected'} State
 *
 *
 * @typedef { (resolve: (value: any) => void, reject: (value: any) => void) => void } Executor
 * */

let id = 0

 class CustomPromise {

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
        this.state = 'pending';

        // 更新状态结果
        this.value = undefined;


        /**
         *
         * @type {Array<{ fulfilled: (value: any) => void; rejected: (value: any) => void }>}
         * */
        this.callBacks = [];

        id++;

        this.id = id;


        /**
         *
         * 更新状态回调函数
         *
         * 只有在状态为 'pending'
         *
         * @param {'fulfilled' | 'rejected'} state
         *
         * @param {any} value
         *
         * */
        const updateStateCallback = (state, value) => {
            if (this.state === 'pending') {
                // 更新状态
                this.state = state;

                // 更新回调结果
                this.value = value;

                // 清空等待队列
                this.callBacks.forEach(callback => {
                    // 当前的value传递到下一个链
                    callback[state]?.(value);

                });
            }
        };

        // 被拒回调
        const reject = value => updateStateCallback('rejected', value);

        try {
            executor(value => updateStateCallback('fulfilled', value), reject);
        } catch (e) {
            reject(e);
        }
    }


    // 链路
    then(onfulfilled, onrejected) {
        const wrapper = (handleExecutor) => {

            onfulfilled = typeof onfulfilled === 'function' ? onfulfilled : result => result;

            onrejected = typeof onrejected === 'function' ? onrejected : error => {
                /**
                 *
                 * 这里 throw 的原因是模拟 Promise.then不传递第二参数的效果。将会在链路的下一个 catch 阶段被捕获（前提是有调用catch，并且在catch之前不会有其他的then 第二参数参与捕获错误）。
                 *
                 * */
                throw error;
            };

            setTimeout(() => {
                switch (this.state) {
                  case 'fulfilled':
                    handleExecutor(onfulfilled, this.value);

                    break;

                  case 'rejected':
                    handleExecutor(onrejected, this.value);

                    break;

                  default:
                    // 加入队列
                    this.callBacks.push({
                      fulfilled: value => handleExecutor(onfulfilled, value),
                      rejected: value => handleExecutor(onrejected, value)
                    });

                }
            }, 0);
        }

        // 重新创建一个 Promise，每个then链路都等待上一个状态的变更之后才执行。
        return new CustomPromise((resolve, reject) => wrapper((callBack, value) => {
            try {
                const result = callBack(value); // onrejected 如果不传递将会被 throw

                // 处理返回 Promise 类型
                if (result instanceof CustomPromise) {
                    result.then(resolve, reject);
                } else {
                    resolve(result);
                }
            } catch (e) {
                reject(e);
            }
        }));
    }

    /**
     *
     * 捕获错误, 需要等待前面的链路执行完成
     * */
    catch(rejected) {
        return this.then(undefined, rejected);
    }

    finally(callBack) {
        return this.then(
            value => {
                callBack()
                return value
            },
            error => {
                callBack()
                return error
            });
    }

    static reject(value) {
        return new CustomPromise((resolve, reject) => reject(value));
    }

    static resolve(value) {
        return new CustomPromise(resolve => resolve(value));
    }

    static all(promises) {
        return new CustomPromise((resolve, reject) => {
            const results = [];

            let count = 0;

            promises.forEach((item, index) => {

                // 判断是否 Promise
                if (item instanceof CustomPromise) {
                    item.then(res => {
                        results[index] = res
                        count++
                        if (count === promises.length) {
                            resolve(results)
                        }
                    }, reject);
                } else {
                    count++;
                    // 否则返回自身
                    results[index] = item;
                }
            });
        });
    }

    static race(promises) {
        return new CustomPromise((resolve, reject) => {
            promises.forEach(promise => {
                if (promise instanceof CustomPromise) {
                    promise.then(resolve, reject);
                } else {
                    resolve(promise);
                }
            });
        });
    }
}


/**
 * 定义状态
 *  'pending' | 'fulfilled' | 'rejected'
 *
 * 重点 then 思路：
 *  每次执行 then 都返回一个 Promise。
 *  异步模拟微任务采用 setTimeout 方法模拟。
 *  链路执行时，将下一个 then 回调函数存储起来，等待 状态变更为 'fulfilled' | 'rejected' 时在一起清空队列。
 *
 * 静态方法：
 *  模拟 Promise 每次都返回一个 Promise 实例。
 *
 * */

