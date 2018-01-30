import {Point, toRad} from './geometry.js';
import {CanvasDrawing} from './drawing.js';

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
		return toRad(this.getEnd() * -360);
	}

	getMiddleAlpha() {
		return toRad((this.start_ + this.getEnd()) / 2 * -360);
	}

	getEndAlpha() {
		return toRad(this.start_ * -360);
	}

	getLineStartPosition() {
		return Point
			.polar(this.radius_ * 0.7, this.getMiddleAlpha())
			.translate(this.center_);
	}

	getLineEndPosition() {
		return Point
			.polar(this.radius_ * 1.1, this.getMiddleAlpha())
			.translate(this.center_);
	}

	getTextPosition() {
		const alpha = this.getMiddleAlpha();
		let p = Point
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
		let strokewidth, stroke, strokealpha, fill, fillalpha;

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
		const p1 = this.getLineStartPosition();
		const p2 = this.getLineEndPosition();
		d.drawShape(
			'polyline',
			[p1.getX(), p1.getY(), p2.getX(), p2.getY()],
			strokewidth, stroke, strokealpha,
			fill, fillalpha);

		fill = this.textFill_;
		fillalpha = 1;
		const p3 = this.getTextPosition();
		d.fillText(this.label_, p3.getX(), p3.getY(), fill, fillalpha, '16px sans-serif');
	}
}

export function draw(id, width, height, values, labels) {

	const themeColors = [
		//?        ?          text       line
		'#ffffff', '#eeeeee', '#121212', '#dddddd',
		'#fff4d6', '#d7bad6', '#a1bbee', '#c0c1a1',
		'#f0cbae', '#958f91', '#bfa9ac', '#f8e9be',
		'#c8c8c8', '#a1bbee'
	];
	const center = new Point(width / 2, height / 2);
	const outerRadius = Math.min(width, height) / 2;

	let total = 0;
	let i = 0;
	const leni = values.length;
	for (; i < leni; i++) {
		if (typeof values[i] === 'string') {
			values[i] = parseInt(values[i], 10);
		}
		total += values[i];
	}
	if (total < 0.001) {
		return;
	}
	const wedges = [];
	let start = 0;
	let j = 0;
	const lenj = values.length;
	for (; j < lenj; j++) {
		const fillColor = themeColors[(j % (themeColors.length - 4)) + 4];
		const wedge = new Wedge(start, values[j] / total, labels[j], center, outerRadius, themeColors[3], fillColor, themeColors[2]);
		start = wedge.getEnd();
		wedges.push(wedge);
	}

	const strokewidth = 0, stroke = '#000000', strokealpha = 0, fill = '#eeeeff', fillalpha = 1;
	const d = new CanvasDrawing();
	d.createGraphics(width, height);
	d.drawShape('rect', [0, 0, width, height],
		strokewidth, stroke, strokealpha, fill, fillalpha);
	let k = 0;
	const lenk = wedges.length;
	for (; k < lenk; k++) {
		wedges[k].draw(d);
	}
	d.renderGraphics(document.getElementById(id));
}
