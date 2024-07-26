import {fromObject, scale, transform, translate} from 'transformation-matrix';

import {
  ACTION_ZOOM, MODE_IDLE, MODE_ZOOMING,
  ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT, ALIGN_TOP, ALIGN_BOTTOM, ALIGN_COVER
} from '../constants';
import {decompose, getSVGPoint, set} from './common';
import calculateBox from '../utils/calculateBox';

export function isZoomLevelGoingOutOfBounds(value, scaleFactor) {
  const {scaleFactor: curScaleFactor} = decompose(value)
  const lessThanScaleFactorMin = value.scaleFactorMin && (curScaleFactor * scaleFactor) < value.scaleFactorMin;
  const moreThanScaleFactorMax = value.scaleFactorMax && (curScaleFactor * scaleFactor) > value.scaleFactorMax;

  return (lessThanScaleFactorMin && scaleFactor < 1) || (moreThanScaleFactorMax && scaleFactor > 1);
}

export function limitZoomLevel(value, matrix) {
  let scaleLevel = matrix.a;

  if(value.scaleFactorMin != null) {
    // limit minimum zoom
    scaleLevel = Math.max(scaleLevel, value.scaleFactorMin);
  }

  if(value.scaleFactorMax != null) {
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

  const matrix = transform(
    fromObject(value),
    translate(SVGPointX, SVGPointY),
    scale(scaleFactor, scaleFactor),
    translate(-SVGPointX, -SVGPointY)
  );

  return set(value, {
    mode: MODE_IDLE,
    ...matrix,
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }, ACTION_ZOOM);
}

//ENHANCEMENT: add ability to selectively fit image inside viewer
export function fitSelection(value, selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight, SVGAlignX=ALIGN_LEFT, SVGAlignY=ALIGN_TOP) {
  let {viewerWidth, viewerHeight} = value;

  let scaleX = viewerWidth / selectionWidth;
  let scaleY = viewerHeight / selectionHeight;
  let scaleLevel = Math.min(scaleX, scaleY);

  let scaleMatrix = scale(scaleLevel, scaleLevel);

  let translateX = -selectionSVGPointX * scaleX;
  let translateY = -selectionSVGPointY * scaleY;

  // after fitting, SVG and the viewer will match in width (1) or in height (2) or SVG will cover the container with preserving aspect ratio (0)
  if (scaleX < scaleY) {
    let remainderY = viewerHeight - scaleX * selectionHeight;

    //(1) match in width, meaning scaled SVGHeight <= viewerHeight
    switch(SVGAlignY) {
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
        let remainderX = viewerWidth - scaleY * selectionWidth; // calculate remainder in the other scale
  
        translateX = selectionSVGPointX + Math.round(remainderX / 2); // center by the long edge
      break;

      default:
        //no op
    }
  } else {
    let remainderX = viewerWidth - scaleY * selectionWidth;

    //(2) match in height, meaning scaled SVGWidth <= viewerWidth
    switch(SVGAlignX) {
      case ALIGN_LEFT:
        translateX = -selectionSVGPointX * scaleLevel;
      break;

      case ALIGN_CENTER:
        translateX = Math.round(remainderX / 2) - selectionSVGPointX * scaleLevel;
      break;

      case ALIGN_RIGHT:
        translateX = remainderX - selectionSVGPointX * scaleLevel;
      break;

      case ALIGN_COVER:
        scaleMatrix = scale(scaleX, scaleX); // (0) we must now match to short edge, in this case - width
        let remainderY = viewerHeight - scaleX * selectionHeight; // calculate remainder in the other scale
  
        translateY = selectionSVGPointY + Math.round(remainderY / 2); // center by the long edge
      break;

      default:
        //no op
    }
  }

  const translationMatrix = translate(translateX, translateY);

  const matrix = transform(
    translationMatrix, //2
    scaleMatrix        //1
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

  return set(value, {
    mode: MODE_IDLE,
    ...limitZoomLevel(value, matrix),
    startX: null,
    startY: null,
    endX: null,
    endY: null
  }, ACTION_ZOOM);
}

export function fitToViewer(value, SVGAlignX=ALIGN_CENTER, SVGAlignY=ALIGN_CENTER) {
  let {SVGMinX, SVGMinY, SVGWidth, SVGHeight} = value;
  return fitSelection(value, SVGMinX, SVGMinY, SVGWidth, SVGHeight, SVGAlignX, SVGAlignY);  
}

export function zoomOnViewerCenter(value, scaleFactor) {
  let {viewerWidth, viewerHeight} = value;
  let SVGPoint = getSVGPoint(value, viewerWidth / 2, viewerHeight / 2);
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
  const TOLERATED_DISTANCE = 7 //minimum distance to choose if area selection or drill down on point
  let {startX, startY} = value;

  let start = getSVGPoint(value, startX, startY);
  let end = getSVGPoint(value, viewerX, viewerY);

  if (Math.abs(startX - viewerX) > TOLERATED_DISTANCE && Math.abs(startY - viewerY) > TOLERATED_DISTANCE) {
    let box = calculateBox(start, end);
    return fitSelection(value, box.x, box.y, box.width, box.height);
  } else {
    let SVGPoint = getSVGPoint(value, viewerX, viewerY);
    return zoom(value, SVGPoint.x, SVGPoint.y, scaleFactor);
  }
}
