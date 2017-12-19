import cutData from './cutData'
import isString from './isString'
import isArray from './isArray'
import toAbsolute from './toAbsolute'
import fix from './fix'
import flattern from './flattern'

/**
 * [cutLine 将一条线段切割成两条]
 * @since 0.1.0
 * @category Cut
 * @param  {Array|String} points [决定线段的起始点坐标或者线段命令，形如'M 1 2L4, 5']
 * @param  {Number} t     [分割的位置比例，[0, 1]]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @return {Array}        [分割得到定的两条线段的参数数组]
 * @example
 *
 *   cutLine([5, 8, 12, 14], .4, '[]')
 *   // => [[5, 8, 7.8, 10.4], [7.8, 10.4, 12, 14]]
 *
 *   cutLine([5, 8, 12, 14], .4, '%s')
 *   // => ["M 5,8 L 10.4", "M 7.8,10.4 L 14"]
 *
 *   cutLine('M 5, 8L12, 14', .4, '%s')
 *   // => ["M 5,8 L 10.4", "M 7.8,10.4 L 14"]
 */   

function cutLine(points, t = 0, pattern = '[]') {
    if (!isNumber(t)) {
        return console.warn('t必须是[0, 1]范围内的数字')
    }

    if (!isString(points) && !isArray(points)) {
        return console.warn('points必须是长度为4的数组或者包含M和M命令符的字符串')
    }

    var cutFunc = cutData(t)
    var ps = isArray(points) ? points.slice(0) : flattern(toAbsolute(points, '[]', true))
    var cx = cutFunc(ps[0], ps[2])
    var cy = cutFunc(ps[1], ps[3])
    var leftPart = fix([ps[0], ps[1], cx, cy], 3)
    var rightPart = fix([cx, cy, ps[2], ps[3]], 3)

    if (pattern === '[]') {
        return [leftPart, rightPart]
    }

    leftPart.splice(2, 1, 'L')
    leftPart.unshift('M')

    rightPart.splice(2, 1, 'L')
    rightPart.unshift('M')

    return [
        toString(leftPart, pattern),
        toString(rightPart, pattern)
    ]
}

export default cutLine