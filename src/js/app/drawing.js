/*jslint vars:true, nomen:true, browser:true */
/*global define:false */
define(['./colors', './geometry'], function (colors, geometry) {
    'use strict';

    var hexToRgba = colors.hexToRgba;
    var Point = geometry.Point;

    /** @define {boolean} */
    var EXCANVAS_COMPATIBLE = true;

    /**
     * @constructor
     * @implements {var IDrawing}
     */
    var CanvasDrawing = function () {
        this.canvas_ = null;
        this.ctx_ = null;
    };

    /**
     * encapsulates the creation of the 'magical' object
     * @param {!number} width
     * @param {!number} height
     */
    CanvasDrawing.prototype.createGraphics = function (width, height) {
        this.canvas_ = document.createElement('canvas');

        if (EXCANVAS_COMPATIBLE) {
            // if it is IE lt 9
            var G_vmlCanvasManager = window.G_vmlCanvasManager;
            if (typeof G_vmlCanvasManager !== 'undefined') {
                document.body.appendChild(this.canvas_);
                this.canvas_.setAttribute('width', width);
                this.canvas_.setAttribute('height', height);
                // reassign the variable to the new element created by initElement
                this.canvas_ = G_vmlCanvasManager.initElement(this.canvas_);
            }
        }

        this.canvas_.width = width;
        this.canvas_.height = height;
        this.ctx_ = this.canvas_.getContext('2d');
    };

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
    CanvasDrawing.prototype.drawShape = function (shape, coords_arr, strokewidth, stroke, strokealpha, fill, fillalpha) {
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
            var startPoint = Point
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
            this.ctx_.fillStyle = hexToRgba(fill, fillalpha);
            this.ctx_.fill();
        }
        if (strokealpha > 0 && strokewidth > 0) {
            this.ctx_.strokeStyle = hexToRgba(stroke, strokealpha);
            this.ctx_.lineWidth = strokewidth;
            this.ctx_.stroke();
        }
    };

    CanvasDrawing.prototype.fillText = function (textToDraw, x, y, fill, fillalpha, font, textAlign, textBaseline) {
        this.ctx_.textAlign = textAlign || 'start';
        this.ctx_.textBaseline = textBaseline || 'alphabetic';
        this.ctx_.font = font;
        this.ctx_.fillStyle = hexToRgba(fill, fillalpha);
        this.ctx_.fillText(textToDraw, x, y);
    };

    /**
     * ends the drawing and adds it to the dom
     * @param {HTMLElement} container
     */
    CanvasDrawing.prototype.renderGraphics = function (container) {
        container.appendChild(this.canvas_);
        delete this.canvas_;
    };

    return {
        CanvasDrawing: CanvasDrawing
    };
});