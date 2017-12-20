import flattern from './flattern'
import toAbsolute from './toAbsolute'
import isArray from './isArray'
import isString from './isString'

function upgradeBezier(path, degree = 3) {
    if (!isString(path) && !isArray(path)) {
        return console.warn('path')
    }

    function transfer(a, b, i, degree) {
        var t = i / (degree + 1)
        return t * a + (1 - t) * b
    }

    var ps = isArray(path) ? path.slice(0) : flattern(toAbsolute(path, '[]', true))
    var degree0 = Math.round(ps.length * 0.5 - 1)//贝赛尔曲线的原始阶

    if (degree0 >= degree) {
        return fix(ps, 3)
    }

    var result = [], i

    while(degree0 < degree) {
        result[0] = ps[0]
        result[1] = ps[1]

        for(i = 1; i < degree0 + 1; i++) {
            result[2 * i] = transfer(ps[2 * i - 2], ps[2 * i], i, degree0 + 1)
            result[2 * i + 1] = transfer(ps[2 * i - 1], ps[2 * i + 1], i, degree0 + 1)
        }

        [].push.apply(result, ps.slice(-2))
        ps = result.slice(0)
        degree0++
    }

    result = fix(result, 3)
    return result
}

export default upgradeBezier


