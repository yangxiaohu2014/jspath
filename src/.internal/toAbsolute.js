import toArray from './toArray'
import toString from './toString'

/**
 * @name toAbsolute
 * @description 将路径数据按命令转化成数组形式
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [路径字符串或数组]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @param  {Boolean} hasNoCommand 是否包含命令符
 * @return {Array|String}        [格式化后的路径]
 *
 * @example
 *
 * toAbsolute("M10 10 h 80 v 80 h -80 Z")
 * // => "M 10,10 H 90 V 90 H 10 Z"
 *	 
 * toAbsolute("M10 10 h 80 v 80 h -80 Z", true)
 * // => [["M",10,10],["H",90],["V",90],["H",10],["Z"]]
 *
 */

function toAbsolute(path, pattern = '[]', hasNoCommand = false) {
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
		let upLetter = letter.toUpperCase()

		switch(upLetter) {
			case 'M':
			case 'L':
			case 'T':
				if (upLetter === letter) {
					x = endPoint[0]
					y = endPoint[1]
				} else {
					x += endPoint[0]
					y += endPoint[1]
				}

				if (upLetter === 'M') {
					x0 = x
					y0 = y
				}

				seg = [x, y]
				break
			case 'H':
				if (upLetter === letter) {
					x = seg[0]
				} else {
					x += seg[0]
				}

				seg = [x]
				break
			case 'V':
			    if (upLetter === letter) {
					y = seg[0]
				} else {
					y += seg[0]
				}

				seg = [y]
				break
			case 'C':
				if (upLetter === letter) {
					x = endPoint[0]
					y = endPoint[1]
				} else {
					seg[0] += x
					seg[1] += y
					seg[2] += x
					seg[3] += y
					seg[4] += x
					seg[5] += y

					x += endPoint[0]
					y += endPoint[1]
				}
				break
			case 'S':
			case 'Q':
				if (upLetter === letter) {
					x = endPoint[0]
					y = endPoint[1]
				} else {
					seg[0] += x
					seg[1] += y
					seg[2] += x
					seg[3] += y
					x += endPoint[0]
					y += endPoint[1]
				}
				break
			case 'A':
				if (upLetter === letter) {
					x = endPoint[0]
					y = endPoint[1]
				} else {
					seg[5] += x
					seg[6] += y
					x += endPoint[0]
					y += endPoint[1]
				}
				break
			case 'Z':
				x = x0
				y = y0
				break
			default:
				break
		}

		result.push(hasNoCommand ? seg : [upLetter, ...seg])
	}

	return pattern === '[]' ? result : toString(result, pattern)
}

export default toAbsolute

