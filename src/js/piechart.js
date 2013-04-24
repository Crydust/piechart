/*global colors: false, geometry: false, drawing: false */
var piechart = (function (drawing, geometry) {
    
    var Point = geometry.Point;
    var toRad = geometry.toRad;
    
    function draw(id, width, height, values, labels) {
        
        var themeColors = [
                //?        ?          text       line
                '#ffffff', '#eeeeee', '#121212', '#dddddd',
                '#fff4d6', '#d7bad6', '#a1bbee', '#c0c1a1',
                '#f0cbae', '#958f91', '#bfa9ac', '#f8e9be',
                '#c8c8c8'
            ];
        var center = new Point(width / 2, height  / 2);
        var outerRadius = Math.min(width, height) / 2;
        
        var total = 0;
        for (var i = 0, leni = values.length; i < leni; i++) {
            if (typeof values[i] === 'string') {
                values[i] = parseInt(values[i], 10);
            }
            total += values[i];
        }
        var wedges = [];
        var start = 0;
        for (var j = 0, lenj = values.length; j < lenj; j++) {
            var wedge = new Wedge(start, values[j] / total, labels[j], center, outerRadius, themeColors[3], themeColors[j + 4], themeColors[2]);
            start = wedge.getEnd();
            wedges.push(wedge);
        }
        
        var strokewidth = 0, stroke = '#000000', strokealpha = 0, fill = '#eeeeff', fillalpha = 1;
        var d = new drawing.CanvasDrawing();
        d.createGraphics(width, height);
        d.drawShape('rect', [0, 0, width, height],
                strokewidth, stroke, strokealpha, fill, fillalpha);
        for (var k = 0, lenk = wedges.length; k < lenk; k++) {
            wedges[k].draw(d);
        }
        d.renderGraphics(document.getElementById(id));
    }
    
    function Wedge(start, value, label, center, outerRadius, stroke, fill, textFill) {
        this.start_ = start;
        this.value_ = value;
        this.label_ = label;
        this.center_ = center;
        this.radius_ = (outerRadius - 32) / 1.1;
        this.stroke_ = stroke;
        this.fill_ = fill;
        this.textFill_ = textFill;
    }
    Wedge.prototype.getEnd = function () {
        return this.start_ + this.value_;
    };
    Wedge.prototype.getStartAlpha = function () {
        return toRad(this.getEnd() * -360);
    };
    Wedge.prototype.getMiddleAlpha = function () {
        return toRad((this.start_ + this.getEnd()) / 2 * -360);
    };
    Wedge.prototype.getEndAlpha = function () {
        return toRad(this.start_ * -360);
    };
    Wedge.prototype.getLineStartPosition = function () {
        return Point
                .polar(this.radius_ * 0.7, this.getMiddleAlpha())
                .translate(this.center_);
    };
    Wedge.prototype.getLineEndPosition = function () {
        return Point
                .polar(this.radius_ * 1.1, this.getMiddleAlpha())
                .translate(this.center_);
    };
    Wedge.prototype.getTextPosition = function () {
        var alpha = this.getMiddleAlpha();
        var p = Point
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
    };
    Wedge.prototype.draw = function (d) {
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
                'poly',
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
    };
    
    return {
        draw: draw
    };

}(drawing, geometry));