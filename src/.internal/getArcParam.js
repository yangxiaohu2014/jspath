function getArcParams(pathString = '') {
    var arr = pathString
        .replace(/,|[\b\s]+/g, ' ')
        .replace(/\s?([mMAa])\s?/g, ' $1 ')
        .trim()
        .split(' ')
        .map(function(val) {return /[mMAa]/.test(val) ? val : +val})
    var commandM = arr.shift()
    var commandA = arr.splice(2, 1)
    var len = arr.length

    if (commandA === 'a') {
        arr[len -2] += arr[0]
        arr[len -1] += arr[1]
    }

    return arr
}

export default getArcParams