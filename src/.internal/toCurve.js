import toNormalize from './toNormalize'
import arcToCurve from './arcToCurve'
import upgradeToCurve from './upgradeToCurve'

/**
 * [toCurve 将路径转换成仅包含M、C命令的格式]
 * @since 0.1.0
 * @category Util
 * @param  {Array|String} path [路径字符串或数组]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @return {Array|String}   [格式化后的路径]
 *
 * @example
 *
 *   toCurve('M10 10 h 80 v 80 h -80 Z')
 *   // => [["M",10,10],["C",50,10,76.667,10,90,10],["C",90,50,90,76.667,90,90],["C",50,90,23.333,90,10,90],["C",10,50,10,23.333,10,10]]
 *   
 *   toCurve('M10 10 h 80 v 80 h -80 Z', '%s')
 *   // => "M 10,10 C 50 10 76.667 10 90,10 C 90 50 90 76.667 90,90 C 50 90 23.333 90 10,90 C 10 50 10 23.333 10,10"
 *
 */

function toCurve(path, pattern = '[]') {
	var pathArray = toNormalize(path, '[]')
	var len = pathArray.length
	var x, y, i
	var newPath = []

	for (i = 0; i < len; i++) {
		let seg = pathArray[i].slice(0)
		let endPoint = pathArray[i].slice(-2)
		let type = seg.shift()

		switch(type) {
			case 'M':
			case 'C':
				newPath.push([type, ...seg])
				break
			case 'L':
			case 'Q':
				newPath = newPath.concat(upgradeToCurve([x, y, ...seg], '[]').slice(1))
				break
			case 'A':
			    newPath = newPath.concat(arcToCurve([x, y, ...seg], '[]').slice(1))
				break
			default:
				break
		}
		x = endPoint[0] || x
		y = endPoint[1] || y
	}

	if (pattern === '[]') {
		return newPath
	}

	return toString(newPath, pattern)
}

export default toCurve
