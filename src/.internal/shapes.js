import toNormalize from './toNormalize'
import toCurve from './toCurve'
import length from './length'

/**
 * [shapes 根据路径字符串或者数组获取组成路径的规范化或者贝塞尔曲线化后的数组]
 * @since 0.1.0
 * @category Path
 * @param  {Array|String} path [路径字符串或数组]
 * @param  {string} pattern [输出的格式，可选项为'normalize', 'curve']
 * @param  {Boolean} hasNoCommand 是否包含命令符
 * @return {Array|String}        [格式化后的路径]
 *
 * @example
 *
 *   shapes('M100,100A120,60,-60,0,0,150,330L100, 400Z')
 *   // => [{"letter":"A","x":100,"y":100,"x2":150,"y2":330,"len":437.68328857421875,"sumLen":437.68328857421875,"seg":["A",120,60,-60,0,0,150,330]},{"letter":"L","x":150,"y":330,"x2":100,"y2":400,"len":86.02325439453125,"sumLen":523.70654296875,"seg":["L",100,400]},{"letter":"L","x":100,"y":400,"x2":100,"y2":100,"len":300,"sumLen":823.70654296875,"seg":["L",100,100]}]
 *	 
 *   shapes('M100,100A120,60,-60,0,0,150,330L100, 400Z', 'curve')
 *	 // => [{"letter":"C","x":100,"y":100,"x2":36.294,"y2":372.37,"len":308.941,"sumLen":308.941,"seg":["C",10.039,188.773,-25.354,340.09,36.294,372.37]},{"letter":"C","x":36.294,"y":372.37,"x2":150,"y2":330,"len":128.882,"sumLen":437.823,"seg":["C",64.904,387.351,108.249,371.2,150,330]},{"letter":"C","x":150,"y":330,"x2":100,"y2":400,"len":86.023,"sumLen":523.846,"seg":["C",125,365,108.333,388.333,100,400]},{"letter":"C","x":100,"y":400,"x2":100,"y2":100,"len":300,"sumLen":823.846,"seg":["C",100,250,100,150,100,100]}]
 *
 */

function shapes(path, pattern = 'normalize') {
	var pathArray = pattern === 'curve' ? toCurve(path, '[]') : toNormalize(path, '[]')
	var x, y, sumLen = 0, index = 0, result = [] 
	var count = pathArray.length, letter, size, i = 0

	for (; i < count; i++) {
		let seg = pathArray[i]
		letter = seg[0]
		size = seg.length
		

		if (letter === 'M') {
			x = seg[1]
			y = seg[2]
			continue
		}

		let len = length([['M', x, y], seg])
		let x2 = seg[size - 2]
		let y2 = seg[size - 1]

		sumLen += len

		result.push({
			letter,
			x,
			y,
			x2,
			y2,
			len,
			sumLen,
			seg,
		})

		x = x2
		y = y2
	}

	return result
}

export default shapes