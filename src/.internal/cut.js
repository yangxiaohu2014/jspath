import binarySearch from './binarySearch'
import getShapes from './getShapes'
import shapesToArray from './shapesToArray'
import toString from './toString'
import toArray from './toArray'
import cutLine from './cutLine'
import cutArc from './cutArc'
import cutBezier from './cutBezier'

/**
 * @name cut
 * @description 切割复合路径
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [包含命令参数的数组或者包含命令参数的字符串]
 * @param  {Number} t     [分割的位置比例，[0, 1]]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array}        [分割后得到的两段路径参数]
 * @example
 * 
 * cut('M100,100A120,60,-60,0,0,150,330L100, 400Z', .5)
 * // => [[["M",100,100],["A",120,60,-60,0,0,130.734,347.186]],
 *        [["M",130.734,347.186],["A",120,60,-60,0,0,150,330],
 *        ["L",100,400],["L",100,100]]]
 *
 * cut('M100,100A120,60,-60,0,0,150,330L100, 400Z', .5)
 * // => ["M 100,100 A 120 60 -60 0 0 130.734,347.186", 
 *        "M 130.734,347.186 A 120 60 -60 0 0 150,330 L 100,400 L 100,100"]
 */

function cut(path, t = 0, pattern = '[]') {
	var shapes = getShapes(path)
	var index =  binarySearch(shapes, t, function(index, val) {
		var shape0 = shapes[index - 1]
		var shape = shapes[index]
		var v0 = shape0 ? (shape0.sumLen - shape0.len) / shape0.totalLen : 0
		var v = shape ? (shape.sumLen - shape.len) / shape.totalLen : 0

		return val >= v ? 1 : (val < v0) ? -1 : 0
	})
	var shape = shapes[index]
	var parts = []
	var path = [['M', shape.x, shape.y], shape.seg].join(',')
	var t2 = (t * shape.totalLen - shape.sumLen + shape.len) / shape.len

	switch(shape.letter) {
		case 'L':
			parts = cutLine(path, t2, '[]')
			break
		case 'A':
			parts = cutArc(path, t2, '[]')
			break
		case 'Q':
		case 'C':
			parts = cutBezier(path, t2, '[]')
			break
		default:
			break
	}

	parts[0] = getShapes(parts[0] || [])
	parts[1] = getShapes(parts[1] || [])
	var leftPath = shapesToArray(shapes.slice(0, index).concat(parts[0]))
	var rightPath = shapesToArray(parts[1].concat(shapes.slice(index + 1)))

	if (pattern === '[]') {
		return [leftPath, rightPath]
	}

	return [
		toString(leftPath, pattern),
		toString(rightPath, pattern)
	]
}

export default cut
