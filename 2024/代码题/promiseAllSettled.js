// Promise.all

/**
 * @param promises {Array<Promise<any>>}
 * */
function promiseAllSettled(promises) {

    const result = []

    let index = 0

    const length = promises.length

    return new Promise((resolve, reject) => {
        try {
            promises.forEach((promise, ide) => {
                (async () => promise)().then(value => {
                    result[ide] = {
                        statues: 'fulfilled',
                        value
                    }

                }).catch(reason => {
                    result[ide] = {
                        statues: 'rejected',
                        reason
                    }

                }).finally(() => {
                    index++
                    if (length === index) {
                        resolve(result)
                    }
                })
            })
        } catch (e) {
            reject(e)
        }
    })

}

const p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 'foo')
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(reject, 100, 'error= p2')
})

const p3 = async () => 5

promiseAllSettled([1,p1, p2,p3()]).then(res => {
    console.log(res);
}).catch(error => {
    console.log(error);
})

