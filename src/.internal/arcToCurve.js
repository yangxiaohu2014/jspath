import isArray from './isArray'
import isString from './isString'
import toString from './toString'
import fix from './fix'

/**
 * @name arcToCurve
 * @description 将圆弧转化成若干条三次贝塞尔曲线
 * @function
 * @since 0.1.0
 * @param  {Array|String} path [圆弧参数数组或者包含M、A命令符字符]
 * @param  {string} pattern [输出的格式，可选项为'[]', '%,', '%s', '%/n']
 * @returns {Array}        [三次贝塞尔曲线]
 * @example
 *
 *  arcToCurve([0,0, 100,60, -30, 1,0, 30, 90], '[]')
 *  // => [["M",0,0],["C",-63.085,-1.754,-136.713,57.212,-132.531,106.139],["C",-128.349,155.066,-49.493,157.259,9.409,110.086],["C",17.178,103.864,24.121,97.091,30,90]]
 *  
 *  arcToCurve([0,0, 100,60, -30, 1,0, 30, 90], '%s')
 *  // => "M 0,0 C -63.085 -1.754 -136.713 57.212 -132.531,106.139 C -128.349 155.066 -49.493 157.259 9.409,110.086 C 17.178 103.864 24.121 97.091 30,90"
 *
 *  arcToCurve("M0,0A100,60, -30, 1,0, 30, 90", '%s')
 *  // => "M 0,0 C -63.085 -1.754 -136.713 57.212 -132.531,106.139 C -128.349 155.066 -49.493 157.259 9.409,110.086 C 17.178 103.864 24.121 97.091 30,90"
 *
 */

function arcToCurve(path, pattern = '[]') {
    if (!isString(path) && !isArray(path)) {
        return console.warn('path必须是长度为9的数组或者包含M和A命令符的字符串')
    }

    var param = isArray(path) ? path.slice(0) : flattern(toAbsolute(path, '[]', true))
    var curve = fix(a2c(param), 3)
    var count = Math.round(curve.length / 6)
    var result = [['M', param[0], param[1]]], i

    for (i = 0; i < count; i++) {
    	result.push(['C', ...curve.slice(6 * i, 6 * i + 6)])
    }

    if (pattern === '[]') {
    	return result
    }

    return toString(result, pattern)
}

export default arcToCurve

function a2c([x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2], recursive) {
    // for more information of where this math came from visit:
    // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
    var math = Math,
    	PI = math.PI,
    	_120 = PI * 120 / 180,
        rad = PI / 180 * (+angle || 0),
        res = [],
        xy,
        rotate = function (x, y, rad) {
            var X = x * math.cos(rad) - y * math.sin(rad),
                Y = x * math.sin(rad) + y * math.cos(rad);
            return {x: X, y: Y};
        }
    if (!rx || !ry) {
        return [x1, y1, x2, y2, x2, y2];
    }
    if (!recursive) {
        xy = rotate(x1, y1, -rad);
        x1 = xy.x;
        y1 = xy.y;
        xy = rotate(x2, y2, -rad);
        x2 = xy.x;
        y2 = xy.y;
        var cos = math.cos(PI / 180 * angle),
            sin = math.sin(PI / 180 * angle),
            x = (x1 - x2) / 2,
            y = (y1 - y2) / 2;
        var h = x * x / (rx * rx) + y * y / (ry * ry);
        if (h > 1) {
            h = math.sqrt(h);
            rx = h * rx;
            ry = h * ry;
        }
        var rx2 = rx * rx,
            ry2 = ry * ry,
            k = (large_arc_flag == sweep_flag ? -1 : 1) *
                math.sqrt(math.abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
            cx = k * rx * y / ry + (x1 + x2) / 2,
            cy = k * -ry * x / rx + (y1 + y2) / 2,
            f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
            f2 = math.asin(((y2 - cy) / ry).toFixed(9));

        f1 = x1 < cx ? PI - f1 : f1;
        f2 = x2 < cx ? PI - f2 : f2;
        f1 < 0 && (f1 = PI * 2 + f1);
        f2 < 0 && (f2 = PI * 2 + f2);
        if (sweep_flag && f1 > f2) {
            f1 = f1 - PI * 2;
        }
        if (!sweep_flag && f2 > f1) {
            f2 = f2 - PI * 2;
        }
    } else {
        f1 = recursive[0];
        f2 = recursive[1];
        cx = recursive[2];
        cy = recursive[3];
    }
    var df = f2 - f1;
    if (math.abs(df) > _120) {
        var f2old = f2,
            x2old = x2,
            y2old = y2;
        f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
        x2 = cx + rx * math.cos(f2);
        y2 = cy + ry * math.sin(f2);
        res = a2c([x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old], [f2, f2old, cx, cy]);
    }
    df = f2 - f1;
    var c1 = math.cos(f1),
        s1 = math.sin(f1),
        c2 = math.cos(f2),
        s2 = math.sin(f2),
        t = math.tan(df / 4),
        hx = 4 / 3 * rx * t,
        hy = 4 / 3 * ry * t,
        m1 = [x1, y1],
        m2 = [x1 + hx * s1, y1 - hy * c1],
        m3 = [x2 + hx * s2, y2 - hy * c2],
        m4 = [x2, y2];
    m2[0] = 2 * m1[0] - m2[0];
    m2[1] = 2 * m1[1] - m2[1];
    if (recursive) {
        return [m2, m3, m4].concat(res);
    } else {
        res = [m2, m3, m4].concat(res).join().split(",");
        var newres = [];
        for (var i = 0, ii = res.length; i < ii; i++) {
            newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
        }
        return newres;
    }
}