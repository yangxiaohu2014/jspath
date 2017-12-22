const methods = ['binarySearch', 'createPathElement', 'cut', 'cutArc',
'cutBezier', 'cutLine', 'fix', 'flattern', 'getArcCenter', 'getShapes',
'shapesToArray', 'isArray', 'isNumber', 'isString', 'length', 'rotatingPoint',
'sweepAngle', 'toAbsolute', 'toArray', 'toCurve', 'toNormalize', 'toRelative',
'toString', 'transformCoord', 'upgradeBezier', 'upgradeToCurve', 'cut', 'sub',
'tween'
]

var len = methods.length
var i = 0
var jspath = {}

for (; i < len; i++) {
	let method = methods[i]
	let temp = require('./.internal/' + method).default

	jspath[method] = temp
}

window.jspath = jspath
export default jspath
