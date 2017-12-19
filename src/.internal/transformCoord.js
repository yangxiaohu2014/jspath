/**
 * [transformCoord 坐标矩阵转换]
 * @since 0.1.0
 * @category Util
 * @param  {Array} coord [二维坐标]
 * @param  {Array} matrix [转化数组]
 *    [a, b, c, d, e, f]等价
 *      a c e
    	b d f
    	0 0 1
 * @return {Array}        [新坐标]
 *
 */

function transformCoord(coord, matrix) {
    return [matrix[0] * coord[0] + matrix[2] * coord[1] + matrix[4],
        matrix[1] * coord[0] + matrix[3] * coord[1] + matrix[5]
    ]
}