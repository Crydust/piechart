var geometry = (function () {

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
        toRad: toRad,
        toDeg: toDeg
    };
}());