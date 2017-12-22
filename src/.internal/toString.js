import isArray from './isArray'

/**
 * @name toString
 * @description 将路径数据格式化成特定字符串形式
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [路径字符串或数组]
 * @param  {Reg} pattern    [格式化选项]
 * @returns {String}        [格式化后的路径字符串]
 *
 * @example
 *
 *   toString('M100,100A120,60,-60,0,0,150,325')
 *	 // => "M100,100A120,60,-60,0,0,150,325"
 *	 
 *	 toString('M100,100A120,60,-60,0,0,150,325', '%s')
 *	 // => "M 100,100 A 120 60 -60 0 0 150,325"
 *	
 *	 toString('M100,100A120,60,-60,0,0,150,325', '%n')
 *	 // => "M 100,100\nA 120 60 -60 0 0 150,325
 * 
 */

const separatorRegExp = /(?!^)\s*,?\s*([+-]?\d+\.?\d*|[a-z]+)/igm //用','分隔命令和数字，预处理
const replaceRegExp1 = /,?([a-z]),?/gim //替换命令符两侧的','
const replaceRegExp2 = /([+-]?\d+\.?\d*)\s([+-]?\d+\.?\d*)(?=\s[a-z]|$)/gim //仅将当前坐标用','分隔
const replaceRegExp3 = /([+-]?\d+\.?\d*)\s([+-]?\d+\.?\d*)\s*(?=[a-z]|$)/gim //仅将当前坐标用','分隔, 并且在命令符前断行

function toString(path, pattern = '%,') {
	path = isArray(path) ? path.join(',') : path
	path = path.replace(separatorRegExp, ',$1')

	switch (pattern) {
		case '%,':
		  path = path.replace(replaceRegExp1, '$1')
		  break
		case '%s':
		  path = path.replace(/,/g, ' ').replace(replaceRegExp2, '$1,$2')
		  break
		case '%n':
		  path = path.replace(/,/g, ' ').replace(replaceRegExp3, '$1,$2\n')
		  break
		default:
		  path = path.replace(replaceRegExp1, '$1')
		  break
	}
	return path
}

export default toString
