import toAbsolute from './toAbsolute'
import toString from './toString'
import length from './length'

/**
 * @name toNormalize
 * @description 将路径转换成仅包含M、L、C、Q、A命令的格式
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [路径字符串或数组]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array|String}   [格式化后的路径]
 *
 * @example
 *
 * toNormalize('M10 10 h 80 v 80 h -80 L 20 40 Z')
 * // => [["M",10,10],["L",90,10],["L",90,90],["L",10,90],["L",10,10]]
 * 
 * toNormalize('M50,50v50h70c80,200,150,200,100,10q50 60 80 70t80,90 Z', '%s')
 * // => "M 50,50 L 50,100 L 120,100 C 200 300 270 300 220,110 
 *        Q 270 170 300,180 Q 490 370 380,270 L 50,50"
 *
 */

function toNormalize(path, pattern = '[]') {
  var absPathArray = toAbsolute(path, '[]')
  var len = absPathArray.length
  var x0, y0, x, y, x1, y1, x2, y2, preType, type, len1, i 
  var newPath = []

  for (i = 0; i < len; i++) {
    let seg = absPathArray[i].slice(0)
    let newSeg = []

    type = seg.shift()
    len1 = seg.length

    switch(type) {
      case 'M':
        x0 = x = seg[0]
        y0 = y = seg[1]
        newSeg = ['M', x, y]
        preType = 'M'
        break
      case 'L':
      case 'H':
      case 'V':
      case 'Z':
        console.log(type, x0, x)
        x = type === 'Z' ? x0 : type === 'V' ? x : seg[0]
        y = type === 'Z' ? y0 : type === 'H' ? y : type === 'V' ? seg[0] : seg[1]
        console.log(type, x0, x)
        console.log('=========')
        newSeg = ['L', x, y]
        preType = 'L'
        break
      case 'A':
        x = seg[len1 - 2]
        y = seg[len1 - 1]
        newSeg = ['A', ...seg]
        preType = 'A'
        break
      case 'Q':
        x1 = seg[len1 - 4]
        y1 = seg[len1 - 3]
        x = seg[len1 - 2]
        y = seg[len1 - 1]
        newSeg = ['Q', ...seg]
        preType = 'Q'
        break
      case 'T':
        x = seg[len1 - 2]
        y = seg[len1 - 1]
        x1 = preType === 'Q' ? (2 * x - x1) : x
        y1 = preType === 'Q' ? (2 * y - y1) : y
        newSeg = ['Q', x1, y1, ...seg]
        preType = 'Q'
        break
      case 'C':
        x = seg[len1 - 2]
        y = seg[len1 - 1]
        x1 = seg[len1 - 4]
        y1 = seg[len1 - 3]
        newSeg = ['C', ...seg]
        preType = 'C'
        break
      case 'S':
        x = seg[len1 - 2]
        y = seg[len1 - 1]
        x1 = preType === 'C' ? (2 * x - x1) : x
        y1 = preType === 'C' ? (2 * y - y1) : y
        newSeg = ['C', x1, y1, ...seg]
        preType = 'C'
        break
      default:
        break
    }

    if (newSeg.length) {
      newPath.push(newSeg)
    }
  }

  if (pattern === '[]') {
    return newPath
  }

  return toString(newPath, pattern)
}

export default toNormalize
