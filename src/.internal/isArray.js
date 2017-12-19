function isArray(o){
	return Object.prototype.toString.call(o)=='[object Array]'
}

export default isArray