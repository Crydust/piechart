import {assert} from 'chai';
import {hexToRgba} from '../src/colors.js';

describe('colors', function () {
	it('hexToRgba', function () {
		const rgb = hexToRgba('#123456');
		const rgba = hexToRgba('#123456', 0.5);
		const rgb2 = hexToRgba('#123456', 1);
		assert.equal(rgb, 'rgb(18,52,86)');
		assert.equal(rgba, 'rgba(18,52,86,0.5)');
		assert.equal(rgb2, 'rgb(18,52,86)');
	});
});
