/*global QUnit: false, colors: false */

QUnit.module('colors');

QUnit.test('hexToRgba', function (assert) {
	assert.expect(3);
    var rgb = colors.hexToRgba('#123456');
    var rgba = colors.hexToRgba('#123456', 0.5);
    var rgb2 = colors.hexToRgba('#123456', 1);
    assert.equal(rgb, 'rgb(18,52,86)');
    assert.equal(rgba, 'rgba(18,52,86,0.5)');
    assert.equal(rgb2, 'rgb(18,52,86)');
});
