/*jslint vars:true, nomen:true, browser:true */
/*global define:false */
define(function () {
    'use strict';

    function DataSet(name, dateValues, yValues) {
        this._name = name;
        this._dateValues = dateValues;
        this._yValues = yValues;
    }
    DataSet.prototype.getExtremeDates = function () {
        var i, leni;
        var minDate = Date.UTC(2100, 0, 1, 0, 0, 0, 0);
        var maxDate = Date.UTC(1970, 0, 1, 0, 0, 0, 0);
        for (i = 0, leni = this._dateValues.length; i < leni; i += 1) {
            var date = this._dateValues[i];
            if (date < minDate) {
                minDate = date;
            }
            if (date > maxDate) {
                maxDate = date;
            }
        }
        //console.log(new Date(minDate), new Date(maxDate));
        minDate = Date.UTC(new Date(minDate).getUTCFullYear(), new Date(minDate).getUTCMonth(), 1, 0, 0, 0, 0);
        if (new Date(maxDate).getUTCMonth() === 11) {
            maxDate = Date.UTC(new Date(maxDate).getUTCFullYear() + 1, 0, 1, 0, 0, 0, 0);
        } else {
            maxDate = Date.UTC(new Date(maxDate).getUTCFullYear(), new Date(maxDate).getUTCMonth() + 1, 1, 0, 0, 0, 0);
        }
        return [minDate, maxDate];
    };
    DataSet.prototype.getMinDate = function () {
        return this.getExtremeDates()[0];
    };
    DataSet.prototype.getMaxDate = function () {
        return this.getExtremeDates()[1];
    };
    DataSet.prototype.getExtremeYValues = function () {
        var i, leni;
        var minYValue = 1000000;
        var maxYValue = -1000000;
        for (i = 0, leni = this._yValues.length; i < leni; i += 1) {
            var yValue = this._yValues[i];
            if (yValue < minYValue) {
                minYValue = yValue;
            }
            if (yValue > maxYValue) {
                maxYValue = yValue;
            }
            //console.log('yyy', minYValue, yValue, maxYValue);
        }
        if (minYValue >= 0 && minYValue < 1) {
            minYValue = 0;
        } else {
            minYValue = Math.floor(minYValue - 0.5);
        }
        if (maxYValue > 9 && maxYValue <= 10) {
            maxYValue = 10;
        } else {
            maxYValue = Math.ceil(maxYValue + 0.5);
        }
        return [minYValue, maxYValue];
    };
    DataSet.prototype.getMinYValue = function () {
        return this.getExtremeYValues()[0];
    };
    DataSet.prototype.getMaxYValue = function () {
        return this.getExtremeYValues()[1];
    };
    DataSet.prototype.getName = function () {
        return this._name;
    };
    DataSet.prototype.getValues = function () {
        var i, leni;
        var result = [];
        for (i = 0, leni = this._dateValues.length; i < leni; i += 1) {
            result.push({
                x: this._dateValues[i],
                y: this._yValues[i]
            });
        }
        return result;
    };

    function DataSetCollection(rawdatasets) {
        var i, leni, j, lenj;
        this._datasets = [];
        for (i = 0, leni = rawdatasets.length; i < leni; i += 1) {
            var name = rawdatasets[i].Name;
            var dateValues = [];
            var rawDateValues = rawdatasets[i].DateValues.split(',');
            for (j = 0, lenj = rawDateValues.length; j < lenj; j += 1) {
                var rawDateValueParts = rawDateValues[j].split('/');
                var year = parseInt(rawDateValueParts[2], 10);
                if (year < 70) {
                    year = 2000 + year;
                } else if (year < 100) {
                    year = 1900 + year;
                }
                var month = parseInt(rawDateValueParts[1], 10) - 1;
                var day = parseInt(rawDateValueParts[0], 10);
                //console.log(rawDateValues[j], year, month, day);
                dateValues.push(Date.UTC(year, month, day, 0, 0, 0, 0));
            }
            var yValues = [];
            var rawYValues = rawdatasets[i].YValues.split(',');
            for (j = 0, lenj = rawYValues.length; j < lenj; j += 1) {
                var yValue = parseFloat(rawYValues[j]);
                //console.log(rawYValues[j], yValue);
                yValues.push(yValue);
            }
            this._datasets.push(new DataSet(name, dateValues, yValues));
        }
    }
    DataSetCollection.prototype.getExtremeDates = function () {
        var i, leni;
        var minDate = Date.UTC(2100, 0, 1, 0, 0, 0, 0);
        var maxDate = Date.UTC(1970, 0, 1, 0, 0, 0, 0);
        for (i = 0, leni = this._datasets.length; i < leni; i += 1) {
            var extremes = this._datasets[i].getExtremeDates();
            minDate = Math.min(minDate, extremes[0]);
            maxDate = Math.max(maxDate, extremes[1]);
        }
        return [minDate, maxDate];
    };
    DataSetCollection.prototype.getMinDate = function () {
        return this.getExtremeDates()[0];
    };
    DataSetCollection.prototype.getMaxDate = function () {
        return this.getExtremeDates()[1];
    };
    DataSetCollection.prototype.getExtremeYValues = function () {
        var i, leni;
        var minYValue = 1000000;
        var maxYValue = -1000000;
        for (i = 0, leni = this._datasets.length; i < leni; i += 1) {
            var extremes = this._datasets[i].getExtremeYValues();
            minYValue = Math.min(minYValue, extremes[0]);
            maxYValue = Math.max(maxYValue, extremes[1]);
        }
        return [minYValue, maxYValue];
    };
    DataSetCollection.prototype.getMinYValue = function () {
        return this.getExtremeYValues()[0];
    };
    DataSetCollection.prototype.getMaxYValue = function () {
        return this.getExtremeYValues()[1];
    };
    DataSetCollection.prototype.getCount = function () {
        return this._datasets.length;
    };
    DataSetCollection.prototype.getItem = function (index) {
        return this._datasets[index];
    };
    
    return {
        DataSetCollection: DataSetCollection,
        DataSet: DataSet
    };
});