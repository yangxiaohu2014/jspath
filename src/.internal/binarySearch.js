/**
 * [binarySearch 在有序数组中从前往后查找第一个大于或等于val的位置]
 * @since 0.1.0
 * @category Math
 * @param {Array} values 有序数组 
 * @param {Number} val 目标值       
 * @returns {Number} 找到的位置
 *
 * @example
 *
 *   binarySearch([3,4,5,6,7,8,9], 4.6)
 *   // => 2
 *
 *   binarySearch([3,4,5,6,7,8,9], 10)
 *   // => 6
 *
 *   binarySearch([3,4,5,6,7,8,9], -1)
 *   // => 0
 */

function binarySearch(array, val) {
  const floor = Math.floor　
  var low = 0　　
  var high = array.length - 1
  var middle

  while (low <= high) {　　
    middle = floor((low + high) * 0.5)

    if (val > array[middle]) {
      low = middle + 1
    } else if (val <= array[middle]) {
      if (val > (array[middle - 1] || 0)) {
        return middle
      } else {
        high = middle - 1
      }
    }
  }

  if (low === middle) {
    return 0
  } else if (middle === high) {
    return high
  }
　
  return -1
}
