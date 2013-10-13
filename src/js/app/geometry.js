/*jslint vars:true, nomen:true, browser:true */
/*global define:false */
define(function () {
    'use strict';

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

    function Rect(top, left, width, height) {
        if (left instanceof Point && top instanceof Point) {
            this.tl = top;
            this.br = left;
        } else {
            this.tl = new Point(left, top);
            this.br = new Point(left + width, top + height);
        }
    }
    Rect.prototype.getLeft = function () {
        return this.tl.getX();
    };
    Rect.prototype.getTop = function () {
        return this.tl.getY();
    };
    Rect.prototype.getRight = function () {
        return this.br.getX();
    };
    Rect.prototype.getBottom = function () {
        return this.br.getY();
    };
    Rect.prototype.getWidth = function () {
        return this.getRight() - this.getLeft();
    };
    Rect.prototype.getHeight = function () {
        return this.getBottom() - this.getTop();
    };
    Rect.prototype.subRect = function (top, right, bottom, left) {
        var subTop = this.getTop() + ((1 - top) * this.getHeight());
        var subHeight = this.getHeight() * (top - bottom);
        var subLeft = this.getLeft() + (left * this.getWidth());
        var subWidth = (right - left) * this.getWidth();
        return new Rect(subTop, subLeft, subWidth, subHeight);
    };
    Rect.prototype.toString = function () {
        return 'Rect { top: %s, left: %s, width: %s, height: %s}'
            .replace('%s', this.getTop().toFixed(1))
            .replace('%s', this.getLeft().toFixed(1))
            .replace('%s', this.getWidth().toFixed(1))
            .replace('%s', this.getHeight().toFixed(1));
    };

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

    return {
        Point: Point,
        Rect: Rect,
        toRad: toRad,
        toDeg: toDeg
    };
});