import createPathElement from './createPathElement'
import toAbsolute from './toAbsolute'

/**
 * @name getArcCenter
 * @description 获取椭圆弧中心点坐标
 * @function
 * @since 0.1.0
 * @param {String|...Number} values [x1, y1, rx, ry, x_axis_rotation, large_arc_flag, sweep_flag, x3, y3] 或
 *                          'M x1,y1 [A|a] rx ry x_axis_rotation large_arc_flag sweep_flag x3,y3'         
 * @returns {Array} 返回中心坐标
 *
 * @example
 *
 * getArcCenter(-2, 0, 2, 1, 0, 1, 1, Math.PI, 2, 0)
 * 
 * // => [0, 0]
 */

function getArcCenter(...values) {
    var pathString = ''
    var pathArr = []

    if (values.length === 1 && typeof(values[0]) === 'string') {
        pathString = values[0]
        pathArr = toAbsolute(pathString, '[]', true)
        pathArr = pathArr[0].concat(pathArr[1])
    } else if (values.length === 9) {
        pathArr = values.slice(0)
        values.splice(2, 0, 'A')
        pathString = 'M' + values.join(' ')
    } else {
        return []
    }

    var elNS = createPathElement(pathString)
    var len = elNS.getTotalLength()
    var point = elNS.getPointAtLength(len * .5)
    var x1 = pathArr[0]  //起点
    var y1 = pathArr[1]
    var x2 = point.x     //中间点
    var y2 = point.y
    var x3 = pathArr[7]  //终点
    var y3 = pathArr[8]
    var rx = pathArr[2]  //长短半轴
    var ry = pathArr[3]
    var x_axis_rotation = pathArr[4] * Math.PI / 180 //单位度

    // 系数
    var cosVal  = Math.cos(x_axis_rotation)
    var sinVal  = Math.sin(x_axis_rotation)
    var k  = rx * rx / (ry * ry)
    var m1, m2, a, b, c, c10, c11, c20, c21, c1, c0, y

    // 所求坐标
    var x, y

    //求第一组参数
    c10 = x1 * cosVal + y1 * sinVal
    c11 = y1 * cosVal - x1 * sinVal
    c20 = x2 * cosVal + y2 * sinVal
    c21 = y2 * cosVal - x2 * sinVal
    c0  = c10 - c20
    c1  = c11 - c21

    a = k * c1 * sinVal - c0 * cosVal
    b = -k * c1 * cosVal - c0 * sinVal
    c = -0.5 * (c0 * (c10 + c20) + k * c1 * (c11 + c21))
    m1= [a, b, c]

    //求第二组参数
    c20 = x3 * cosVal + y3 * sinVal
    c21 = y3 * cosVal - x3 * sinVal
    c0  = c10 - c20
    c1  = c11 - c21

    a = k * c1 * sinVal - c0 * cosVal
    b = -k * c1 * cosVal - c0 * sinVal
    c = -0.5 * (c0 * (c10 + c20) + k * c1 * (c11 + c21))
    m2= [a, b, c]

    t = m1[0] * m2[1] - m2[0] * m1[1]
    x = (m1[2] * m2[1] - m2[2] * m1[1]) / t
    y = (-m1[2] * m2[0] + m2[2] * m1[0]) / t

    return [x, y]
}

export default getArcCenter

