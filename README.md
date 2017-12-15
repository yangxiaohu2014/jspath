JSPath API Design
===

函数式api

1. ### create [method]
Convert data of path to a 2-dimension array, see example below.
> create([values])

**arguments**

    values(Array|String|Null): 字符串或数组形式的路径数据

**Returns**
    
    (Array): 返回按命令分布的纯数组（同toArray方法）

How to create a [`JSPath`] object:

**Example**
```js
//create empty path
var path = create()

console.log(path)
// => [['M', 0, 0]]

// create a path with init path string
var path = create('M0, 0h3v3z') 

console.log(path)
// => [['M', 0, 0], ['h', 3], ['v', 3], ['z']]

```

2. ### toArray [method] （同上）
Convert data of path to a 2-dimension array, see example below.

> toArray([values])

3. ### toString [method]
> toString(pathData, pattern='%,')

**arguments**

    pathData (Array|String): The pathdata to be stringify.
    
    pattern (String): Formatted pattern，the value can be '%,'(default) or '%s' or '%n'
    
**Example**

 ```js
    var path = toString(['M', 0, 0, 'R', 10, 0, 0, 10, 10])
    
    console.log(path)
    // => 'M0,0A10,10,0,0,0,10,10'
    
    
    var path = toString(['M', 0, 0, 'R', 10, 0, 0, 10, 10], '%s')

    console.log(path)
    // => 'M 0,0 A 10 10 0 0 0 10,10' only coordinate use comma to split
    
    
 ```


