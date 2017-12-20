import fix from './fix'

function _length() {
  	var el = document.createElementNS('http://www.w3.org/2000/svg', 'path')

	return function(path, degree) {
		el.setAttribute('d', toString(path, '%s'))
		return fix(el.getTotalLength(), degree)
	}
}

export default const length = _length()