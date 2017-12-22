/**
 * @name binarySearch
 * @description 在有序数组中从前往后查找第一个大于或等于val的位置
 * @function
 * @since 0.1.0
 * @param {Array} values 有序数组 
 * @param {Number} val 目标值
 * @param {Function} condition 判断条件     
 * @returns {Number} 找到的位置
 *
 * @example
 *
 * binarySearch([3,4,5,6,7,8,9], 4.6)
 * // => 2
 *
 * binarySearch([3,4,5,6,7,8,9], 10)
 * // => 6
 *
 * binarySearch([3,4,5,6,7,8,9], -1)
 * // => 0
 *
 * var shapes = [{"letter":"A","x":100,"y":100,"x2":150,"y2":330,"isMoved":true,"len":437.683,"sumLen":437.683,"totalLen":823.707,"seg":["A",120,60,-60,0,0,150,330]},{"letter":"L","x":150,"y":330,"x2":100,"y2":400,"isMoved":false,"len":86.023,"sumLen":523.706,"totalLen":823.707,"seg":["L",100,400]},{"letter":"L","x":100,"y":400,"x2":100,"y2":100,"isMoved":false,"len":300,"sumLen":823.706,"totalLen":823.707,"seg":["L",100,100]}]
 * binarySearch(shapes, .8, function(index, val) {
 *   var shape0 = shapes[index - 1]
 *   var shape = shapes[index]
 *   var v0 = shape0 ? shape0.sumLen / shape0.totalLen : 0
 *   var v = shape0 ? shape.sumLen / shape.totalLen : 0
 *
 *   console.log(v0, v, index)
 *   return val >= v ? 1 : (val < v0) ? -1 : 0
 * })
 * // => 2
 */

function binarySearch(array, val, condition) {
  const floor = Math.floor
  var low = 0
  var high = array.length - 1
  var middle

  condition = condition || function(index, val) {
    return val >= array[index] ? 1 : (array[index - 1] && (val < array[index - 1])) ? -1 : 0
  }

  while (low <= high) {
    middle = floor((low + high) * .5)

    if (condition(middle, val) === 1) {
      low = middle + 1
    } else if (condition(middle, val) === -1) {
      high = middle - 1
    } else {
      return middle
    }
  }
  return middle
}

export default binarySearch
