// Promise.all

/**
 * @param promises {Array<Promise<any>>}
 * */
function promiseAll(promises) {

    const result = []

    let index = 0

    const length = promises.length

    return new Promise((resolve, reject) => {
        promises.forEach((promise, ide) => {
            // 将每个输入值转换为 promise，以确保即使传入的某些值不是 promise 也能正常处理
            (async () => promise)().then(value => {
                result[ide] = value

                // 每次处理完加一
                index++

                if (length === index) { // 全部处理完成返回
                    resolve(result)
                }
            }).catch(error => {// 遇到错误则返回
                reject(error)
            })
        })
    })

}

const p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'foo')
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, 'error= p2')
})

const p3 = async () => 5

promiseAll([1,p1, p2,p3()]).then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
})

