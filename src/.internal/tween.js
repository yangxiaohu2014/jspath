import getShapes from './getShapes'
import cutBezier from './cutBezier'
import shapesToArray from './shapesToArray'
import toString from './toString'
/**
 * @name tween
 * @description 切割复合路径
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [包含命令参数的数组或者包含命令参数的字符串]
 * @param  {Number} t     [分割的位置比例，[0, 1]]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array}        [分割后得到的两段路径参数]
 * @example
 * 
 * tween('M100,100A120,60,-60,0,0,150,330', 'M100,100L150,330L100, 400Z', .6)
 * // => [["M",74.5176,208.948],["C",125,215,141.667,291.667,125.2876,346.9012],
 *        ["M",95.2876,388.9012],["C",100,250,100,150,120,192],["M",130,238],
 *        ["C",125,365,108.333,388.333,74.5176,388.948]]
 *
 * tween('M100,100A120,60,-60,0,0,150,330', 'M100,100L150,330L100, 400Z', 0, '%s')
 * // => M 36.294,372.37 C 125 215 141.667 291.667 88.219,372.253 M 88.219,372.253 C 100 250 100 150 150,330 C 125 365 108.333 388.333 36.294,372.37
 */

var cache = {}

function tween(path1, path2, t, pattern = '[]') {
	path1 = path1.toString()
	path2 = path2.toString()

	var shapes = cache[path1 + '&&' + path2] || alignShapes(path1, path2)

	cache[path1 + '&&' + path2] = shapes

	var newShapes = shapes[0].slice(0).map(function(shape, index) {
		let len = shape.seg.length

		shape.x += t * (shapes[1][index].x - shape.x)
		shape.y += t * (shapes[1][index].y - shape.y)
		shape.seg[len - 2] += t * (shapes[1][index].seg[len - 2] - shape.seg[len - 2])
		shape.seg[len - 1] += t * (shapes[1][index].seg[len - 1] - shape.seg[len - 1])

		return shape
	})
	var newShapes = []
	var len = newShapes.length, i

	var newPath = shapesToArray(newShapes)

	if (pattern === '[]') {
		return newPath
	}

	return toString(newPath, pattern)
}

export default tween

function alignShapes(path1, path2) {
	var shapes1 = getShapes(path1, 'curve').sort(function(a, b) {
		return a.x - b.x
	})
	var shapes2 = getShapes(path2, 'curve').sort(function(a, b) {
		return a.x - b.x
	})
	var switched = false
	
	if (shapes1.length < shapes2.length) {
		let temp = shapes1

		shapes1 = shapes2
		shapes2 = temp
		switched = true
	}

	var diff = shapes1.length - shapes2.length
	var cutNum = Math.ceil(diff / shapes1.length)
	var newShapes2 = []
	var i = 0

	while(diff > 0) {
		if (diff > cutNum) {
			newShapes2 = newShapes2.concat(customCutBezier(shapes2[i], cutNum))
			diff -= cutNum
		} else {
			newShapes2 = newShapes2.concat(customCutBezier(shapes2[i], diff))
			diff = 0
		}

		i++
	}

	shapes2 = newShapes2.concat(shapes2.slice(i))

	return switched ? [shapes2, shapes1] : [shapes1, shapes2]
}

function customCutBezier(shape, count) {
	var path = [['M', shape.x, shape.y], shape.seg].toString()
	var result = []

	while(count > 0) {
		let temp = cutBezier(path, 1/(count + 1), '[]')

		result.push(temp[0])
		path = temp[1].toString()
		count--
	}

	result.push(path)

	return result.map(function(path) {
		return getShapes(path)[0]
	})
}

