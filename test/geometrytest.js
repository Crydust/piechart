import {assert} from 'chai';
import {Point, Rect, toDeg, toRad} from '../src/geometry.js';

describe('geometry', function() {
    describe('Point', function() {
        it('constructor', function() {
            var p1 = new Point(1, 2);
            assert.isOk(p1 instanceof Point);
            assert.equal(p1.getX(), 1);
            assert.equal(p1.getY(), 2);
        });
        it('translate', function() {
            var p1 = new Point(1, 2);
        
            var p2 = p1.translate(2, 3);
            assert.equal(p1.getX(), 1);
            assert.equal(p1.getY(), 2);
            assert.equal(p2.getX(), 3);
            assert.equal(p2.getY(), 5);
            
            var p3 = p1.translate(new Point(2, 3));
            assert.equal(p1.getX(), 1);
            assert.equal(p1.getY(), 2);
            assert.equal(p2.getX(), 3);
            assert.equal(p2.getY(), 5);
        });
        it('polar', function() {
            assert.closeTo(Math.cos(0), 1, 0.001, 'cos 0 = 1');
            assert.closeTo(Math.sin(0), 0, 0.001, 'sin 0 = 0');
            assert.closeTo(Math.cos(Math.PI / 2), 0, 0.001, 'cos 90 = 0');
            assert.closeTo(Math.sin(Math.PI / 2), 1, 0.001, 'sin 90 = 1');

            var p1 = Point.polar(1, 0);
            assert.closeTo(p1.getX(), 1, 0.001);
            assert.closeTo(p1.getY(), 0, 0.001);

            var p2 = Point.polar(1, Math.PI / 2);
            assert.closeTo(p2.getX(), 0, 0.001);
            assert.closeTo(p2.getY(), 1, 0.001);
            
            var p3 = Point.polar(2, 0);
            assert.closeTo(p3.getX(), 2, 0.001);
            assert.closeTo(p3.getY(), 0, 0.001);

            var p4 = Point.polar(2, Math.PI / 2);
            assert.closeTo(p4.getX(), 0, 0.001);
            assert.closeTo(p4.getY(), 2, 0.001);
        });
    });
    describe('Rect', function() {
        it('constructorWithNumbers', function() {
            var r = new Rect(3, 5, 7, 11);
            assert.isOk(r instanceof Rect);
            assert.equal(r.getTop(), 3);
            assert.equal(r.getLeft(), 5);
            assert.equal(r.getWidth(), 7);
            assert.equal(r.getHeight(), 11);
            assert.equal(r.getRight(), 12);
            assert.equal(r.getBottom(), 14);
            assert.equal(r.toString(), 'Rect { top: 3.0, left: 5.0, width: 7.0, height: 11.0}');
        });
        it('constructorWithPoints', function() {
            var r = new Rect(new Point(5, 3), new Point(12, 14));
            assert.isOk(r instanceof Rect);
            assert.equal(r.getTop(), 3);
            assert.equal(r.getLeft(), 5);
            assert.equal(r.getWidth(), 7);
            assert.equal(r.getHeight(), 11);
            assert.equal(r.getRight(), 12);
            assert.equal(r.getBottom(), 14);
            assert.equal(r.toString(), 'Rect { top: 3.0, left: 5.0, width: 7.0, height: 11.0}');
        });
        it('subRect', function() {
            var r = new Rect(3, 5, 7, 11);
            assert.isOk(r instanceof Rect);
            var s = r.subRect(0.909, 0.857, 0.091, 0.143);
            var d = 0.005;
            assert.closeTo(s.getTop(), 4, d, 'top');
            assert.closeTo(s.getLeft(), 6, d, 'left');
            assert.closeTo(s.getWidth(), 5, d, 'width');
            assert.closeTo(s.getHeight(), 9, d, 'height');
            assert.closeTo(s.getRight(), 11, d, 'right');
            assert.closeTo(s.getBottom(), 13, d, 'bottom');
            assert.equal(s.toString(), 'Rect { top: 4.0, left: 6.0, width: 5.0, height: 9.0}');
        });
        it('subRect2', function() {
            var r = new Rect(0, 0, 460, 320);
            assert.isOk(r instanceof Rect);
            var s = r.subRect(0.95, 0.7, 0.2, 0.1);
            var d = 0.005;
            assert.closeTo(s.getTop(), 16, d, 'top');
            assert.closeTo(s.getLeft(), 46, d, 'left');
            assert.closeTo(s.getWidth(), 276, d, 'width');
            assert.closeTo(s.getHeight(), 240, d, 'height');
            assert.closeTo(s.getRight(), 322, d, 'right');
            assert.closeTo(s.getBottom(), 256, d, 'bottom');
            assert.equal(s.toString(), 'Rect { top: 16.0, left: 46.0, width: 276.0, height: 240.0}');
        });
        it('toDeg', function() {
            assert.strictEqual(toDeg(0), 0, '0 is 0 deg');
            assert.strictEqual(toDeg(Math.PI / 2), 90, 'pi/2 is 90 deg');
            assert.strictEqual(toDeg(Math.PI), 180, 'pi is 180 deg');
            assert.strictEqual(toDeg(Math.PI * 3 / 2), 270, 'pi*3/2 is 270 deg');
            assert.strictEqual(toDeg(Math.PI * 2), 0, 'pi*2 is 360 deg');
            assert.strictEqual(toDeg(Math.PI * -3 / 2), 90, 'pi*-3/2 is 90 deg');
            assert.strictEqual(toDeg(Math.PI * -7 / 2), 90, 'pi*-7/2 is 90 deg');
        });
        it('subRect2', function() {
            assert.strictEqual(toRad(0), 0, '0 is 0 deg');
            assert.strictEqual(toRad(90), Math.PI / 2, 'pi/2 is 90 deg');
            assert.strictEqual(toRad(180), Math.PI, 'pi is 180 deg');
            assert.strictEqual(toRad(270), Math.PI * 3 / 2, 'pi*3/2 is 270 deg');
            assert.strictEqual(toRad(360), 0, 'pi*2 is 360 deg');
            assert.strictEqual(toRad(-270), Math.PI / 2, 'pi/2 is -270 deg');
            assert.strictEqual(toRad(-630), Math.PI / 2, 'pi/2 is -630 deg');
        });
    });
});
