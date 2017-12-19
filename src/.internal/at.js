import createPathElement from './createPathElement'
import isArray from './isArray'
import toString from './toString'
import precision from './config'

function at(pathString, t = 0) {
	var pathEl = createPathElement(isArray(pathString) ? toString(pathString) : pathString)
	var len = pathEl.getTotalLength()
	var point = pathEl.getPointAtLength(t * len)
	var behindPoint = pathEl.getPointAtLength((t + 0.0001) * len)
	var beforePoint = pathEl.getPointAtLength((t - 0.0001) * len)
	var angle, tangent



}

function at(path, position) {
  if (position < 0 || position > totalLength) {
    console.log('position is not in range of the path length');
    return;
  }

  var pathElement = _createPathElement();
  var curPoint = [];
  var frontPoint = [];
  var behindPoint = [];
  var dl = 0.5;
  var totalLength;
  var rotate;
  var tangent;

  pathElement.setAttribute('d', path);
  totalLength = pathElement.getTotalLength();

  curPoint = pathElement.getPointAtLength(position);

  position = max(position - dl, 0);
  frontPoint = pathElement.getPointAtLength(position);
  frontPoint = (dl >= sqrt(pow(frontPoint.x - curPoint.x, 2) + pow(frontPoint.y - curPoint.y, 2))) ? frontPoint : curPoint; // 考虑断点情况

  position = min(position + dl, totalLength);
  behindPoint = pathElement.getPointAtLength(position);
  behindPoint = (dl >= sqrt(pow(behindPoint.x - curPoint.x, 2) + pow(behindPoint.y - curPoint.y, 2))) ? behindPoint : curPoint; // 考虑断点情况

  rotate = (abs(behindPoint.x - frontPoint.x) > precision) ? atan((behindPoint.y - frontPoint.y) / (behindPoint.x - frontPoint.x)) :
    (behindPoint.y > frontPoint.y) ? PI * 0.5 : -PI * 0.5;
  tangent = [cos(rotate), sin(rotate)];

  return {
    point: fix([curPoint.x, curPoint.y]),
    tangent: fix(tangent),
    rotate: fix(rotate)
  };
}