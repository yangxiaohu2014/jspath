function isString(obj){ //判断对象是否是字符串  
  return Object.prototype.toString.call(obj) === "[object String]";  
}

export default isString