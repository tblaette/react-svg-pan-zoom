"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _transformationMatrix = require("transformation-matrix");
var _eventFactory = _interopRequireDefault(require("./events/event-factory"));
var _pan2 = require("./features/pan");
var _common = require("./features/common");
var _interactions = require("./features/interactions");
var _parseViewBox5 = _interopRequireDefault(require("./utils/parseViewBox"));
var _interactionsTouch = require("./features/interactions-touch");
var _zoom2 = require("./features/zoom");
var _miniature = require("./features/miniature");
var _cursorPolyfill = _interopRequireDefault(require("./ui/cursor-polyfill"));
var _borderGradient = _interopRequireDefault(require("./ui/border-gradient"));
var _selection = _interopRequireDefault(require("./ui/selection"));
var _toolbar = _interopRequireDefault(require("./ui-toolbar/toolbar"));
var _detectTouch = _interopRequireDefault(require("./ui/detect-touch"));
var _miniature2 = _interopRequireDefault(require("./ui-miniature/miniature"));
var _constants = require("./constants");
var _migrationTips = require("./migration-tips");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ReactSVGPanZoom = /*#__PURE__*/function (_React$Component) {
  _inherits(ReactSVGPanZoom, _React$Component);
  var _super = _createSuper(ReactSVGPanZoom);
  function ReactSVGPanZoom(props, context) {
    var _this;
    _classCallCheck(this, ReactSVGPanZoom);
    var viewerWidth = props.width,
      viewerHeight = props.height,
      scaleFactorMin = props.scaleFactorMin,
      scaleFactorMax = props.scaleFactorMax,
      children = props.children;
    var SVGViewBox = children.props.viewBox;
    var defaultValue;
    if (SVGViewBox) {
      var _parseViewBox = (0, _parseViewBox5.default)(SVGViewBox),
        _parseViewBox2 = _slicedToArray(_parseViewBox, 4),
        SVGMinX = _parseViewBox2[0],
        SVGMinY = _parseViewBox2[1],
        SVGWidth = _parseViewBox2[2],
        SVGHeight = _parseViewBox2[3];
      defaultValue = (0, _common.getDefaultValue)(viewerWidth, viewerHeight, SVGMinX, SVGMinY, SVGWidth, SVGHeight, scaleFactorMin, scaleFactorMax);
    } else {
      var _children$props = children.props,
        _SVGWidth = _children$props.width,
        _SVGHeight = _children$props.height;
      defaultValue = (0, _common.getDefaultValue)(viewerWidth, viewerHeight, 0, 0, _SVGWidth, _SVGHeight, scaleFactorMin, scaleFactorMax);
    }
    _this = _super.call(this, props, context);
    _this.ViewerDOM = null;
    _this.state = {
      pointerX: null,
      pointerY: null,
      defaultValue: defaultValue
    };
    _this.autoPanLoop = _this.autoPanLoop.bind(_assertThisInitialized(_this));
    _this.onWheel = _this.onWheel.bind(_assertThisInitialized(_this));
    if (process.env.NODE_ENV !== 'production') {
      (0, _migrationTips.printMigrationTipsRelatedToProps)(props);
    }
    return _this;
  }

  /** React hooks **/
  _createClass(ReactSVGPanZoom, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var value = this.getValue();
      var props = this.props;
      var nextValue = value;
      var needUpdate = false;
      if (process.env.NODE_ENV !== 'production') {
        (0, _migrationTips.printMigrationTipsRelatedToProps)(props);
      }

      // This block checks the size of the SVG
      var SVGViewBox = props.children.props.viewBox;
      if (SVGViewBox) {
        // if the viewBox prop is specified
        var _parseViewBox3 = (0, _parseViewBox5.default)(SVGViewBox),
          _parseViewBox4 = _slicedToArray(_parseViewBox3, 4),
          x = _parseViewBox4[0],
          y = _parseViewBox4[1],
          width = _parseViewBox4[2],
          height = _parseViewBox4[3];
        if (value.SVGMinX !== x || value.SVGMinY !== y || value.SVGWidth !== width || value.SVGHeight !== height) {
          nextValue = (0, _common.setSVGViewBox)(nextValue, x, y, width, height);
          needUpdate = true;
        }
      } else {
        // if the width and height props are specified
        var _props$children$props = props.children.props,
          SVGWidth = _props$children$props.width,
          SVGHeight = _props$children$props.height;
        if (value.SVGWidth !== SVGWidth || value.SVGHeight !== SVGHeight) {
          nextValue = (0, _common.setSVGViewBox)(nextValue, 0, 0, SVGWidth, SVGHeight);
          needUpdate = true;
        }
      }

      // This block checks the size of the viewer
      if (prevProps.width !== props.width || prevProps.height !== props.height) {
        nextValue = (0, _common.setViewerSize)(nextValue, props.width, props.height);
        needUpdate = true;
      }

      // This blocks checks the scale factors
      if (prevProps.scaleFactorMin !== props.scaleFactorMin || prevProps.scaleFactorMax !== props.scaleFactorMax) {
        nextValue = (0, _common.setZoomLevels)(nextValue, props.scaleFactorMin, props.scaleFactorMax);
        needUpdate = true;
      }
      if (needUpdate) {
        this.setValue(nextValue);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.autoPanIsRunning = true;
      requestAnimationFrame(this.autoPanLoop);
      this.ViewerDOM.addEventListener('wheel', this.onWheel, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.autoPanIsRunning = false;
      this.ViewerDOM.removeEventListener('wheel', this.onWheel);
    }

    /** ReactSVGPanZoom handlers **/
  }, {
    key: "getValue",
    value: function getValue() {
      if ((0, _common.isValueValid)(this.props.value)) return this.props.value;
      return this.state.defaultValue;
    }
  }, {
    key: "getTool",
    value: function getTool() {
      if (this.props.tool) return this.props.tool;
      return _constants.TOOL_NONE;
    }
  }, {
    key: "setValue",
    value: function setValue(nextValue) {
      var _this$props = this.props,
        onChangeValue = _this$props.onChangeValue,
        onZoom = _this$props.onZoom,
        onPan = _this$props.onPan;
      if (onChangeValue) onChangeValue(nextValue);
      if (nextValue.lastAction) {
        if (onZoom && nextValue.lastAction === _constants.ACTION_ZOOM) onZoom(nextValue);
        if (onPan && nextValue.lastAction === _constants.ACTION_PAN) onPan(nextValue);
      }
    }

    /** ReactSVGPanZoom methods **/
  }, {
    key: "pan",
    value: function pan(SVGDeltaX, SVGDeltaY) {
      var nextValue = (0, _pan2.pan)(this.getValue(), SVGDeltaX, SVGDeltaY);
      this.setValue(nextValue);
    }
  }, {
    key: "zoom",
    value: function zoom(SVGPointX, SVGPointY, scaleFactor) {
      var nextValue = (0, _zoom2.zoom)(this.getValue(), SVGPointX, SVGPointY, scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: "fitSelection",
    value: function fitSelection(selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight) {
      var SVGAlignX = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _constants.ALIGN_LEFT;
      var SVGAlignY = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _constants.ALIGN_TOP;
      var nextValue = (0, _zoom2.fitSelection)(this.getValue(), selectionSVGPointX, selectionSVGPointY, selectionWidth, selectionHeight, SVGAlignX, SVGAlignY);
      this.setValue(nextValue);
    }
  }, {
    key: "fitToViewer",
    value: function fitToViewer() {
      var SVGAlignX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants.ALIGN_LEFT;
      var SVGAlignY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _constants.ALIGN_TOP;
      var nextValue = (0, _zoom2.fitToViewer)(this.getValue(), SVGAlignX, SVGAlignY);
      this.setValue(nextValue);
    }
  }, {
    key: "zoomOnViewerCenter",
    value: function zoomOnViewerCenter(scaleFactor) {
      var nextValue = (0, _zoom2.zoomOnViewerCenter)(this.getValue(), scaleFactor);
      this.setValue(nextValue);
    }
  }, {
    key: "setPointOnViewerCenter",
    value: function setPointOnViewerCenter(SVGPointX, SVGPointY, zoomLevel) {
      var nextValue = (0, _common.setPointOnViewerCenter)(this.getValue(), SVGPointX, SVGPointY, zoomLevel);
      this.setValue(nextValue);
    }
  }, {
    key: "reset",
    value: function reset() {
      var nextValue = (0, _common.reset)(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: "openMiniature",
    value: function openMiniature() {
      var nextValue = (0, _miniature.openMiniature)(this.getValue());
      this.setValue(nextValue);
    }
  }, {
    key: "closeMiniature",
    value: function closeMiniature() {
      var nextValue = (0, _miniature.closeMiniature)(this.getValue());
      this.setValue(nextValue);
    }

    /** ReactSVGPanZoom internals **/
  }, {
    key: "handleViewerEvent",
    value: function handleViewerEvent(event) {
      var props = this.props,
        ViewerDOM = this.ViewerDOM;
      if (!([_constants.TOOL_NONE, _constants.TOOL_AUTO].indexOf(this.getTool()) >= 0)) return;
      if (event.target === ViewerDOM) return;
      var eventsHandler = {
        click: props.onClick,
        dblclick: props.onDoubleClick,
        mousemove: props.onMouseMove,
        mouseup: props.onMouseUp,
        mousedown: props.onMouseDown,
        touchstart: props.onTouchStart,
        touchmove: props.onTouchMove,
        touchend: props.onTouchEnd,
        touchcancel: props.onTouchCancel
      };
      var onEventHandler = eventsHandler[event.type];
      if (!onEventHandler) return;
      onEventHandler((0, _eventFactory.default)(event, props.value, ViewerDOM));
    }
  }, {
    key: "autoPanLoop",
    value: function autoPanLoop() {
      var coords = {
        x: this.state.pointerX,
        y: this.state.pointerY
      };
      var nextValue = (0, _interactions.onInterval)(null, this.ViewerDOM, this.getTool(), this.getValue(), this.props, coords);
      if (this.getValue() !== nextValue) {
        this.setValue(nextValue);
      }
      if (this.autoPanIsRunning) {
        requestAnimationFrame(this.autoPanLoop);
      }
    }
  }, {
    key: "onWheel",
    value: function onWheel(event) {
      var nextValue = (0, _interactions.onWheel)(event, this.ViewerDOM, this.getTool(), this.getValue(), this.props);
      if (this.getValue() !== nextValue) this.setValue(nextValue);
    }

    /** React renderer **/
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var props = this.props,
        _this$state = this.state,
        pointerX = _this$state.pointerX,
        pointerY = _this$state.pointerY;
      var tool = this.getTool();
      var value = this.getValue();
      var _props$customToolbar = props.customToolbar,
        CustomToolbar = _props$customToolbar === void 0 ? _toolbar.default : _props$customToolbar,
        _props$customMiniatur = props.customMiniature,
        CustomMiniature = _props$customMiniatur === void 0 ? _miniature2.default : _props$customMiniatur;
      var panningWithToolAuto = tool === _constants.TOOL_AUTO && value.mode === _constants.MODE_PANNING && value.startX !== value.endX && value.startY !== value.endY;
      var cursor;
      if (tool === _constants.TOOL_PAN) cursor = (0, _cursorPolyfill.default)(value.mode === _constants.MODE_PANNING ? 'grabbing' : 'grab');
      if (tool === _constants.TOOL_ZOOM_IN) cursor = (0, _cursorPolyfill.default)('zoom-in');
      if (tool === _constants.TOOL_ZOOM_OUT) cursor = (0, _cursorPolyfill.default)('zoom-out');
      if (panningWithToolAuto) cursor = (0, _cursorPolyfill.default)('grabbing');
      var blockChildEvents = [_constants.TOOL_PAN, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT].indexOf(tool) >= 0;
      blockChildEvents = blockChildEvents || panningWithToolAuto;
      var touchAction = this.props.detectPinchGesture || [_constants.TOOL_PAN, _constants.TOOL_AUTO].indexOf(this.getTool()) !== -1 ? 'none' : undefined;
      var style = {
        display: 'block',
        cursor: cursor,
        touchAction: touchAction
      };
      return /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread({
          position: "relative",
          width: value.viewerWidth,
          height: value.viewerHeight
        }, props.style),
        className: this.props.className
      }, /*#__PURE__*/_react.default.createElement("svg", {
        ref: function ref(ViewerDOM) {
          return _this2.ViewerDOM = ViewerDOM;
        },
        width: value.viewerWidth,
        height: value.viewerHeight,
        style: style,
        onMouseDown: function onMouseDown(event) {
          var nextValue = (0, _interactions.onMouseDown)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.handleViewerEvent(event);
        },
        onMouseMove: function onMouseMove(event) {
          var _this2$ViewerDOM$getB = _this2.ViewerDOM.getBoundingClientRect(),
            left = _this2$ViewerDOM$getB.left,
            top = _this2$ViewerDOM$getB.top;
          var x = event.clientX - Math.round(left);
          var y = event.clientY - Math.round(top);
          var nextValue = (0, _interactions.onMouseMove)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props, {
            x: x,
            y: y
          });
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.setState({
            pointerX: x,
            pointerY: y
          });
          _this2.handleViewerEvent(event);
        },
        onMouseUp: function onMouseUp(event) {
          var nextValue = (0, _interactions.onMouseUp)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.handleViewerEvent(event);
        },
        onClick: function onClick(event) {
          _this2.handleViewerEvent(event);
        },
        onDoubleClick: function onDoubleClick(event) {
          var nextValue = (0, _interactions.onDoubleClick)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.handleViewerEvent(event);
        },
        onMouseEnter: function onMouseEnter(event) {
          if ((0, _detectTouch.default)()) return;
          var nextValue = (0, _interactions.onMouseEnterOrLeave)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
        },
        onMouseLeave: function onMouseLeave(event) {
          var nextValue = (0, _interactions.onMouseEnterOrLeave)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
        },
        onTouchStart: function onTouchStart(event) {
          var nextValue = (0, _interactionsTouch.onTouchStart)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.handleViewerEvent(event);
        },
        onTouchMove: function onTouchMove(event) {
          var nextValue = (0, _interactionsTouch.onTouchMove)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.handleViewerEvent(event);
        },
        onTouchEnd: function onTouchEnd(event) {
          var nextValue = (0, _interactionsTouch.onTouchEnd)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.handleViewerEvent(event);
        },
        onTouchCancel: function onTouchCancel(event) {
          var nextValue = (0, _interactionsTouch.onTouchCancel)(event, _this2.ViewerDOM, _this2.getTool(), _this2.getValue(), _this2.props);
          if (_this2.getValue() !== nextValue) _this2.setValue(nextValue);
          _this2.handleViewerEvent(event);
        }
      }, /*#__PURE__*/_react.default.createElement("rect", {
        fill: props.background,
        x: 0,
        y: 0,
        width: value.viewerWidth,
        height: value.viewerHeight,
        style: {
          pointerEvents: "none"
        }
      }), /*#__PURE__*/_react.default.createElement("g", {
        transform: (0, _transformationMatrix.toSVG)(value),
        style: blockChildEvents ? {
          pointerEvents: "none"
        } : {}
      }, /*#__PURE__*/_react.default.createElement("rect", {
        fill: this.props.SVGBackground,
        style: this.props.SVGStyle,
        x: value.SVGMinX || 0,
        y: value.SVGMinY || 0,
        width: value.SVGWidth,
        height: value.SVGHeight
      }), /*#__PURE__*/_react.default.createElement("g", null, props.children.props.children)), !([_constants.TOOL_NONE, _constants.TOOL_AUTO].indexOf(tool) >= 0 && props.detectAutoPan && value.focus) ? null : /*#__PURE__*/_react.default.createElement("g", {
        style: {
          pointerEvents: "none"
        }
      }, !(pointerY <= 20) ? null : /*#__PURE__*/_react.default.createElement(_borderGradient.default, {
        direction: _constants.POSITION_TOP,
        width: value.viewerWidth,
        height: value.viewerHeight
      }), !(value.viewerWidth - pointerX <= 20) ? null : /*#__PURE__*/_react.default.createElement(_borderGradient.default, {
        direction: _constants.POSITION_RIGHT,
        width: value.viewerWidth,
        height: value.viewerHeight
      }), !(value.viewerHeight - pointerY <= 20) ? null : /*#__PURE__*/_react.default.createElement(_borderGradient.default, {
        direction: _constants.POSITION_BOTTOM,
        width: value.viewerWidth,
        height: value.viewerHeight
      }), !(value.focus && pointerX <= 20) ? null : /*#__PURE__*/_react.default.createElement(_borderGradient.default, {
        direction: _constants.POSITION_LEFT,
        width: value.viewerWidth,
        height: value.viewerHeight
      })), !(value.mode === _constants.MODE_ZOOMING) ? null : /*#__PURE__*/_react.default.createElement(_selection.default, {
        startX: value.startX,
        startY: value.startY,
        endX: value.endX,
        endY: value.endY
      })), props.toolbarProps.position === _constants.POSITION_NONE ? null : /*#__PURE__*/_react.default.createElement(CustomToolbar, _extends({}, this.props.toolbarProps, {
        value: value,
        onChangeValue: function onChangeValue(value) {
          return _this2.setValue(value);
        },
        tool: tool,
        onChangeTool: function onChangeTool(tool) {
          return _this2.props.onChangeTool(tool);
        }
      })), props.miniatureProps.position === _constants.POSITION_NONE ? null : /*#__PURE__*/_react.default.createElement(CustomMiniature, _extends({}, this.props.miniatureProps, {
        value: value,
        onChangeValue: function onChangeValue(value) {
          return _this2.setValue(value);
        },
        SVGBackground: this.props.SVGBackground
      }), props.children.props.children));
    }
  }]);
  return ReactSVGPanZoom;
}(_react.default.Component);
exports.default = ReactSVGPanZoom;
ReactSVGPanZoom.propTypes = {
  /**************************************************************************/
  /*  Viewer configuration                                                  */
  /**************************************************************************/

  /**
   *   width of the viewer displayed on screen
   */
  width: _propTypes.default.number.isRequired,
  /**
  * height of the viewer displayed on screen
  */
  height: _propTypes.default.number.isRequired,
  /**
  * value of the viewer (current camera view)
  */
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.shape({
    version: _propTypes.default.oneOf([2]).isRequired,
    mode: _propTypes.default.oneOf([_constants.MODE_IDLE, _constants.MODE_PANNING, _constants.MODE_ZOOMING]).isRequired,
    focus: _propTypes.default.bool.isRequired,
    a: _propTypes.default.number.isRequired,
    b: _propTypes.default.number.isRequired,
    c: _propTypes.default.number.isRequired,
    d: _propTypes.default.number.isRequired,
    e: _propTypes.default.number.isRequired,
    f: _propTypes.default.number.isRequired,
    viewerWidth: _propTypes.default.number.isRequired,
    viewerHeight: _propTypes.default.number.isRequired,
    SVGMinX: _propTypes.default.number.isRequired,
    SVGMinY: _propTypes.default.number.isRequired,
    SVGWidth: _propTypes.default.number.isRequired,
    SVGHeight: _propTypes.default.number.isRequired,
    startX: _propTypes.default.number,
    startY: _propTypes.default.number,
    endX: _propTypes.default.number,
    endY: _propTypes.default.number,
    miniatureOpen: _propTypes.default.bool.isRequired
  })]).isRequired,
  /**
  * handler something changed
  */
  onChangeValue: _propTypes.default.func.isRequired,
  /**
  * current active tool (TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT)
  */
  tool: _propTypes.default.oneOf([_constants.TOOL_AUTO, _constants.TOOL_NONE, _constants.TOOL_PAN, _constants.TOOL_ZOOM_IN, _constants.TOOL_ZOOM_OUT]).isRequired,
  /**
  * handler tool changed
  */
  onChangeTool: _propTypes.default.func.isRequired,
  /**************************************************************************/
  /* Customize style                                                        */
  /**************************************************************************/

  /**
  * background of the viewer
  */
  background: _propTypes.default.string,
  /**
  * background of the svg
  */
  SVGBackground: _propTypes.default.string,
  /**
  * style of the svg
  */
  SVGStyle: _propTypes.default.object,
  /**
  * CSS style of the Viewer
  */
  style: _propTypes.default.object,
  /**
  * className of the Viewer
  */
  className: _propTypes.default.string,
  /**************************************************************************/
  /* Detect events                                                          */
  /**************************************************************************/

  /**
  * perform zoom operation on mouse scroll
  */
  detectWheel: _propTypes.default.bool,
  /**
  * perform PAN if the mouse is on viewer border
  */
  detectAutoPan: _propTypes.default.bool,
  /**
  * perform zoom operation on pinch gesture
  */
  detectPinchGesture: _propTypes.default.bool,
  /**
  * handler zoom level changed
  */
  onZoom: _propTypes.default.func,
  /**
  * handler pan action performed
  */
  onPan: _propTypes.default.func,
  /**
  * handler click
  */
  onClick: _propTypes.default.func,
  /**
  * handler double click
  */
  onDoubleClick: _propTypes.default.func,
  /**
  * handler mouseup
  */
  onMouseUp: _propTypes.default.func,
  /**
  * handler mousemove
  */
  onMouseMove: _propTypes.default.func,
  /**
  * handler mousedown
  */
  onMouseDown: _propTypes.default.func,
  /**************************************************************************/
  /* Some advanced configurations                                           */
  /**************************************************************************/

  /**
  * if disabled the user can move the image outside the viewer
  */
  preventPanOutside: _propTypes.default.bool,
  /**
  * how much scale in or out
  */
  scaleFactor: _propTypes.default.number,
  /**
  * how much scale in or out on mouse wheel (requires detectWheel enabled)
  */
  scaleFactorOnWheel: _propTypes.default.number,
  /**
  * maximum amount of scale a user can zoom in to
  */
  scaleFactorMax: _propTypes.default.number,
  /**
  * minimum amount of a scale a user can zoom out of
  */
  scaleFactorMin: _propTypes.default.number,
  /**
  * modifier keys //https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState
  */
  modifierKeys: _propTypes.default.array,
  /**
  * Turn off zoom on double click
  */
  disableDoubleClickZoomWithToolAuto: _propTypes.default.bool,
  /**************************************************************************/
  /* Miniature configurations                                                 */
  /**************************************************************************/

  /**
  * override miniature component
  */
  customMiniature: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  /**
  * miniature props
  */
  miniatureProps: _propTypes.default.shape({
    position: _propTypes.default.oneOf([_constants.POSITION_NONE, _constants.POSITION_RIGHT, _constants.POSITION_LEFT]),
    background: _propTypes.default.string,
    width: _propTypes.default.number,
    height: _propTypes.default.number
  }),
  /**************************************************************************/
  /* Toolbar configurations                                                 */
  /**************************************************************************/

  /**
  * override toolbar component
  */
  customToolbar: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.func]),
  /**
  * toolbar props
  */
  toolbarProps: _propTypes.default.shape({
    position: _propTypes.default.oneOf([_constants.POSITION_NONE, _constants.POSITION_TOP, _constants.POSITION_RIGHT, _constants.POSITION_BOTTOM, _constants.POSITION_LEFT]),
    SVGAlignX: _propTypes.default.oneOf([_constants.ALIGN_CENTER, _constants.ALIGN_LEFT, _constants.ALIGN_RIGHT]),
    SVGAlignY: _propTypes.default.oneOf([_constants.ALIGN_CENTER, _constants.ALIGN_TOP, _constants.ALIGN_BOTTOM]),
    activeToolColor: _propTypes.default.string
  }),
  /**************************************************************************/
  /* Children Check                                                         */
  /**************************************************************************/
  /**
  * accept only one node SVG
  */
  children: function children(props, propName, componentName) {
    // Only accept a single child, of the appropriate type
    //credits: http://www.mattzabriskie.com/blog/react-validating-children
    var prop = props[propName];
    var types = ['svg'];
    if (_react.default.Children.count(prop) !== 1 || types.indexOf(prop.type) === -1) {
      return new Error('`' + componentName + '` ' + 'should have a single child of the following types: ' + ' `' + types.join('`, `') + '`.');
    }
    if ((!prop.props.hasOwnProperty('width') || !prop.props.hasOwnProperty('height')) && !prop.props.hasOwnProperty('viewBox')) {
      return new Error('SVG should have props `width` and `height` or `viewBox`');
    }
  }
};
ReactSVGPanZoom.defaultProps = {
  style: {},
  background: "#616264",
  SVGBackground: "#fff",
  SVGStyle: {},
  detectWheel: true,
  detectAutoPan: true,
  detectPinchGesture: true,
  modifierKeys: ["Alt", "Shift", "Control"],
  preventPanOutside: true,
  scaleFactor: 1.1,
  scaleFactorOnWheel: 1.06,
  disableZoomWithToolAuto: false,
  onZoom: null,
  onPan: null,
  toolbarProps: {},
  miniatureProps: {}
};