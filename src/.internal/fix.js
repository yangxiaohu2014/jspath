/**
 * [fix 数值取精度]
 * @since 0.1.0
 * @category Math
 * @param {Array|Number} values 要处理的单个数字或者数组 
 * @param {Number} degree[default=3] 精度位数       
 * @returns {Array|Number} 返回保留精度后的值
 *
 * @example
 *
 *   fix([-2.34355345, 0.454545， 2.454553453, 'a'])
 *   // => [-2.344, 0.455, 2.455, "a"]
 *
 *   fix(-2.34355345)
 *   // => -2.344
 */

function fix(values, degree = 3) {
  degree = Math.pow(10, degree)

  if (values instanceof Array) {
    values = values.map(function(value, i) {
      if (+value + '' === 'NaN') {
        return value 
      }
      return Math.round(value * degree) / degree
    })
  } else {
    values = Math.round(values * degree) / degree
  }

  return values
}

export default fix