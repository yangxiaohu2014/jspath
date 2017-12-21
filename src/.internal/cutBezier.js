import cutData from './cutData'
import toAbsolute from './toAbsolute'
import toString from './toString'
import isString from './isString'
import isArray from './isArray'
import isNumber from './isNumber'
import flattern from './flattern'
import fix from './fix'

/**
 * [cutBezier 将一条任意阶(1阶、2阶、3阶...)贝塞尔曲线切割成两条]
 * @since 0.1.0
 * @category Cut
 * @param  {Array|String} path [原贝塞尔曲线的参数数组或者字符]
 * @param  {Number} t     [分割的位置比例，[0, 1]]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @return {Array}        [分割得到定的两条贝塞尔曲线的参数数组]
 * @example
 *
 *  cutBezier('M10 10 C 20 20, 40 20, 50 10', .4, '[]')
 *  // => [[10, 10, 14, 14, 19.6, 16.4, 25.52, 17.2],
 *         [25.52, 17.2, 34.4, 18.4, 44, 16, 50, 10]
 *        ]
 *  
 *  cutBezier('M10 10 C 20 20, 40 20, 50 10', .4, '%,')
 *  // => ["M10,10C14,19.6,16.4,25.52,17.2", "M25.52,17.2C18.4,44,16,50,10"]
 *
 *  cutBezier([10, 10, 20, 20, 40, 20, 50, 10], .4, '[]')
 *  // => [[10, 10, 14, 14, 19.6, 16.4, 25.52, 17.2],
 *         [25.52, 17.2, 34.4, 18.4, 44, 16, 50, 10]
 *        ]
 */

function cutBezier(path, t = 0, pattern = '[]') {
    if (!isNumber(t)) {
        return console.warn('t必须是[0, 1]范围内的数字')
    }

    if (!isString(path) && !isArray(path)) {
        return console.warn('path必须是长度为8的数组或者包含M和C命令符的字符串')
    }

    const cutFunc = cutData(t)
    var leftPart = [] 
    var rightPart = [] //分别用于存储t点左右侧子曲线的控制点的坐标
    var startPoint, endPoint, newPoints, x, y, i
    var ps = isArray(path) ? path.slice(0) : flattern(toAbsolute(path, '[]', true))
    var n = Math.round(ps.length * 0.5 - 1)/*贝塞尔曲线的次数*/

    while(n >= 0) {
        startPoint = ps.slice(0, 2)
        endPoint = ps.slice(-2)
        newPoints = []
        
        leftPart.push(startPoint[0], startPoint[1])
        rightPart.unshift(endPoint[0], endPoint[1])

        for(i = 0; i < n; i++) {
            x = cutFunc(ps[2 * i], ps[2 * i + 2])
            y = cutFunc(ps[2 * i + 1], ps[2 * i + 3])
            newPoints.push(x, y)
        }

        ps = newPoints
        n--
    }

    leftPart = fix(leftPart, 3)
    rightPart = fix(rightPart, 3)

    leftPart = [['M', leftPart[0], leftPart[1]], ['C', ...leftPart.slice(2)]]
    rightPart = [['M', rightPart[0], rightPart[1]], ['C', ...rightPart.slice(2)]]

    if (pattern === '[]') {
        return [leftPart, rightPart]
    }

    return [
        toString(leftPart, pattern),
        toString(rightPart, pattern)
    ]
}

export default cutBezier
