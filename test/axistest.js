import {assert} from 'chai';
import {DateAxis, NumericAxis} from '../src/axis.js';

describe('axis', function () {
	it('NumericAxis', function () {
		//assert.equal([1,2,3].indexOf(4), -1);
		const a = new NumericAxis(0, 100, 300, 500);
		assert.equal(a.valueToPixels(300), 0);
		assert.equal(a.valueToPixels(400), 50);
		assert.equal(a.valueToPixels(500), 100);
		assert.equal(a.labelPixels(0, 2), 0);
		assert.equal(a.labelPixels(1, 2), 50);
		assert.equal(a.labelPixels(2, 2), 100);
		assert.equal(a.labelValue(0, 2), 300);
		assert.equal(a.labelValue(1, 2), 400);
		assert.equal(a.labelValue(2, 2), 500);
		assert.equal(a.labelText(0, 2), '300.0');
		assert.equal(a.labelText(1, 2), '400.0');
		assert.equal(a.labelText(2, 2), '500.0');
	});

	it('DateAxis', function () {
		const halfPixel = 0.5;
		const twoDays = 2 * 24 * 60 * 60 * 1000;
		const a = new DateAxis(0, 100, Date.UTC(2000, 0, 1), Date.UTC(2001, 0, 1));
		assert.equal(a.valueToPixels(Date.UTC(2000, 0, 1)), 0);
		assert.closeTo(a.valueToPixels(Date.UTC(2000, 6, 1)), 50, halfPixel);
		assert.equal(a.valueToPixels(Date.UTC(2001, 0, 1)), 100);
		assert.equal(a.labelPixels(0, 2), 0);
		assert.equal(a.labelPixels(1, 2), 50);
		assert.equal(a.labelPixels(2, 2), 100);
		assert.equal(a.labelValue(0, 2), Date.UTC(2000, 0, 1));
		assert.closeTo(a.labelValue(1, 2), Date.UTC(2000, 6, 1), twoDays);
		assert.equal(a.labelValue(2, 2), Date.UTC(2001, 0, 1));
		assert.equal(a.labelText(0, 2), '01/01/00');
		assert.equal(a.labelText(1, 2), '02/07/00');
		assert.equal(a.labelText(2, 2), '01/01/01');
	});
});
