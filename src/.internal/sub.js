import cut from './cut'
import toString from './toString'

/**
 * @name sub
 * @description 获取某一片段路径
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [包含命令参数的数组或者包含命令参数的字符串]
 * @param  {Number} t1, t2     [分割的位置比例，[0, 1]]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array}        [分割后得到的两段路径参数]
 * @example
 *
 * sub('M100,100A120,60,-60,0,0,150,330L100, 400Z', .4, .6, '%s')
 * // => "M 212.89,241.954 L 100,400 L 100,429.482"
 *
 * sub('M100,100A120,60,-60,0,0,150,330L100, 400Z', .9, .95, '[]')
 * // => [["M",100,182.37],["L",100,141.185]][["M",100,182.37],
 *        ["L",100,141.185]]
 */

function sub(path, t1, t2, pattern = '[]') {
	var path1 = cut(path, t1, '[]')[1]
	var path2 = cut(path1, (t2 - t1) / (1 - t1), '[]')[0]

	if (pattern === '[]') {
		return path2
	}

	return toString(path2, pattern)
}

export default sub