4. ### append [method]
Append standard commands (according to [SVG Path Commands](http://www.w3.org/TR/SVG/paths.html#PathData))
> append(pathData, [values])

**arguments**
    
    pathData (Array|String): The pathdata to be appended to .

    [values] (...Array|String): The values to append.
 
**Example**

 ```js
 
var path = append('M0, 0h3v3z', ['L20,30'], 'h40')

console.log(path)
// => [['M', 0, 0], ['h', 3], ['v', 3], ['z'], ['L', 20, 30], ['h', 40]]

 ```
 
 5. ### toAbsolute [method]
 Converts `JPath` object to another, which commands use absolute coordinates.
> toAbsolute(pathData)


**arguments**

    pathData (Array|String): The pathdata to be converted to absolute path.

**Example**

 ```js
    
    var path = toAbsolute('M0,0h3v4l1,1')
    
    console.log(path)
    
    // => [['M', 0, 0], ['H', 3], ['V', 4], ['L', 4, 5]]

 ```
 
 6. ### toRelative [method]
  Converts `JPath` object to another, which commands use relative coordinates.

> toRelative(pathData)

**arguments**

    pathData (Array|String): The pathdata to be converted to relative path.
    
**Example**

 ```js
    
    var path = toAbsolute([['M', 0, 0], ['H', 3], ['V', 4], ['L', 4, 5]])
    
    console.log(path)
    
    // => 'M0,0h3v4l1,1'

 ```

 
7. ### toNormalize [method]
 Converts data of path to a normalized path. A normalized path string contains only 4 command types: `M`, `L`, `C`, `z`. All command coordinates are absolute.

> toNormalize(pathData)

**arguments**

    pathData (Array|String): The data of path to be normalized.
    
**Example**

 ```js
    var path = toNormalize('M50,50v50h70c80,200,150,200,100,10q50 60 80 70t80,90')
    
    console.log(path)
    
    // => [['M' 50,50], ['L' 50,100], ['L' 120,100], ['C' 200 300 270 300 220,110], ['C' 257.5 155 285 175 300,180], ['C' 322.5 187.5 355 230 380,270]]
    
 ```
 
 8. ### toCurve [method]
 
    Converts data of path to another which contains only `M`, `C` and `z` commands.

> toCurve(pathData)

**arguments**

    pathData (Array|String): The data of path to be curve.
    
**Example**

 ```js
    var path = toCurve('M0,0H10')

    console.log(path)
    
    // => 'M0,0C0,0,10,0,10,0'
 ```
 
 9. ### length [method]
 
> length(pathData)

    Calculate the length of path.
    
**arguments**

    pathData (Array|String): The data of path to be Calculated.

**Example**

 ```js
    var len = length('M0,0H10')

    console.log(len)
    
    // => 10
 ```
 
 10. ### at [method]
Get point coordinates and slopes on the path according to position.
 
> at(pathData, position)

**arguments**

    pathData (Array|String): The data of path to be Calculated.
    position (Number): The position at the path.
    
**Returns**
    
    (Array): 返回按命令分布的纯数组（同toArray方法）
    
**Example**

 ```js
    var vertex = at('M0,0L10,10', 2)
    
    console.log(vertex)
    
    // => {
        point: [1.414, 1.414] // sqrt(2)
        rotate: 0.7854 // PI/4
    }

 ```
 
 11. cut [method]
 
Divide the path into two parts.

> cut(pathData, position)

**arguments**

    pathData (Array|String): The data of path to be divided.
    position (Number): The divide position.
    
**Example**

 ```js
 
    var cuttedPath = cut('M0,0H100', 50)
    
    console.log(cuttedPath)
    
    // => ['M0,0H50', 'M50,0H100']
    
 ```
 
 12. sub [method]
 
> sub(pathData, position, length)

Calculate the sub path from specified position and length. If length is not specified, return sub path from position to end.


**arguments**

    pathData (Array|String): The origin data of path.
    position (Number): The start position.
    length (Number): The max Length of sub path.
    
**Example**

 ```js
 
    var subPath = sub('M0,0H100', 20, 30)
    
    console.log(subPath)
    
    // => 'M20,0H50'
 
 ```
 
 13. transform(pathData, maxtrix)
 
Transform the path using the specified matrix. The matrix should be a 6-length array.

**arguments**

    pathData (Array|String): The origin data of path.
    maxtrix (Array): The trasform maxtrix.
    
**Example**

 ```js
   
   var transformedPath = transform('M0,0H100', [1, 0, 0, 1, 10, 10])
   
   console.log(transformedPath)
   
   // => 'M10,10L110,10'
 
 ```
 
 14. tween [method]
 
Calculate the tween from the current `JPath` object to the destination `JPath` object along `t`. `t` ranges in [0, 1].

> tween(startPathData, endPathData, t)

**arguments**

    startPathData (Array|String): The start path data.
    desPathData (Number): The end path data.
    t (Number, [0, 1]): The max Length of sub path.
    
**Example**

 ```js
    var tweenPath = tween('M0,0H100', 'M0,0H50', 0.5)
    
    console.log(tweenPath)
    
    // => 'M0,0L75,0'

 ```
 
 15. render [method]
 
Render pathdata to a canvas 2d context or a svg path element.

>render(pathData, renderElement)

**arguments**

    pathData (Array|String): The start path data.
    renderElement (Path of SVG| Canvas): Svg path element or canvas element.
    
**Example**

```js
    // render to canvas
    var ctx = canvas.getContext('2d')

    render('M0,0L100,0,0,100', ctx)

    ctx.fillStyle = 'red'
    ctx.fill()

    // render to svg path element
    var pathElement = document.querySelector('svg #triangle')

    render('M0,0L100,0,0,100', pathElement) // in fact, this equals to pathElement.setAttribute('d', path);
```JSPath API Design
===

函数式api

1. ### create [method]
Convert data of path to a 2-dimension array, see example below.
> create([values])

**arguments**

    values(Array|String|Null): 字符串或数组形式的路径数据

**Returns**
    
    (Array): 返回按命令分布的纯数组（同toArray方法）

How to create a [`JSPath`] object:

**Example**
```js
//create empty path
var path = create()

console.log(path)
// => [['M', 0, 0]]

// create a path with init path string
var path = create('M0, 0h3v3z') 

console.log(path)
// => [['M', 0, 0], ['h', 3], ['v', 3], ['z']]

```

2. ### toArray [method] （同上）
Convert data of path to a 2-dimension array, see example below.

> toArray([values])

3. ### toString [method]
> toString(pathData, pattern='%,')

**arguments**

    pathData (Array|String): The pathdata to be stringify.
    
    pattern (String): Formatted pattern，the value can be '%,'(default) or '%s' or '%n'
    
**Example**

 ```js
    var path = toString(['M', 0, 0, 'R', 10, 0, 0, 10, 10])
    
    console.log(path)
    // => 'M0,0A10,10,0,0,0,10,10'
    
    
    var path = toString(['M', 0, 0, 'R', 10, 0, 0, 10, 10], '%s')

    console.log(path)
    // => 'M 0,0 A 10 10 0 0 0 10,10' only coordinate use comma to split
    
    
 ```


4. ### append [method]
Append standard commands (according to [SVG Path Commands](http://www.w3.org/TR/SVG/paths.html#PathData))
> append(pathData, [values])

**arguments**
    
    pathData (Array|String): The pathdata to be appended to .

    [values] (...Array|String): The values to append.
 
**Example**

 ```js
 
var path = append('M0, 0h3v3z', ['L20,30'], 'h40')

console.log(path)
// => [['M', 0, 0], ['h', 3], ['v', 3], ['z'], ['L', 20, 30], ['h', 40]]

 ```
 
 5. ### toAbsolute [method]
 Converts `JPath` object to another, which commands use absolute coordinates.
> toAbsolute(pathData)


**arguments**

    pathData (Array|String): The pathdata to be converted to absolute path.

**Example**

 ```js
    
    var path = toAbsolute('M0,0h3v4l1,1')
    
    console.log(path)
    
    // => [['M', 0, 0], ['H', 3], ['V', 4], ['L', 4, 5]]

 ```
 
 6. ### toRelative [method]
  Converts `JPath` object to another, which commands use relative coordinates.

> toRelative(pathData)

**arguments**

    pathData (Array|String): The pathdata to be converted to relative path.
    
**Example**

 ```js
    
    var path = toAbsolute([['M', 0, 0], ['H', 3], ['V', 4], ['L', 4, 5]])
    
    console.log(path)
    
    // => 'M0,0h3v4l1,1'

 ```

 
7. ### toNormalize [method]
 Converts data of path to a normalized path. A normalized path string contains only 4 command types: `M`, `L`, `C`, `z`. All command coordinates are absolute.

> toNormalize(pathData)

**arguments**

    pathData (Array|String): The data of path to be normalized.
    
**Example**

 ```js
    var path = toNormalize('M50,50v50h70c80,200,150,200,100,10q50 60 80 70t80,90')
    
    console.log(path)
    
    // => [['M' 50,50], ['L' 50,100], ['L' 120,100], ['C' 200 300 270 300 220,110], ['C' 257.5 155 285 175 300,180], ['C' 322.5 187.5 355 230 380,270]]
    
 ```
 
 8. ### toCurve [method]
 
    Converts data of path to another which contains only `M`, `C` and `z` commands.

> toCurve(pathData)

**arguments**

    pathData (Array|String): The data of path to be curve.
    
**Example**

 ```js
    var path = toCurve('M0,0H10')

    console.log(path)
    
    // => 'M0,0C0,0,10,0,10,0'
 ```
 
 9. ### length [method]
 
> length(pathData)

    Calculate the length of path.
    
**arguments**

    pathData (Array|String): The data of path to be Calculated.

**Example**

 ```js
    var len = length('M0,0H10')

    console.log(len)
    
    // => 10
 ```
 
 10. ### at [method]
Get point coordinates and slopes on the path according to position.
 
> at(pathData, position)

**arguments**

    pathData (Array|String): The data of path to be Calculated.
    position (Number): The position at the path.
    
**Returns**
    
    (Array): 返回按命令分布的纯数组（同toArray方法）
    
**Example**

 ```js
    var vertex = at('M0,0L10,10', 2)
    
    console.log(vertex)
    
    // => {
        point: [1.414, 1.414] // sqrt(2)
        rotate: 0.7854 // PI/4
    }

 ```
 
 11. cut [method]
 
Divide the path into two parts.

> cut(pathData, position)

**arguments**

    pathData (Array|String): The data of path to be divided.
    position (Number): The divide position.
    
**Example**

 ```js
 
    var cuttedPath = cut('M0,0H100', 50)
    
    console.log(cuttedPath)
    
    // => ['M0,0H50', 'M50,0H100']
    
 ```
 
 12. sub [method]
 
> sub(pathData, position, length)

Calculate the sub path from specified position and length. If length is not specified, return sub path from position to end.


**arguments**

    pathData (Array|String): The origin data of path.
    position (Number): The start position.
    length (Number): The max Length of sub path.
    
**Example**

 ```js
 
    var subPath = sub('M0,0H100', 20, 30)
    
    console.log(subPath)
    
    // => 'M20,0H50'
 
 ```
 
 13. transform(pathData, maxtrix)
 
Transform the path using the specified matrix. The matrix should be a 6-length array.

**arguments**

    pathData (Array|String): The origin data of path.
    maxtrix (Array): The trasform maxtrix.
    
**Example**

 ```js
   
   var transformedPath = transform('M0,0H100', [1, 0, 0, 1, 10, 10])
   
   console.log(transformedPath)
   
   // => 'M10,10L110,10'
 
 ```
 
 14. tween [method]
 
Calculate the tween from the current `JPath` object to the destination `JPath` object along `t`. `t` ranges in [0, 1].

> tween(startPathData, endPathData, t)

**arguments**

    startPathData (Array|String): The start path data.
    desPathData (Number): The end path data.
    t (Number, [0, 1]): The max Length of sub path.
    
**Example**

 ```js
    var tweenPath = tween('M0,0H100', 'M0,0H50', 0.5)
    
    console.log(tweenPath)
    
    // => 'M0,0L75,0'

 ```
 
 15. render [method]
 
Render pathdata to a canvas 2d context or a svg path element.

>render(pathData, renderElement)

**arguments**

    pathData (Array|String): The start path data.
    renderElement (Path of SVG| Canvas): Svg path element or canvas element.
    
**Example**

```js
    // render to canvas
    var ctx = canvas.getContext('2d')

    render('M0,0L100,0,0,100', ctx)

    ctx.fillStyle = 'red'
    ctx.fill()

    // render to svg path element
    var pathElement = document.querySelector('svg #triangle')

    render('M0,0L100,0,0,100', pathElement) // in fact, this equals to pathElement.setAttribute('d', path);
```
