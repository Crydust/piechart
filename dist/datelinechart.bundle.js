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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
/* 3 */,
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["draw"] = draw;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__geometry_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dataset_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__axis_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__drawing_js__ = __webpack_require__(1);





function drawRect(d, rect, strokewidth, stroke, strokealpha, fill, fillalpha) {
    d.drawShape('rect', [rect.getLeft(), rect.getTop(), rect.getRight(), rect.getBottom()],
            strokewidth, stroke, strokealpha, fill, fillalpha);
}

function drawGrid(d, rect, xAxis, xCount, yAxis, yCount,
        strokewidth, stroke, strokealpha, fill, fillalpha) {
    var i;
    var top = rect.getTop();
    var right = rect.getRight();
    var bottom = rect.getBottom();
    var left = rect.getLeft();
    // background
    d.drawShape('rect', [rect.getLeft(), rect.getTop(), rect.getRight(), rect.getBottom()],
            0, '#000000', 0, fill, fillalpha);
    // vertical stripes
    for (i = 0; i <= xCount; i++) {
        var x = xAxis.labelPixels(i, xCount);
        d.drawShape('polyline', [Math.floor(x) + 0.5, Math.floor(top) + 0.5, Math.floor(x) + 0.5, Math.floor(bottom) + 5 + 0.5],
                strokewidth, stroke, strokealpha, fill, fillalpha);
        d.fillText(xAxis.labelText(i, xCount), x, bottom + 20,
                '#000000', 1, '16px sans-serif', 'center', 'top');
    }
    // horizontal stripes
    for (i = 0; i <= yCount; i++) {
        var y = yAxis.labelPixels(i, yCount);
        d.drawShape('polyline', [Math.floor(left) - 5 + 0.5, Math.floor(y) + 0.5, Math.floor(right) + 0.5, Math.floor(y) + 0.5],
                strokewidth, stroke, strokealpha, fill, fillalpha);
        d.fillText(yAxis.labelText(i, yCount), left - 10, y,
                '#000000', 1, '16px sans-serif', 'right', 'middle');
    }

}

function drawDataSetValues(d, values, xAxis, yAxis,
        strokewidth, stroke, strokealpha, fill, fillalpha) {
    var i, leni, coordinates;
    coordinates = [];
    if (values.length === 1) {
        strokewidth += 2;
        coordinates.push(
                xAxis.valueToPixels(values[0].x) - 2,
                yAxis.valueToPixels(values[0].y),
                xAxis.valueToPixels(values[0].x) + 2,
                yAxis.valueToPixels(values[0].y));
    } else {
        for (i = 0, leni = values.length; i < leni; i++) {
            coordinates.push(
                    xAxis.valueToPixels(values[i].x),
                    yAxis.valueToPixels(values[i].y));
        }
    }
    d.drawShape('polyline', coordinates,
            strokewidth, stroke, strokealpha, fill, fillalpha);
}

function drawLegend(d, name, index, count, legendRect,
        strokewidth, stroke, strokealpha, fill, fillalpha) {
    var lineCoordinates = [
        legendRect.getLeft() + 5,
        legendRect.getBottom() - (20 * (count - index)),
        legendRect.getLeft() + 5 + 16,
        legendRect.getBottom() - (20 * (count - index))
    ];
    d.drawShape('polyline', lineCoordinates,
            strokewidth, stroke, strokealpha, fill, fillalpha);
    d.fillText(name,
            legendRect.getLeft() + 5 + 16 + 5,
            legendRect.getBottom() - (20 * (count - index)),
            '#000000', 1, '16px sans-serif', 'left', 'middle');
}

