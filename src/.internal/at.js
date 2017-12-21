import createPathElement from './createPathElement'
import isArray from './isArray'
import toString from './toString'
import {precision} from './config'

/**
 * [at 获取曲线上某一个位置的点坐标、切线单位向量、倾斜角弧度值表示]
 * @since 0.1.0
 * @category Path
 * @param  {Array|String} path [包含命令的路径参数数组或者字符]
 * @param  {Number} t     [相对路径的位置比例，[0, 1]]
 * @return {Object}        [分割得到定的两条贝塞尔曲线的参数数组]
 *         {point, unitVector, rad}
 * @example
 *
 *  at('M100,100A120,60,-60,0,0,150,325', .2)
 *  // => {"point":[47.88,168.15],"unitVector":[-0.106,0.994],"rad":1.677}
 *
 *  at('M100,100A120,60,-60,0,0,150,325', 0)
 *  // => {"point":[100,100],"unitVector":[-0.958,-0.286],"rad":-2.852}
 *
 *  at('M100,100A120,60,-60,0,0,150,325', 1)
 *  // => {"point":[150,325],"unitVector":[0.712,-0.703],"rad":-0.779}
 *
 *  at('M10 10 h 80 v 80 h -80 Z', 0.5)
 *  // => {"point":[90,90],"unitVector":[-0.707,0.707],"rad":2.356}
 *
 *  at('M10 10 h 80 v 80 h -80 Z', 0.2)
 *  // => {"point":[74,10],"unitVector":[1,0],"rad":0}
 */

function at(pathString, t = 0) {
  const math = Math
	var pathEl = createPathElement(isArray(pathString) ? toString(pathString) : pathString)
	var len = pathEl.getTotalLength()
	var point = pathEl.getPointAtLength(t * len)
	var behindPoint = pathEl.getPointAtLength((t + 0.0001) * len)
	var beforePoint = pathEl.getPointAtLength((t - 0.0001) * len)
  var vector = [behindPoint.x - beforePoint.x, behindPoint.y - beforePoint.y]
  var vectorMod = math.sqrt(math.pow(vector[0], 2) + math.pow(vector[1], 2))
  var unitVector = [vector[0] / vectorMod, vector[1] / vectorMod]//切线的单位向量表示
  var tanRad = math.atan(unitVector[1] / unitVector[0])
  var rad //点处的倾斜角的弧度值

  if (math.abs(unitVector[0]) <= precision) {
    rad = unitVector[1] > 0 ? (math.PI * .5) : (-math.PI * .5)
  } else if (unitVector[0] > 0) {
    rad = tanRad
  } else {
    rad = unitVector[1] > 0 ? (math.PI + tanRad) : (-math.PI + tanRad)
  }

  return {
    point: fix([point.x, point.y], 3),
    unitVector: fix(unitVector, 3),
    rad: fix(rad, 3)
  }
}

export default at
