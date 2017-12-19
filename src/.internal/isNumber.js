function isNumber(value) {
    var pattern = /^(-)?\d+(\.\d+)?$/
    if (pattern.exec(value) === null || value === "") {
        return false
    } else {
        return true
    }
}

export default isNumber