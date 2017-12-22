import toArray from './toArray'
import toString from './toString'

/**
 * @name toRelative
 * @description 将路径数据按命令转化成数组形式
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [路径字符串或数组]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array|String}        [格式化后的路径]
 *
 * @example
 *
 * toRelative("M 10,10 H 90 V 90 H 10 Z", true)
 * // => [['M', 10, 10], ['h', 80], ['v', 80], ['h', -80], ['z']]
 *
 * toRelative([["M",10,10],["H",90],["V",90],["H",10],["Z"]])
 * // => "M10 10 h 80 v 80 h -80 Z"
 *
 */

function toRelative(path, pattern = '[]') {
	if (!path) {
		return console.warn('expected path')
	}

	var segs = toArray(path)
	var x = 0
	var y = 0
	var x0 = 0
	var y0 = 0
	var len = segs.length
	var i = 0
	var result = []

	for (; i < len; i++) {
		let seg = segs[i].slice(0)
		let letter = seg.shift()
		let endPoint = seg.slice(-2)
		let lowerLetter = letter.toLowerCase()

		switch(lowerLetter) {
			case 'm':
			case 'l':
			case 't':
				if (lowerLetter === letter) {
					x += endPoint[0]
					y += endPoint[1]
				} else {
					seg[0] -= x
					seg[1] -= y
					x = endPoint[0]
					y = endPoint[1]
				}

				if (lowerLetter === 'm') {
					x0 = x
					y0 = y
				}
				break
			case 'h':
				if (lowerLetter === letter) {
					x += endPoint[0]
				} else {
					seg[0] -= x
					x = endPoint[0]
				}
				break
			case 'v':
			    if (lowerLetter === letter) {
					y += endPoint[0]
				} else {
					seg[0] -= y
					y = endPoint[0]
				}
				break
			case 'c':
				if (lowerLetter === letter) {
					x += endPoint[0]
					y += endPoint[1]
				} else {
					seg[0] -= x
					seg[1] -= y
					seg[2] -= x
					seg[3] -= y
					seg[4] -= x
					seg[5] -= y

					x = endPoint[0]
					y = endPoint[1]
				}
				break
			case 's':
			case 'q':
				if (lowerLetter === letter) {
					x += endPoint[0]
					y += endPoint[1]
				} else {
					seg[0] -= x
					seg[1] -= y
					seg[2] -= x
					seg[3] -= y

					x = endPoint[0]
					y = endPoint[1]
				}
				break
			case 'a':
				if (lowerLetter === letter) {
					x += endPoint[0]
					y += endPoint[1]
				} else {
					seg[5] -= x
					seg[6] -= y
					x = endPoint[0]
					y = endPoint[1]
				}
				break
			case 'z':
				x = x0
				y = y0
				break
			default:
				break
		}

		result.push([i === 0 ? letter.toUpperCase() : lowerLetter, ...seg])
	}

	return pattern === '[]' ? result : toString(result, pattern)
}
