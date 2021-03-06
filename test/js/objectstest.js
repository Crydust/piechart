/*global QUnit: false, objects: false */

QUnit.module('objects');

QUnit.test('beget', function (assert) {
    function Animal(name) {
        this._name = name;
    }
    Animal.prototype.setName = function (name) {
        this._name = name;
    };
    Animal.prototype.walk = function () {
        return this._name + ' walking';
    };
    var a = objects.beget(Animal.prototype);
    a.setName('dog');
    assert.ok(a instanceof Animal, 'instanceof');
    assert.equal(a.walk(), 'dog walking');
});

QUnit.test('extend', function (assert) {
    function Animal(name) {
        this._name = name;
    }
    Animal.prototype.setName = function (name) {
        this._name = name;
    };
    Animal.prototype.walk = function () {
        return this._name + ' walking';
    };
    function Bird() {
    }
    objects.extend(Bird, Animal);
    Bird.prototype.fly = function () {
        return this._name + ' flying';
    };
    var a = objects.beget(Animal.prototype);
    a.setName('dog');
    var b = new Bird();
    b.setName('duck');
    assert.ok(a instanceof Animal, 'instanceof');
    assert.equal(a.walk(), 'dog walking');
    assert.ok(b instanceof Animal, 'instanceof');
    assert.ok(b instanceof Bird, 'instanceof');
    assert.equal(b.walk(), 'duck walking');
    assert.equal(b.fly(), 'duck flying');
});
