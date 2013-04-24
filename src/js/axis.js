/*global objects: false */
var axis = (function (objects) {
    var extend = objects.extend;
    function NumericAxis(minimumPixels, maximumPixels, minimumValue, maximumValue) {
        this._minimumPixels = minimumPixels;
        this._maximumPixels = maximumPixels;
        this._pixelLength = maximumPixels - minimumPixels;
        this._minimumValue = minimumValue;
        this._maximumValue = maximumValue;
    }
    NumericAxis.prototype.valueToPixels = function (value) {
        return this._minimumPixels + this._pixelLength *
                (value - this._minimumValue) /
                (this._maximumValue - this._minimumValue);
    };
    NumericAxis.prototype.labelPixels = function (index, count) {
        return this._minimumPixels + this._pixelLength * index / count;
    };
    NumericAxis.prototype.labelValue = function (index, count) {
        return (this._minimumValue +
                ((this._maximumValue - this._minimumValue) *
                index / count));
    };
    NumericAxis.prototype.labelText = function (index, count) {
        return this.labelValue(index, count).toFixed(1);
    };
    function DateAxis(minimumPixels, maximumPixels, minimumValue, maximumValue) {
        this._minimumPixels = minimumPixels;
        this._maximumPixels = maximumPixels;
        this._pixelLength = maximumPixels - minimumPixels;
        this._minimumValue = minimumValue;
        this._maximumValue = maximumValue;
    }
    extend(DateAxis, NumericAxis);
    DateAxis.prototype.labelText = function (index, count) {
        var epoch = Math.round(this.labelValue(index, count));
        var date = new Date(epoch);
        var d = date.getUTCDate();
        var m = date.getUTCMonth() + 1;
        var y = date.getUTCFullYear() % 100;
        d = d < 10 ? '0' + d : d;
        m = m < 10 ? '0' + m : m;
        y = y < 10 ? '0' + y : y;
        return [d, m, y].join('/');
    };
    
    return {
        NumericAxis: NumericAxis,
        DateAxis: DateAxis
    };
}(objects));