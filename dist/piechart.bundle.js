/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["c"] = toRad;
/* unused harmony export toDeg */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    translate(x, y) {
        if (x instanceof Point) {
            return new Point(this.x + x.getX(), this.y + x.getY());
        }
        return new Point(this.x + x, this.y + y);
    }
    static polar (r, a) {
        return new Point(Math.cos(a) * r, Math.sin(a) * r);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Point;


class Rect {
    constructor(top, left, width, height) {
        if (left instanceof Point && top instanceof Point) {
            this.tl = top;
            this.br = left;
        } else {
            this.tl = new Point(left, top);
            this.br = new Point(left + width, top + height);
        }
    }
    getLeft() {
        return this.tl.getX();
    }
    getTop() {
        return this.tl.getY();
    }
    getRight() {
        return this.br.getX();
    }
    getBottom() {
        return this.br.getY();
    }
    getWidth() {
        return this.getRight() - this.getLeft();
    }
    getHeight() {
        return this.getBottom() - this.getTop();
    }
    subRect(top, right, bottom, left) {
        var subTop = this.getTop() + ((1 - top) * this.getHeight());
        var subHeight = this.getHeight() * (top - bottom);
        var subLeft = this.getLeft() + (left * this.getWidth());
        var subWidth = (right - left) * this.getWidth();
        return new Rect(subTop, subLeft, subWidth, subHeight);
    }
    toString() {
        return 'Rect { top: %s, left: %s, width: %s, height: %s}'
            .replace('%s', this.getTop().toFixed(1))
            .replace('%s', this.getLeft().toFixed(1))
            .replace('%s', this.getWidth().toFixed(1))
            .replace('%s', this.getHeight().toFixed(1));
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Rect;


function toRad(degrees) {
    var result = (degrees * Math.PI / 180) % (Math.PI * 2);
    if (result < 0) {
        result += (Math.PI * 2);
    }
    return result;
}

function toDeg(radians) {
    var result = (radians * 180 / Math.PI) % 360;
    if (result < 0) {
        result += 360;
    }
    return result;
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__colors_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__geometry_js__ = __webpack_require__(0);



class CanvasDrawing {

    /**
     * @constructor
     * @implements {var IDrawing}
     */
    constructor() {
        this.canvas_ = null;
        this.ctx_ = null;
    }

    /**
     * encapsulates the creation of the 'magical' object
     * @param {!number} width
     * @param {!number} height
     */
    createGraphics(width, height) {
        this.canvas_ = document.createElement('canvas');
        this.canvas_.width = width;
        this.canvas_.height = height;
        this.ctx_ = this.canvas_.getContext('2d');
    }

    /**
     * draws a single shape
     * @param {!string} shape
     * @param {!Array.<number>} coords_arr
     * @param {!number} strokewidth integer strokewidth
     * @param {!string} stroke hexadecimal color #123456
     * @param {!number} strokealpha float [0, 1] 0 is transparent, 1 is opaque
     * @param {!string} fill hexadecimal color #123456
     * @param {!number} fillalpha float [0, 1] 0 is transparent, 1 is opaque
     */
    drawShape(shape, coords_arr, strokewidth, stroke, strokealpha, fill, fillalpha) {
        var i, leni;
        if (!(fillalpha > 0  || (strokealpha > 0 && strokewidth > 0))) {
            return;
        }
        this.ctx_.beginPath();
        switch (shape) {
        case 'poly':
            //closed polygon
            this.ctx_.moveTo(coords_arr[0], coords_arr[1]);
            for (i = 0, leni = coords_arr.length; i < leni; i += 2) {
                this.ctx_.lineTo(coords_arr[i], coords_arr[i + 1]);
            }
            this.ctx_.lineTo(coords_arr[0], coords_arr[1]);
            break;
        case 'polyline':
            //open polygon
            this.ctx_.moveTo(coords_arr[0], coords_arr[1]);
            for (i = 0, leni = coords_arr.length; i < leni; i += 2) {
                this.ctx_.lineTo(coords_arr[i], coords_arr[i + 1]);
            }
            break;
        case 'circle':
            this.ctx_.moveTo(coords_arr[0] + coords_arr[2], coords_arr[1]);
            this.ctx_.arc(coords_arr[0], coords_arr[1], coords_arr[2], 0, Math.PI * 2, false);
            break;
        case 'rect':
            var x = coords_arr[0];
            var y = coords_arr[1];
            var w = coords_arr[2] - x;
            var h = coords_arr[3] - y;
            if (strokewidth % 2 === 1) {
                x += 0.5;
                y += 0.5;
            }
            this.ctx_.rect(x, y, w, h);
            break;
        case 'arc':
            //center
            var startPoint = __WEBPACK_IMPORTED_MODULE_1__geometry_js__["a" /* Point */]
                    .polar(coords_arr[2], coords_arr[3])
                    .translate(coords_arr[0], coords_arr[1]);
            this.ctx_.moveTo(coords_arr[0], coords_arr[1]);
            this.ctx_.lineTo(startPoint.getX(), startPoint.getY());
            this.ctx_.arc(coords_arr[0], coords_arr[1], coords_arr[2], coords_arr[3], coords_arr[4], false);
            this.ctx_.lineTo(coords_arr[0], coords_arr[1]);
            break;
        }
        if (shape !== 'polyline') {
            this.ctx_.closePath();
        }
        if (fillalpha > 0) {
            this.ctx_.fillStyle = Object(__WEBPACK_IMPORTED_MODULE_0__colors_js__["a" /* hexToRgba */])(fill, fillalpha);
            this.ctx_.fill();
        }
        if (strokealpha > 0 && strokewidth > 0) {
            this.ctx_.strokeStyle = Object(__WEBPACK_IMPORTED_MODULE_0__colors_js__["a" /* hexToRgba */])(stroke, strokealpha);
            this.ctx_.lineWidth = strokewidth;
            this.ctx_.stroke();
        }
    }

    fillText(textToDraw, x, y, fill, fillalpha, font, textAlign, textBaseline) {
        this.ctx_.textAlign = textAlign || 'start';
        this.ctx_.textBaseline = textBaseline || 'alphabetic';
        this.ctx_.font = font;
        this.ctx_.fillStyle = Object(__WEBPACK_IMPORTED_MODULE_0__colors_js__["a" /* hexToRgba */])(fill, fillalpha);
        this.ctx_.fillText(textToDraw, x, y);
    }

    /**
     * ends the drawing and adds it to the dom
     * @param {HTMLElement} container
     */
    renderGraphics(container) {
        container.appendChild(this.canvas_);
        delete this.canvas_;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CanvasDrawing;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = hexToRgba;
/**
 * @private
 * @param {!string} hexColor
 * @param {!number} alpha
 * @returns {!string}
 */
function hexToRgba(hexColor, alpha) {
    var color = parseInt(hexColor.substr(1, 6), 16);
    var r = (color >> 16) & 0xFF;
    var g = (color >> 8) & 0xFF;
    var b = color & 0xFF;
    /*
     var r = parseInt(hexColor.substr(1, 2), 16);
     var g = parseInt(hexColor.substr(3, 2), 16);
     var b = parseInt(hexColor.substr(5, 2), 16);
     */
    if (alpha < 1) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["draw"] = draw;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometry_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__drawing_js__ = __webpack_require__(1);



class Wedge {

    constructor(start, value, label, center, outerRadius, stroke, fill, textFill) {
        this.start_ = start;
        this.value_ = value;
        this.label_ = label;
        this.center_ = center;
        this.radius_ = (outerRadius - 32) / 1.1;
        this.stroke_ = stroke;
        this.fill_ = fill;
        this.textFill_ = textFill;
    }
    getEnd() {
        return this.start_ + this.value_;
    }
    getStartAlpha() {
        return Object(__WEBPACK_IMPORTED_MODULE_0__geometry_js__["c" /* toRad */])(this.getEnd() * -360);
    }
    getMiddleAlpha() {
        return Object(__WEBPACK_IMPORTED_MODULE_0__geometry_js__["c" /* toRad */])((this.start_ + this.getEnd()) / 2 * -360);
    }
    getEndAlpha() {
        return Object(__WEBPACK_IMPORTED_MODULE_0__geometry_js__["c" /* toRad */])(this.start_ * -360);
    }
    getLineStartPosition() {
        return __WEBPACK_IMPORTED_MODULE_0__geometry_js__["a" /* Point */]
                .polar(this.radius_ * 0.7, this.getMiddleAlpha())
                .translate(this.center_);
    }
    getLineEndPosition() {
        return __WEBPACK_IMPORTED_MODULE_0__geometry_js__["a" /* Point */]
                .polar(this.radius_ * 1.1, this.getMiddleAlpha())
                .translate(this.center_);
    }
    getTextPosition() {
        var alpha = this.getMiddleAlpha();
        var p = __WEBPACK_IMPORTED_MODULE_0__geometry_js__["a" /* Point */]
                .polar((this.radius_ * 1.1) + 16, alpha)
                .translate(this.center_)
                .translate(-6 * this.label_.length, 6);
        if (this.label_.length > 2) {
            if (alpha < 0.2 * Math.PI || alpha > 1.8 * Math.PI) {
                p = p.translate(6 * (this.label_.length - 2), 0);
            } else if (alpha > 0.8 * Math.PI && alpha < 1.2 * Math.PI) {
                p = p.translate(-6 * (this.label_.length - 2), 0);
            }
        }
        return p;
    }
    draw(d) {
        var strokewidth, stroke, strokealpha, fill, fillalpha;

        strokewidth = 0;
        stroke = '#000000';
        strokealpha = 0;
        fill = this.fill_;
        fillalpha = 1;
        //x, y, radius, startAngle, endAngle
        d.drawShape(
                'arc',
                [this.center_.getX(), this.center_.getY(), this.radius_, this.getStartAlpha(), this.getEndAlpha()],
                strokewidth, stroke, strokealpha,
                fill, fillalpha);

        strokewidth = 1;
        stroke = this.stroke_;
        strokealpha = 1;
        fill = '#000000';
        fillalpha = 0;
        //x1, y1, x2, y2, ...
        var p1 = this.getLineStartPosition();
        var p2 = this.getLineEndPosition();
        d.drawShape(
                'polyline',
                [p1.getX(), p1.getY(), p2.getX(), p2.getY()],
                strokewidth, stroke, strokealpha,
                fill, fillalpha);

        strokewidth = 0;
        stroke = this.stroke_;
        strokealpha = 0;
        fill = this.textFill_;
        fillalpha = 1;
        var p3 = this.getTextPosition();
        d.fillText(this.label_, p3.getX(), p3.getY(), fill, fillalpha, '16px sans-serif');
    }
}

function draw(id, width, height, values, labels) {
    
    var themeColors = [
        //?        ?          text       line
        '#ffffff', '#eeeeee', '#121212', '#dddddd',
        '#fff4d6', '#d7bad6', '#a1bbee', '#c0c1a1',
        '#f0cbae', '#958f91', '#bfa9ac', '#f8e9be',
        '#c8c8c8', '#a1bbee'
    ];
    var center = new __WEBPACK_IMPORTED_MODULE_0__geometry_js__["a" /* Point */](width / 2, height  / 2);
    var outerRadius = Math.min(width, height) / 2;
    
    var total = 0;
    for (var i = 0, leni = values.length; i < leni; i++) {
        if (typeof values[i] === 'string') {
            values[i] = parseInt(values[i], 10);
        }
        total += values[i];
    }
    if (total < 0.001) {
        return;
    }
    var wedges = [];
    var start = 0;
    for (var j = 0, lenj = values.length; j < lenj; j++) {
        var fillColor = themeColors[(j % (themeColors.length - 4)) + 4];
        var wedge = new Wedge(start, values[j] / total, labels[j], center, outerRadius, themeColors[3], fillColor, themeColors[2]);
        start = wedge.getEnd();
        wedges.push(wedge);
    }
    
    var strokewidth = 0, stroke = '#000000', strokealpha = 0, fill = '#eeeeff', fillalpha = 1;
    var d = new __WEBPACK_IMPORTED_MODULE_1__drawing_js__["a" /* CanvasDrawing */]();
    d.createGraphics(width, height);
    d.drawShape('rect', [0, 0, width, height],
            strokewidth, stroke, strokealpha, fill, fillalpha);
    for (var k = 0, lenk = wedges.length; k < lenk; k++) {
        wedges[k].draw(d);
    }
    d.renderGraphics(document.getElementById(id));
}


/***/ })
/******/ ]);