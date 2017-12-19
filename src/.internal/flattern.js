import isArray from './isArray'

/**
 * [flattern 数组拍扁]
 * @since 0.1.0
 * @category Math
 * @param {Array} array 要拍扁的数组 
 * @param {Boolean} deep 是否递归拍扁     
 * @returns {Array} 返回拍扁后的数组
 *
 * @example
 *
 *   flattern([1, 3, [4, 5, [7, 8, 9, 10]], 10])
 *   // => [1, 3, 4, 5, [7, 8, 9, 10], 10]
 *
 *   flattern([1, 3, [4, 5, [7, 8, 9, 10]], 10], true)
 *   // => [1, 3, 4, 5, 7, 8, 9, 10, 10]
 */

function flattern(array, deep = false) {
	if (!isArray(array)) {
		return array
	}

	var result = []
	var len = array.length
	var i = 0

	for (; i < len; i++) {
		if (isArray(array[i])) {
			Array.prototype.push.apply(result, deep ? flattern(array[i], true) : array[i])
		} else {
			result.push(array[i])
		}
	}

	return result
}

export default flattern

