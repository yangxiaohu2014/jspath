import isArray from './isArray'
import fix from './fix'

/**
 * @name toArray
 * @description 将路径数据按命令转化成数组形式
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [路径字符串或数组]
 * @returns {Array}        [格式化后的路径数组]
 *
 * @example
 *
 *   toArray('M10 10 h 80 v 80 h -80 Z')
 *	 // => [["M",10,10],["h",80],["v",80],["h",-80],["Z"]]
 *	 
 *	 toString(['M100,100A120,60,-60,0,0,150,325'])
 *	 // => [["M",10,10],["h",80],["v",80],["h",-80],["Z"]]
 *
 */

function toArray(path) {
	if (!path) {
		return console.warn('expected path')
	}

	path = isArray(path) ? path.join(',') : path

	const separatorRegExp = /(?!^)\s*,?\s*([+-]?\d+\.?\d*|[a-z]+)/igm //用','分隔命令和数字，预处理
	var segs = path
		.replace(separatorRegExp, ',$1')
		.replace(/(,[a-z])/ig, ',$1')
		.split(',,')

	return segs.map(function(seg) {
		return fix(seg.split(','))
	})
}

export default toArray
