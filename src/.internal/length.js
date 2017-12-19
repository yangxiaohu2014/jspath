import createPathElement from './createPathElement'
import toString from './toString'

function length(path) {
  var pathEl = createPathElement(path)

  pathEl.setAttribute('d', toString(path))
  
  return pathEl.getTotalLength()
}