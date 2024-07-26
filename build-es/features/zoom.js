function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { fromObject, scale, transform, translate } from 'transformation-matrix';
import { ACTION_ZOOM, MODE_IDLE, MODE_ZOOMING, ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM, ALIGN_COVER } from '../constants';
import { decompose, getSVGPoint, set } from './common';
import calculateBox from '../utils/calculateBox';
export function isZoomLevelGoingOutOfBounds(value, scaleFactor) {
  var _decompose = decompose(value),
    curScaleFactor = _decompose.scaleFactor;
  var lessThanScaleFactorMin = value.scaleFactorMin && curScaleFactor * scaleFactor < value.scaleFactorMin;
  var moreThanScaleFactorMax = value.scaleFactorMax && curScaleFactor * scaleFactor > value.scaleFactorMax;
  return lessThanScaleFactorMin && scaleFactor < 1 || moreThanScaleFactorMax && scaleFactor > 1;
}
export function limitZoomLevel(value, matrix) {
  var scaleLevel = matrix.a;
  if (value.scaleFactorMin != null) {
    // limit minimum zoom
    scaleLevel = Math.max(scaleLevel, value.scaleFactorMin);
  }
  if (value.scaleFactorMax != null) {
    // limit maximum zoom
    scaleLevel = Math.min(scaleLevel, value.scaleFactorMax);
  }
  return set(matrix, {
    a: scaleLevel,
    d: scaleLevel
  });
}
export function zoom(value, SVGPointX, SVGPointY, scaleFactor) {
  if (isZoomLevelGoingOutOfBounds(value, scaleFactor)) {
    // Do not change translation and scale of value
    return value;
  }
  var matrix = transform(fromObject(value), translate(SVGPointX, SVGPointY), scale(scaleFactor, scaleFactor), translate(-SVGPointX, -SVGPointY));
  return set(value, _objectSpread(_objectSpread({
    mode: MODE_IDLE
  }, matrix), {}, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }), ACTION_ZOOM);
}

//ENHANCEMENT: add ability to selectively fit image inside viewer
export function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
  var SVGAlignX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : ALIGN_LEFT;
  var SVGAlignY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ALIGN_TOP;
  var viewerWidth = value.viewerWidth,
    viewerHeight = value.viewerHeight;
  var scaleX = viewerWidth / selectionWidth;
  var scaleY = viewerHeight / selectionHeight;
  var scaleLevel = Math.min(scaleX, scaleY);
  var scaleMatrix = scale(scaleLevel, scaleLevel);
  var translateX = -selectionSVGPointX * scaleX;
  var translateY = -selectionSVGPointY * scaleY;

  // after fitting, SVG and the viewer will match in width (1) or in height (2) or SVG will cover the container with preserving aspect ratio (0)
  if (scaleX < scaleY) {
    var remainderY = viewerHeight - scaleX * selectionHeight;

    //(1) match in width, meaning scaled SVGHeight <= viewerHeight
    switch (SVGAlignY) {
      case ALIGN_TOP:
        translateY = -selectionSVGPointY * scaleLevel;
        break;
      case ALIGN_CENTER:
        translateY = Math.round(remainderY / 2) - selectionSVGPointY * scaleLevel;
        break;
      case ALIGN_BOTTOM:
        translateY = remainderY - selectionSVGPointY * scaleLevel;
        break;
      case ALIGN_COVER:
        scaleMatrix = scale(scaleY, scaleY); // (0) we must now match to short edge, in this case - height
        var remainderX = viewerWidth - scaleY * selectionWidth; // calculate remainder in the other scale

        translateX = selectionSVGPointX + Math.round(remainderX / 2); // center by the long edge
        break;
      default:
      //no op
    }
  } else {
    var _remainderX = viewerWidth - scaleY * selectionWidth;

    //(2) match in height, meaning scaled SVGWidth <= viewerWidth
    switch (SVGAlignX) {
      case ALIGN_LEFT:
        translateX = -selectionSVGPointX * scaleLevel;
        break;
      case ALIGN_CENTER:
        translateX = Math.round(_remainderX / 2) - selectionSVGPointX * scaleLevel;
        break;
      case ALIGN_RIGHT:
        translateX = _remainderX - selectionSVGPointX * scaleLevel;
        break;
      case ALIGN_COVER:
        scaleMatrix = scale(scaleX, scaleX); // (0) we must now match to short edge, in this case - width
        var _remainderY = viewerHeight - scaleX * selectionHeight; // calculate remainder in the other scale

        translateY = selectionSVGPointY + Math.round(_remainderY / 2); // center by the long edge
        break;
      default:
      //no op
    }
  }

  var translationMatrix = translate(translateX, translateY);
  var matrix = transform(translationMatrix,
  //2
  scaleMatrix //1
  );

  if (isZoomLevelGoingOutOfBounds(value, scaleLevel / value.d)) {
    // Do not allow scale and translation
    return set(value, {
      mode: MODE_IDLE,
      startX: null,
      startY: null,
      endX: null,
      endY: null
    });
  }
  return set(value, _objectSpread(_objectSpread({
    mode: MODE_IDLE
  }, limitZoomLevel(value, matrix)), {}, {
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }), ACTION_ZOOM);
}
export function fitToViewer(value) {
  var SVGAlignX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ALIGN_CENTER;
  var SVGAlignY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ALIGN_CENTER;
  var SVGMinX = value.SVGMinX,
    SVGMinY = value.SVGMinY,
    SVGWidth = value.SVGWidth,
    SVGHeight = value.SVGHeight;
  return fitSelection(value, SVGMinX, SVGMinY, SVGWidth, SVGHeight, SVGAlignX, SVGAlignY);
}
export function zoomOnViewerCenter(value, scaleFactor) {
  var viewerWidth = value.viewerWidth,
    viewerHeight = value.viewerHeight;
  var SVGPoint = getSVGPoint(value, viewerWidth / 2, viewerHeight / 2);
  return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
}
export function startZooming(value, viewerX, viewerY) {
  return set(value, {
    mode: MODE_ZOOMING,
    startX: viewerX,
    startY: viewerY,
    endX: viewerX,
    endY: viewerY
  });
}
export function updateZooming(value, viewerX, viewerY) {
  if (value.mode !== MODE_ZOOMING) throw new Error('update selection not allowed in this mode ' + value.mode);
  return set(value, {
    endX: viewerX,
    endY: viewerY
  });
}
export function stopZooming(value, viewerX, viewerY, scaleFactor) {
  var TOLERATED_DISTANCE = 7; //minimum distance to choose if area selection or drill down on point
  var startX = value.startX,
    startY = value.startY;
  var start = getSVGPoint(value, startX, startY);
  var end = getSVGPoint(value, viewerX, viewerY);
  if (Math.abs(startX - viewerX) > TOLERATED_DISTANCE && Math.abs(startY - viewerY) > TOLERATED_DISTANCE) {
    var box = calculateBox(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    var SVGPoint = getSVGPoint(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
}