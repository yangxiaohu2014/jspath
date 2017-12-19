/**
 * 一点绕着一固定点旋转得到新点
 *
 * @since 0.1.0
 * @category Math
 * @param {Array} points 依次为固定点、绕点坐标。
 * @param {number} beta 旋转的角度，范围为[-PI, PI]
 * @returns {Array} 返回旋转后的新点坐标
 * @example
 * 
 *   rotatingPoint([0, 0, 1, 0], Math.PI / 4);
 *   // => [0.7071, 0.7071]
 *
 *   rotatingPoint([0, 0, 1, 0], -3 * Math.PI / 4);
 *   // => [-0.7071, -0.7071]; 
 *
 */

function rotatingPoint(points, beta = 0) {
    var x0  = points[2] - points[0] // 旋转点平移后的x
    var y0  = points[3] - points[1] // 旋转点平移后的y
    var x1, y1

    x1   = x0 * Math.cos(beta) - y0 * Math.sin(beta)  // 向量旋转
    y1   = x0 * Math.sin(beta) + y0 * Math.cos(beta)

    x1  += points[0] // 平移回去
    y1  += points[1]

    return [x1, y1]
}

export default rotatingPoint

