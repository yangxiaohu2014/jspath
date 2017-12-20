var _names = [
    {
      to: 'toCurve',
      name: '贝塞尔曲线化'
    },
    {
      to: 'tween',
      name: '变形动画'
    },
    {
      to: 'cutBezier',
      name: '切割贝塞尔曲线'
    },
    {
      to: 'cutArc',
      name: '切割圆弧'
    },
    {
      to: 'getArcCenter',
      name: '获取椭圆弧中心'
    }
]

var _routes = []

for (let i = 0; i < _names.length; i++) {
	let route = {}
	let to = _names[i].to
	let comp = require('@demo/components/' + to + '.vue').default

	route.path = '/' + to
	route.name = _names[i].name

  to = to[0].toUpperCase() + to.slice(1)

	eval('var ' + to + '=comp;route.component=' + to)
	_routes.push(route)
}

console.log(_routes)

export const names = _names
export const routes = _routes

