/*global QUnit: false, geometry: false */

QUnit.module('geometry.Point');

QUnit.test('constructor', function (assert) {
	assert.expect(3);
    var p1 = new geometry.Point(1, 2);
    assert.ok(p1 instanceof geometry.Point);
    assert.equal(p1.getX(), 1);
    assert.equal(p1.getY(), 2);
});

QUnit.test('translate', function (assert) {
	assert.expect(8);
    var p1 = new geometry.Point(1, 2);
    
    var p2 = p1.translate(2, 3);
    assert.equal(p1.getX(), 1);
    assert.equal(p1.getY(), 2);
    assert.equal(p2.getX(), 3);
    assert.equal(p2.getY(), 5);
    
    var p3 = p1.translate(new geometry.Point(2, 3));
    assert.equal(p1.getX(), 1);
    assert.equal(p1.getY(), 2);
    assert.equal(p2.getX(), 3);
    assert.equal(p2.getY(), 5);
});

QUnit.test('polar', function (assert) {
	assert.expect(12);
    assert.close(Math.cos(0), 1, 0.001, 'cos 0 = 1');
    assert.close(Math.sin(0), 0, 0.001, 'sin 0 = 0');
    assert.close(Math.cos(Math.PI / 2), 0, 0.001, 'cos 90 = 0');
    assert.close(Math.sin(Math.PI / 2), 1, 0.001, 'sin 90 = 1');

    var p1 = geometry.Point.polar(1, 0);
    assert.close(p1.getX(), 1, 0.001);
    assert.close(p1.getY(), 0, 0.001);

    var p2 = geometry.Point.polar(1, Math.PI / 2);
    assert.close(p2.getX(), 0, 0.001);
    assert.close(p2.getY(), 1, 0.001);
    
    var p3 = geometry.Point.polar(2, 0);
    assert.close(p3.getX(), 2, 0.001);
    assert.close(p3.getY(), 0, 0.001);

    var p4 = geometry.Point.polar(2, Math.PI / 2);
    assert.close(p4.getX(), 0, 0.001);
    assert.close(p4.getY(), 2, 0.001);
});


QUnit.module('geometry.Rect');

QUnit.test('constructorWithNumbers', function (assert) {
    var r = new geometry.Rect(3, 5, 7, 11);
    assert.ok(r instanceof geometry.Rect);
    assert.equal(r.getTop(), 3);
    assert.equal(r.getLeft(), 5);
    assert.equal(r.getWidth(), 7);
    assert.equal(r.getHeight(), 11);
    assert.equal(r.getRight(), 12);
    assert.equal(r.getBottom(), 14);
    assert.equal(r.toString(), 'Rect { top: 3.0, left: 5.0, width: 7.0, height: 11.0}');
});

QUnit.test('constructorWithPoints', function (assert) {
    var r = new geometry.Rect(new geometry.Point(5, 3), new geometry.Point(12, 14));
    assert.ok(r instanceof geometry.Rect);
    assert.equal(r.getTop(), 3);
    assert.equal(r.getLeft(), 5);
    assert.equal(r.getWidth(), 7);
    assert.equal(r.getHeight(), 11);
    assert.equal(r.getRight(), 12);
    assert.equal(r.getBottom(), 14);
    assert.equal(r.toString(), 'Rect { top: 3.0, left: 5.0, width: 7.0, height: 11.0}');
});

QUnit.test('constructorWithNumbers', function (assert) {
    var r = new geometry.Rect(3, 5, 7, 11);
    assert.ok(r instanceof geometry.Rect);
    assert.equal(r.getTop(), 3);
    assert.equal(r.getLeft(), 5);
    assert.equal(r.getWidth(), 7);
    assert.equal(r.getHeight(), 11);
    assert.equal(r.getRight(), 12);
    assert.equal(r.getBottom(), 14);
    assert.equal(r.toString(), 'Rect { top: 3.0, left: 5.0, width: 7.0, height: 11.0}');
});

QUnit.test('subRect', function (assert) {
    var r = new geometry.Rect(3, 5, 7, 11);
    assert.ok(r instanceof geometry.Rect);
    var s = r.subRect(0.909, 0.857, 0.091, 0.143);
    var d = 0.005;
    assert.close(s.getTop(), 4, d, 'top');
    assert.close(s.getLeft(), 6, d, 'left');
    assert.close(s.getWidth(), 5, d, 'width');
    assert.close(s.getHeight(), 9, d, 'height');
    assert.close(s.getRight(), 11, d, 'right');
    assert.close(s.getBottom(), 13, d, 'bottom');
    assert.equal(s.toString(), 'Rect { top: 4.0, left: 6.0, width: 5.0, height: 9.0}');
});

QUnit.test('subRect2', function (assert) {
    var r = new geometry.Rect(0, 0, 460, 320);
    assert.ok(r instanceof geometry.Rect);
    var s = r.subRect(0.95, 0.7, 0.2, 0.1);
    var d = 0.005;
    assert.close(s.getTop(), 16, d, 'top');
    assert.close(s.getLeft(), 46, d, 'left');
    assert.close(s.getWidth(), 276, d, 'width');
    assert.close(s.getHeight(), 240, d, 'height');
    assert.close(s.getRight(), 322, d, 'right');
    assert.close(s.getBottom(), 256, d, 'bottom');
    assert.equal(s.toString(), 'Rect { top: 16.0, left: 46.0, width: 276.0, height: 240.0}');
});


QUnit.test('toDeg', function (assert) {
	assert.expect(7);
    assert.strictEqual(geometry.toDeg(0), 0, '0 is 0 deg');
    assert.strictEqual(geometry.toDeg(Math.PI / 2), 90, 'pi/2 is 90 deg');
    assert.strictEqual(geometry.toDeg(Math.PI), 180, 'pi is 180 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * 3 / 2), 270, 'pi*3/2 is 270 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * 2), 0, 'pi*2 is 360 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * -3 / 2), 90, 'pi*-3/2 is 90 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * -7 / 2), 90, 'pi*-7/2 is 90 deg');
});

QUnit.test('toRad', function (assert) {
	assert.expect(7);
    assert.strictEqual(geometry.toRad(0), 0, '0 is 0 deg');
    assert.strictEqual(geometry.toRad(90), Math.PI / 2, 'pi/2 is 90 deg');
    assert.strictEqual(geometry.toRad(180), Math.PI, 'pi is 180 deg');
    assert.strictEqual(geometry.toRad(270), Math.PI * 3 / 2, 'pi*3/2 is 270 deg');
    assert.strictEqual(geometry.toRad(360), 0, 'pi*2 is 360 deg');
    assert.strictEqual(geometry.toRad(-270), Math.PI / 2, 'pi/2 is -270 deg');
    assert.strictEqual(geometry.toRad(-630), Math.PI / 2, 'pi/2 is -630 deg');
});