/**
 *
 * JSON.parse.js
 *
 * 支持：String BigInt Number Boolean null Object('number') Object(true) BigInt(32324324) Object(['111']) Object([111])
 *
 * 不支持：Symbol Object Function Array undefined Map Set Object('string') Object(Symbol()) Object(() => {}) Object(['ss'])
 * */

/**
 * @param {any} target
 * */
const JSONParse = target => new Function('return ' + target)()

const d = JSON.stringify(undefined)

// console.log(JSON.parse(d))
console.log(JSONParse(d))
