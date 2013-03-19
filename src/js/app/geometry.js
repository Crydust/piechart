define(['require', 'exports'], function (require, exports) {
    'use strict';
    
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        Point.prototype.getX = function () {
            return this.x;
        };
        Point.prototype.getY = function () {
            return this.y;
        };
        Point.prototype.translate = function (x, y) {
            if (x instanceof Point) {
                return new Point(this.x + x.getX(), this.y + x.getY());
            }
            return new Point(this.x + x, this.y + y);
        };
        Point.polar = function (r, a) {
            return new Point(Math.cos(a) * r, Math.sin(a) * r);
        };
        return Point;
    })();
    exports.Point = Point;
    
    
    function toRad(degrees) {
        return degrees * Math.PI / 180;
    }
    exports.toRad = toRad;
    function toDeg(radians) {
        return radians * 180 / Math.PI;
    }
    exports.toDeg = toDeg;
});
