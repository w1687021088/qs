function formatNumber(num, digit = 10) {

    const isNegative = num < 0

    num = Math.abs(num).toString()

    const [strInteger,part] = num.split('.')



    const _nums = []

    if (digit > strInteger.length) {
        digit = strInteger.length
    }


    const first = strInteger.length % digit

    if (first) {
        _nums.push(strInteger.slice(0, first))
    }

    for (let i = first; i < strInteger.length; i += digit) {
        _nums.push(strInteger.slice(i, i + digit))
    }

    return (isNegative && '-' + _nums.join(',')) + (part && '.' + part || '')
}

function formatNumberWithRegex(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// o(n - (n % d) / d)


console.log(formatNumber(-12400600, 3));
// console.log(formatNumberWithRegex(-5112400600.89));