function draw(id, width, height, rawdatasets) {
    var i, leni;
    var themeColors = [
        //?        ?          text       line
        '#ffffff', '#dddddd', '#000000', '#cccccc',
        '#284b53', '#b8bc9c', '#005699', '#271651',
        '#aa0036', '#ecf0b9', '#999966', '#333366',
        '#c3c3e6', '#594330', '#a0bdc4', '#005699',
        '#999966', '#213321', '#0f3b9c'
    ];

    var rootRect = new __WEBPACK_IMPORTED_MODULE_0__geometry_js__["b" /* Rect */](0, 0, width, height);
    var plotAreaRect = rootRect.subRect(0.95, 0.7, 0.2, 0.1);
    var legendRect = rootRect.subRect(0.95, 0.99, 0.2, 0.7);

    var datasets = new __WEBPACK_IMPORTED_MODULE_1__dataset_js__["a" /* DataSetCollection */](rawdatasets);
    var minYValue = datasets.getMinYValue();
    var maxYValue = datasets.getMaxYValue();
    var deltaYValue = maxYValue - minYValue;
    var xAxis = new __WEBPACK_IMPORTED_MODULE_2__axis_js__["a" /* DateAxis */](
            plotAreaRect.getLeft(), plotAreaRect.getRight(),
            datasets.getMinDate(), datasets.getMaxDate()
            );
    var yAxis = new __WEBPACK_IMPORTED_MODULE_2__axis_js__["b" /* NumericAxis */](
            plotAreaRect.getBottom(), plotAreaRect.getTop(),
            minYValue, maxYValue
            );

    var strokewidth = 0, stroke = '#000000', strokealpha = 0, fill = '#eeeeff', fillalpha = 1;
    var d = new __WEBPACK_IMPORTED_MODULE_3__drawing_js__["a" /* CanvasDrawing */]();
    d.createGraphics(width, height);
    drawRect(d, rootRect, strokewidth, stroke, strokealpha, fill, fillalpha);
    fill = '#ffffff';
    stroke = '#cccccc';
    strokewidth = 1;
    strokealpha = 1;
    var yCount = 5;
    if (deltaYValue % 7 === 0) {
        yCount = 7;
    } else if (deltaYValue % 6 === 0) {
        yCount = 6;
    } else if (deltaYValue % 5 === 0) {
        yCount = 5;
    } else if (deltaYValue % 4 === 0) {
        yCount = 4;
    } else if (deltaYValue % 3 === 0) {
        yCount = 3;
    }
    drawGrid(d, plotAreaRect, xAxis, 3, yAxis, yCount,
            strokewidth, stroke, strokealpha, fill, fillalpha);

    fillalpha = 0;
    strokewidth = 2;
    strokealpha = 1;
    for (i = datasets.getCount() - 1; i >= 0; i--) {
        stroke = themeColors[4 + i];
        drawDataSetValues(d, datasets.getItem(i).getValues(), xAxis, yAxis,
                strokewidth, stroke, strokealpha, fill, fillalpha);
    }

    for (i = 0, leni = datasets.getCount(); i < leni; i++) {
        stroke = themeColors[4 + i];
        drawLegend(d, datasets.getItem(i).getName(), i, leni, legendRect,
                strokewidth, stroke, strokealpha, fill, fillalpha);
    }

    d.renderGraphics(document.getElementById(id));
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DataSet {
    
    constructor(name, dateValues, yValues) {
        this._name = name;
        this._dateValues = dateValues;
        this._yValues = yValues;
    }
    getExtremeDates() {
        var i, leni;
        var minDate = Date.UTC(2100, 0, 1, 0, 0, 0, 0);
        var maxDate = Date.UTC(1970, 0, 1, 0, 0, 0, 0);
        for (i = 0, leni = this._dateValues.length; i < leni; i++) {
            var date = this._dateValues[i];
            if (date < minDate) {
                minDate = date;
            }
            if (date > maxDate) {
                maxDate = date;
            }
        }
        //console.log(new Date(minDate), new Date(maxDate));
        minDate = Date.UTC(new Date(minDate).getUTCFullYear(), new Date(minDate).getUTCMonth(), 1, 0, 0, 0, 0);
        if (new Date(maxDate).getUTCMonth() === 11) {
            maxDate = Date.UTC(new Date(maxDate).getUTCFullYear() + 1, 0, 1, 0, 0, 0, 0);
        } else {
            maxDate = Date.UTC(new Date(maxDate).getUTCFullYear(), new Date(maxDate).getUTCMonth() + 1, 1, 0, 0, 0, 0);
        }
        return [minDate, maxDate];
    }
    getMinDate() {
        return this.getExtremeDates()[0];
    }
    getMaxDate() {
        return this.getExtremeDates()[1];
    }
    getExtremeYValues() {
        var i, leni;
        var minYValue = 1000000;
        var maxYValue = -1000000;
        for (i = 0, leni = this._yValues.length; i < leni; i++) {
            var yValue = this._yValues[i];
            if (yValue < minYValue) {
                minYValue = yValue;
            }
            if (yValue > maxYValue) {
                maxYValue = yValue;
            }
            //console.log('yyy', minYValue, yValue, maxYValue);
        }
        if (minYValue >= 0 && minYValue < 1) {
            minYValue = 0;
        } else {
            minYValue = Math.floor(minYValue - 0.5);
        }
        if (maxYValue > 9 && maxYValue <= 10) {
            maxYValue = 10;
        } else {
            maxYValue = Math.ceil(maxYValue + 0.5);
        }
        return [minYValue, maxYValue];
    }
    getMinYValue() {
        return this.getExtremeYValues()[0];
    }
    getMaxYValue() {
        return this.getExtremeYValues()[1];
    }
    getName() {
        return this._name;
    }
    getValues() {
        var i, leni;
        var result = [];
        for (i = 0, leni = this._dateValues.length; i < leni; i++) {
            result.push({
                x: this._dateValues[i],
                y: this._yValues[i]
            });
        }
        return result;
    }

}
/* unused harmony export DataSet */


class DataSetCollection {
    constructor(rawdatasets) {
        var i, leni, j, lenj;
        this._datasets = [];
        for (i = 0, leni = rawdatasets.length; i < leni; i++) {
            var name = rawdatasets[i].Name;
            var dateValues = [];
            var rawDateValues = rawdatasets[i].DateValues.split(',');
            for (j = 0, lenj = rawDateValues.length; j < lenj; j++) {
                var rawDateValueParts = rawDateValues[j].split('/');
                var year = parseInt(rawDateValueParts[2], 10);
                if (year < 70) {
                    year = 2000 + year;
                } else if (year < 100) {
                    year = 1900 + year;
                }
                var month = parseInt(rawDateValueParts[1], 10) - 1;
                var day = parseInt(rawDateValueParts[0], 10);
                //console.log(rawDateValues[j], year, month, day);
                dateValues.push(Date.UTC(year, month, day, 0, 0, 0, 0));
            }
            var yValues = [];
            var rawYValues = rawdatasets[i].YValues.split(',');
            for (j = 0, lenj = rawYValues.length; j < lenj; j++) {
                var yValue = parseFloat(rawYValues[j]);
                //console.log(rawYValues[j], yValue);
                yValues.push(yValue);
            }
            this._datasets.push(new DataSet(name, dateValues, yValues));
        }
    }
    getExtremeDates() {
        var i, leni;
        var minDate = Date.UTC(2100, 0, 1, 0, 0, 0, 0);
        var maxDate = Date.UTC(1970, 0, 1, 0, 0, 0, 0);
        for (i = 0, leni = this._datasets.length; i < leni; i++) {
            var extremes = this._datasets[i].getExtremeDates();
            minDate = Math.min(minDate, extremes[0]);
            maxDate = Math.max(maxDate, extremes[1]);
        }
        return [minDate, maxDate];
    }
    getMinDate() {
        return this.getExtremeDates()[0];
    }
    getMaxDate() {
        return this.getExtremeDates()[1];
    }
    getExtremeYValues() {
        var i, leni;
        var minYValue = 1000000;
        var maxYValue = -1000000;
        for (i = 0, leni = this._datasets.length; i < leni; i++) {
            var extremes = this._datasets[i].getExtremeYValues();
            minYValue = Math.min(minYValue, extremes[0]);
            maxYValue = Math.max(maxYValue, extremes[1]);
        }
        return [minYValue, maxYValue];
    }
    getMinYValue() {
        return this.getExtremeYValues()[0];
    }
    getMaxYValue() {
        return this.getExtremeYValues()[1];
    }
    getCount() {
        return this._datasets.length;
    }
    getItem(index) {
        return this._datasets[index];
    }
    
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DataSetCollection;




/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class NumericAxis {
    constructor(minimumPixels, maximumPixels, minimumValue, maximumValue) {
        this._minimumPixels = minimumPixels;
        this._maximumPixels = maximumPixels;
        this._pixelLength = maximumPixels - minimumPixels;
        this._minimumValue = minimumValue;
        this._maximumValue = maximumValue;
    }
    valueToPixels(value) {
        return this._minimumPixels + this._pixelLength *
                (value - this._minimumValue) /
                (this._maximumValue - this._minimumValue);
    }
    labelPixels(index, count) {
        return this._minimumPixels + this._pixelLength * index / count;
    }
    labelValue(index, count) {
        return (this._minimumValue +
                ((this._maximumValue - this._minimumValue) *
                index / count));
    }
    labelText(index, count) {
        return this.labelValue(index, count).toFixed(1);
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = NumericAxis;


class DateAxis extends NumericAxis {
    constructor(minimumPixels, maximumPixels, minimumValue, maximumValue) {
        super(minimumPixels, maximumPixels, minimumValue, maximumValue);
    }
    labelText(index, count) {
        var epoch = Math.round(this.labelValue(index, count));
        var date = new Date(epoch);
        var d = date.getUTCDate();
        var m = date.getUTCMonth() + 1;
        var y = date.getUTCFullYear() % 100;
        d = d < 10 ? '0' + d : d;
        m = m < 10 ? '0' + m : m;
        y = y < 10 ? '0' + y : y;
        return [d, m, y].join('/');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DateAxis;



/***/ })
/******/ ]);