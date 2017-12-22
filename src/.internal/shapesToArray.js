/**
 * @name shapesToArray
 * @description shapes格式的数据转换成array格式
 * @function
 * @since 0.1.0
 * @param  {Array} shapes [getShapes方法得到的数据]
 * @return {Array|String} [格式化后的路径]
 *
 * @example
 *
 * shapesToArray[{"letter":"A","x":100,"y":100,"x2":150,"y2":330,"isMoved":true,
 *                "len":437.683,"sumLen":437.683,"totalLen":823.707,
 *                "seg":["A",120,60,-60,0,0,150,330]},
 *               {"letter":"L","x":150,"y":330,"x2":100,"y2":400,"isMoved":false,
 *                "len":86.023,"sumLen":523.706,"totalLen":823.707,
 *                "seg":["L",100,400]},{"letter":"L","x":100,"y":400,"x2":100,"y2":100,"isMoved":false,
 *                "len":300,"sumLen":823.706,"totalLen":823.707,"seg":["L",100,100]}]
 * // => [["M",100,100],["A",120,60,-60,0,0,150,330],["L",100,400],["L",100,100]][["M",100,100],
 *        ["A",120,60,-60,0,0,150,330],["L",100,400],["L",100,100]]
 *	 
 * shapesToArray[{"letter":"C","x":100,"y":100,"x2":36.294,"y2":372.37,"isMoved":true,
 *                "len":308.941,"sumLen":308.941,"totalLen":823.707,
 *                "seg":["C",10.039,188.773,-25.354,340.09,36.294,372.37]},
 *               {"letter":"C","x":36.294,"y":372.37,"x2":150,"y2":330,"isMoved":false,
 *                "len":128.882,"sumLen":437.823,"totalLen":823.707,
 *                "seg":["C",64.904,387.351,108.249,371.2,150,330]},
 *               {"letter":"C","x":150,"y":330,"x2":100,"y2":400,"isMoved":false,
 *                "len":86.023,"sumLen":523.846,"totalLen":823.707,
 *                "seg":["C",125,365,108.333,388.333,100,400]},
 *               {"letter":"C","x":100,"y":400,"x2":100,"y2":100,"isMoved":false,
 *                "len":300,"sumLen":823.846,"totalLen":823.707,
 *                "seg":["C",100,250,100,150,100,100]}]
 * // => [["M",100,100],["C",10.039,188.773,-25.354,340.09,36.294,372.37],
 *        ["C",64.904,387.351,108.249,371.2,150,330],["C",125,365,108.333,388.333,100,400],
 *        ["C",100,250,100,150,100,100]][["M",100,100],["C",10.039,188.773,-25.354,340.09,36.294,372.37],
 *        ["C",64.904,387.351,108.249,371.2,150,330],["C",125,365,108.333,388.333,100,400],
 *        ["C",100,250,100,150,100,100]
 *       ]
 * 
 */

function shapesToArray(shapes) {
	var result = []
	var x, y, isMoved = false, i
	var len = shapes.length
	shapes = shapes.slice(0)

	for (i = 0; i < len; i++) {
		let shape = shapes[i]
		if (shape.x !== x && shape.y !== y) {
			result.push(['M', shape.x, shape.y])
		}

		x = shape.x2
		y = shape.y2

		result.push(shape.seg)
	}

	return result
}

export default shapesToArray