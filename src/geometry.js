export class Point {
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

export class Rect {
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

export function toRad(degrees) {
    var result = (degrees * Math.PI / 180) % (Math.PI * 2);
    if (result < 0) {
        result += (Math.PI * 2);
    }
    return result;
}

export function toDeg(radians) {
    var result = (radians * 180 / Math.PI) % 360;
    if (result < 0) {
        result += 360;
    }
    return result;
}
