/**
 *
 * 防抖
 *
 * 在一定时间之内,多次调用只触发最后一次的执行。
 *
 * */
function debounce(constructor, delay = 300) {
  let timer = null

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      constructor.apply(this, args)
    }, delay)
  }
}

const data = {
  name: 'data',
  run(id) {
    console.log(id, this === global)
  }
}

const fn = debounce(data.run)

fn('id = 1') // 不执行
fn('id = 2') // 不执行
fn('id = 3') // 执行

/**
 *
 * 节流
 *
 * 在规定的时间之内只执行首次调用。
 *
 * */

function throttle(constructor, delay = 300) {
  let throttleTimer = null

  return function (...args) {
    if (!throttleTimer) {
      throttleTimer = setTimeout(() => {
        constructor?.apply(this, args)

        clearTimeout(throttleTimer)

        throttleTimer = null
      }, delay)
    }
  }
}

const th = throttle(data.run)

th('id = 5') // 不执行
th('id = 6') // 不执行
th('id = 7') // 执行
