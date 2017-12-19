/**
 * 创建svg Path Dom元素
 *
 * @since 0.1.0
 * @category Path
 * @param {String} pathString 路径字符串
 * @returns {Dom} 返回SVG Path Dom.
 * @example
 *
 * const pathEl = createPathElement()
 *
 */
function createPathElement(pathString = 'M0,0') {
  var el = document.createElementNS('http://www.w3.org/2000/svg', 'path')

  el.setAttribute('d', pathString)

  return el
}

export default createPathElement