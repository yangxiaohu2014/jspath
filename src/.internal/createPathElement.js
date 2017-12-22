import toString from './toString'
import isString from './isString'
/**
 * @name createPathElement
 * @description 创建svg Path Dom元素
 * @function
 * @since 0.1.0
 * @param {String} pathString 路径字符串
 * @returns {Dom} 返回SVG Path Dom.
 * @example
 *
 * const pathEl = createPathElement()
 *
 */

function createPathElement(pathString = 'M0,0') {
  var el = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  el.setAttribute('d', toString(pathString, '%s'))

  return el
}

export default createPathElement