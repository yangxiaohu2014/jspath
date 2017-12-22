import upgradeBezier from './upgradeBezier'
import isArray from './isArray'
import isString from './isString'
import toString from './toString'

/**
 * @name upgradeToCurve
 * @description 将直线和二阶贝塞尔曲线升阶为三阶贝塞尔曲线
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [不包含命令参数的数组或者包含命令参数的字符串]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array|String}   [升阶后的贝塞尔曲线]
 * @example
 * 
 *  upgradeToCurve('M10 80 L 180 80', '%s')
 *  // => 'M 10,80 C 95 80 151.667 80 180,80'
 *
 *  upgradeToCurve('M10 80 Q 95 10 180 80', '%s')
 *  // => M 10,80 C 73.75 27.5 137.5 45 180,80
 *
 *  upgradeToCurve([10, 80, 95, 10, 180, 80], '[]')
 *  // => [["M",10,80],["C",73.75,27.5,137.5,45,180,80]]
 *
 */

function upgradeToCurve(path, pattern = '[]') {
	var curve = upgradeBezier(path, 3)
	var result = [['M', ...curve.slice(0, 2)], ['C', ...curve.slice(2)]]

	if (pattern === '[]') {
		return result
	}

	return toString(result, pattern)
}

export default upgradeToCurve