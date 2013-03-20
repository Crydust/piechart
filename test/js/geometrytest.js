/*global QUnit: false, geometry: false */

QUnit.module('geometry.Point');

QUnit.test('constructor', 3, function (assert) {
    var p1 = new geometry.Point(1, 2);
    assert.ok(p1 instanceof geometry.Point);
    assert.equal(p1.getX(), 1);
    assert.equal(p1.getY(), 2);
});

QUnit.test('translate', 8, function (assert) {
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

QUnit.test('polar', 12, function (assert) {
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

QUnit.test('toDeg', 7, function (assert) {
    assert.strictEqual(geometry.toDeg(0), 0, '0 is 0 deg');
    assert.strictEqual(geometry.toDeg(Math.PI / 2), 90, 'pi/2 is 90 deg');
    assert.strictEqual(geometry.toDeg(Math.PI), 180, 'pi is 180 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * 3 / 2), 270, 'pi*3/2 is 270 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * 2), 0, 'pi*2 is 360 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * -3 / 2), 90, 'pi*-3/2 is 90 deg');
    assert.strictEqual(geometry.toDeg(Math.PI * -7 / 2), 90, 'pi*-7/2 is 90 deg');
});

QUnit.test('toRad', 7, function (assert) {
    assert.strictEqual(geometry.toRad(0), 0, '0 is 0 deg');
    assert.strictEqual(geometry.toRad(90), Math.PI / 2, 'pi/2 is 90 deg');
    assert.strictEqual(geometry.toRad(180), Math.PI, 'pi is 180 deg');
    assert.strictEqual(geometry.toRad(270), Math.PI * 3 / 2, 'pi*3/2 is 270 deg');
    assert.strictEqual(geometry.toRad(360), 0, 'pi*2 is 360 deg');
    assert.strictEqual(geometry.toRad(-270), Math.PI / 2, 'pi/2 is -270 deg');
    assert.strictEqual(geometry.toRad(-630), Math.PI / 2, 'pi/2 is -630 deg');
});