import createPathElement from './createPathElement'
import toString from './toString'
import toAbsolute from './toAbsolute'
import isString from './isString'
import isArray from './isArray'
import isNumber from './isNumber'
import getArcCenter from './getArcCenter'
import sweepAngle from './sweepAngle'
import flattern from './flattern'

/**
 * @name cutArc
 * @description 切割复合路径
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [包含命令参数的数组或者包含命令参数的字符串]
 * @param  {Number} t     [分割的位置比例，[0, 1]]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array}        [分割后得到的两段路径参数]
 * @example
 * 
 * cutArc('M100,100A120,60,-60,0,0,150,330', .8)
 * // => [[["M",100,100],["A",120,60,-60,0,0,76.61737060546875,375.81121826171875]],[["M",76.61737060546875,375.81121826171875],["A",120,60,-60,0,0,150,330]]]
 *
 * cutArc('M100,100A120,60,-60,0,0,150,330', .4, '%s')
 * // => ["M 100,100 A 120 60 -60 0 0 13.049847602844238,249.80311584472656","M 13.049847602844238,249.80311584472656 A 120 60 -60 0 0 150,330"]
 */
function cutArc(path, t = 0, pattern = '[]') {
    if (!isNumber(t)) {
        return console.warn('t必须是[0, 1]范围内的数字')
    }

    if (!isString(path) && !isArray(path)) {
        return console.warn('path必须是长度为8的数组或者包含M和C命令符的字符串')
    }

    var leftPart = [] 
    var rightPart = [] //分别用于存储t点左右侧子曲线的控制点的坐标
    var pathString = isString(path) ? path : [['M', ...path.slice(0, 2)], ['A', ...path.slice(2)]].join(',')
    var pathArray = isArray(path) ? path : flattern(toAbsolute(pathString, '[]', true))
    var pathEl = createPathElement(pathString)
    var len = pathEl.getTotalLength()
    var cutPoint = pathEl.getPointAtLength(len * t)
    var x1 = pathArray[0]
    var y1 = pathArray[1]
    var rx = pathArray[2]
    var ry = pathArray[3]
    var x_axis_rotation = pathArray[4]
    var large_arc_flag = pathArray[5]
    var sweep_flag = pathArray[6]
    var x3 = pathArray[7]
    var y3 = pathArray[8]

    if (!large_arc_flag) {
    	leftPart = [['M', x1, y1], ['A', rx, ry, x_axis_rotation, 0, sweep_flag, cutPoint.x, cutPoint.y]]
    	rightPart = [['M', cutPoint.x, cutPoint.y], ['A', rx, ry, x_axis_rotation, 0, sweep_flag, x3, y3]]
    } else {
    	let centerPoint = getArcCenter(pathString)
    	let left_large_arc_flag, right_large_arc_flag

    	if (sweep_flag) {
    		left_large_arc_flag = sweepAngle([...centerPoint, x1, y1, cutPoint.x, cutPoint.y]) < 180 ? 0 : 1
    		right_large_arc_flag = sweepAngle([...centerPoint, cutPoint.x, cutPoint.y, x3, y3]) < 180 ? 0 : 1
    	} else {
    		left_large_arc_flag = sweepAngle([...centerPoint, cutPoint.x, cutPoint.y, x1, y1]) < 180 ? 0 : 1
    		right_large_arc_flag = sweepAngle([...centerPoint, x3, y3, cutPoint.x, cutPoint.y]) < 180 ? 0 : 1
    	}

    	leftPart = [['M', x1, y1], ['A', rx, ry, x_axis_rotation, left_large_arc_flag, sweep_flag, cutPoint.x, cutPoint.y]]
    	rightPart = [['M', cutPoint.x, cutPoint.y], ['A', rx, ry, x_axis_rotation, right_large_arc_flag, sweep_flag, x3, y3]]
    }

    if (pattern === '[]') {
    	return [
    		leftPart,
    		rightPart
    	]
    } else {
    	return [
    		toString(leftPart, pattern),
    		toString(rightPart, pattern)
    	]
    }
}

export default cutArc
