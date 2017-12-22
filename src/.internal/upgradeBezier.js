import flattern from './flattern'
import toAbsolute from './toAbsolute'
import isArray from './isArray'
import isString from './isString'
import fix from './fix'

/**
 * @name upgradeBezier
 * @description 升阶贝塞尔曲线
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [不包含命令参数的数组或者包含命令参数的字符串]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array|String}   [升阶后的贝塞尔曲线]
 * @example
 * 
 * upgradeBezier('M10 80 L 180 80', 2)
 * // => [10, 80, 123.333, 80, 180, 80]
 *
 * upgradeBezier('M10 80 L 180 80', 3)
 * // => [10, 80, 95, 80, 151.667, 80, 180, 80]
 *
 * upgradeBezier('M10 80 C 123.333, 80, 180, 80', 4)
 * // => [10, 80, 78, 80, 129, 80, 163, 80, 180, 80]
 *
 */

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


