

/**
 * 示例对象
 * @type {{[key in string]: Data | number}}
 * */
const nestedObject = {
    a: 1,
    b: {
        c: 2,
        d: {
            e: 3,
            f: 4
        }
    },
    g: 5,
    p: [1]
};

/** @typedef {{[key in string]: number}} Data */

/**
 * @param data {{[key in string]: Data | number}}
 * */
function flattenObject(data) {
    /** @type {{data: Data, node: string | null}[] } */
    const stack = [{ data, node: null }]

    /** @type Data */
    const obj = {}


    while (stack.length) {
        const {data: itemData, node} = stack.shift()
        const keys = Object.keys(itemData)

        for (let i = 0; i< keys.length; i++) {
            const _node = (node &&  node + '.' || '') + keys[i]

            if (Object.prototype.toString.call(itemData[keys[i]]) === '[object Object]') {
                stack.push({
                    data: itemData[keys[i]],
                    node: _node
                })
            } else {
                obj[_node] = itemData[keys[i]]
            }
        }
    }


    return obj
}


console.log(flattenObject(nestedObject));
