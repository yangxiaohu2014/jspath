/**
 * @name cutData
 * @description 分割相邻数据
 * @function
 * @param  {Num} t [分割的位置，[0, 1]]
 * @private
 * @returns {function}   [分割函数]
 */

function cutData(t) {
    return function(p, q) {
        return p + t * (q - p)
    }
}

export default cutData