/**
 * @name sweepAngle
 * @description P0P1绕点P0逆时针旋转到P0P2扫过的角度
 * @function
 * @since 0.1.0
 * @param {Array} points 三个点坐标P0[x0, y0], P1[x1, y1], P2[x2, y2], 则points[x0, y0, x1, y1, x2, y2]        
 * @returns {Number} 返回角度，单位度
 *
 * @example
 *
 * sweepAngle([1, 2, -1, 2, 1, 3])
 * 
 * // => 270
 */

function sweepAngle(points) {
    var v1 = [points[2] - points[0], points[3] - points[1]]
    var v2 = [points[4] - points[0], points[5] - points[1]]
    var l1 = Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1])
    var l2 = Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1])
    var PI = Math.PI
    var angle, angle2

    angle = Math.acos(v1[0] / l1)
    angle = v1[1] > 0 ? angle : PI * 2 - angle

    angle2 = Math.acos(v2[0] / l2)
    angle2 = v2[1] > 0 ? angle2 : PI * 2 - angle2

    angle = angle2 - angle

    if (angle < 0) {
        angle = PI * 2 + angle
    }
    
    return angle * 180 / PI
}

export default sweepAngle

