define(function () {
    'use strict';

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
     * @private
     * @param {!string} hexColor
     * @param {!number} alpha
     * @returns {!string}
     */
    function hexToRgba_(hexColor, alpha) {
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
        this.ctx_.beginPath();
        switch (shape) {
        case 'poly':
            this.ctx_.moveTo(coords_arr[0], coords_arr[1]);
            for (var i = 0, leni = coords_arr.length; i < leni; i += 2) {
                this.ctx_.lineTo(coords_arr[i], coords_arr[i + 1]);
            }
            this.ctx_.lineTo(coords_arr[0], coords_arr[1]);
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
            this.ctx_.moveTo(coords_arr[0], coords_arr[1]);
            this.ctx_.lineTo(coords_arr[0] + Math.cos(coords_arr[3]) * coords_arr[2], coords_arr[1] + Math.sin(coords_arr[3]) * coords_arr[2]);
            this.ctx_.arc(coords_arr[0], coords_arr[1], coords_arr[2], coords_arr[3], coords_arr[4], false);
            this.ctx_.lineTo(coords_arr[0], coords_arr[1]);
            break;
        }
        this.ctx_.closePath();
        this.ctx_.fillStyle = hexToRgba_(fill, fillalpha);
        this.ctx_.fill();
        this.ctx_.strokeStyle = hexToRgba_(stroke, strokealpha);
        this.ctx_.lineWidth = strokewidth;
        this.ctx_.stroke();
    };

    CanvasDrawing.prototype.fillText = function (textToDraw, x, y, fill, fillalpha) {
        //TODO ctx_.font = '20px Arial'
        this.ctx_.fillStyle = hexToRgba_(fill, fillalpha);
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