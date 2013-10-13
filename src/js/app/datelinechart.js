/*jslint vars:true, nomen:true, browser:true */
/*global define:false */
define(['./drawing', './geometry', './dataset', './axis'], function (drawing, geometry, dataset, axis) {
    'use strict';

    var Rect = geometry.Rect;
    var DataSetCollection = dataset.DataSetCollection;
    var NumericAxis = axis.NumericAxis;
    var DateAxis = axis.DateAxis;

    function drawRect(d, rect, strokewidth, stroke, strokealpha, fill, fillalpha) {
        d.drawShape('rect', [rect.getLeft(), rect.getTop(), rect.getRight(), rect.getBottom()],
                strokewidth, stroke, strokealpha, fill, fillalpha);
    }

    function drawGrid(d, rect, xAxis, xCount, yAxis, yCount,
            strokewidth, stroke, strokealpha, fill, fillalpha) {
        var i;
        var top = rect.getTop();
        var right = rect.getRight();
        var bottom = rect.getBottom();
        var left = rect.getLeft();
        // background
        d.drawShape('rect', [rect.getLeft(), rect.getTop(), rect.getRight(), rect.getBottom()],
                0, '#000000', 0, fill, fillalpha);
        // vertical stripes
        for (i = 0; i <= xCount; i += 1) {
            var x = xAxis.labelPixels(i, xCount);
            d.drawShape('polyline', [Math.floor(x) + 0.5, Math.floor(top) + 0.5, Math.floor(x) + 0.5, Math.floor(bottom) + 5 + 0.5],
                    strokewidth, stroke, strokealpha, fill, fillalpha);
            d.fillText(xAxis.labelText(i, xCount), x, bottom + 20,
                    '#000000', 1, '16px sans-serif', 'center', 'top');
        }
        // horizontal stripes
        for (i = 0; i <= yCount; i += 1) {
            var y = yAxis.labelPixels(i, yCount);
            d.drawShape('polyline', [Math.floor(left) - 5 + 0.5, Math.floor(y) + 0.5, Math.floor(right) + 0.5, Math.floor(y) + 0.5],
                    strokewidth, stroke, strokealpha, fill, fillalpha);
            d.fillText(yAxis.labelText(i, yCount), left - 10, y,
                    '#000000', 1, '16px sans-serif', 'right', 'middle');
        }

    }

    function drawDataSetValues(d, values, xAxis, yAxis,
            strokewidth, stroke, strokealpha, fill, fillalpha) {
        var i, leni, coordinates;
        coordinates = [];
        if (values.length === 1) {
            strokewidth += 2;
            coordinates.push(
                xAxis.valueToPixels(values[0].x) - 2,
                yAxis.valueToPixels(values[0].y),
                xAxis.valueToPixels(values[0].x) + 2,
                yAxis.valueToPixels(values[0].y)
            );
        } else {
            for (i = 0, leni = values.length; i < leni; i += 1) {
                coordinates.push(
                    xAxis.valueToPixels(values[i].x),
                    yAxis.valueToPixels(values[i].y)
                );
            }
        }
        d.drawShape('polyline', coordinates,
            strokewidth, stroke, strokealpha, fill, fillalpha);
    }

    function drawLegend(d, name, index, count, legendRect,
            strokewidth, stroke, strokealpha, fill, fillalpha) {
        var lineCoordinates = [
            legendRect.getLeft() + 5,
            legendRect.getBottom() - (20 * (count - index)),
            legendRect.getLeft() + 5 + 16,
            legendRect.getBottom() - (20 * (count - index))
        ];
        d.drawShape('polyline', lineCoordinates,
                strokewidth, stroke, strokealpha, fill, fillalpha);
        d.fillText(name,
                legendRect.getLeft() + 5 + 16 + 5,
                legendRect.getBottom() - (20 * (count - index)),
                '#000000', 1, '16px sans-serif', 'left', 'middle');
    }

    
    function draw(id, width, height, rawdatasets) {
        var i, leni;
        var themeColors = [
            //?        ?          text       line
            '#ffffff', '#dddddd', '#000000', '#cccccc',
            '#284b53', '#b8bc9c', '#005699', '#271651',
            '#aa0036', '#ecf0b9', '#999966', '#333366',
            '#c3c3e6', '#594330', '#a0bdc4', '#005699',
            '#999966', '#213321', '#0f3b9c'
        ];

        var rootRect = new Rect(0, 0, width, height);
        var plotAreaRect = rootRect.subRect(0.95, 0.7, 0.2, 0.1);
        var legendRect = rootRect.subRect(0.95, 0.99, 0.2, 0.7);

        var datasets = new DataSetCollection(rawdatasets);
        var minYValue = datasets.getMinYValue();
        var maxYValue = datasets.getMaxYValue();
        var deltaYValue = maxYValue - minYValue;
        var xAxis = new DateAxis(
            plotAreaRect.getLeft(),
            plotAreaRect.getRight(),
            datasets.getMinDate(),
            datasets.getMaxDate()
        );
        var yAxis = new NumericAxis(
            plotAreaRect.getBottom(),
            plotAreaRect.getTop(),
            minYValue,
            maxYValue
        );

        var strokewidth = 0, stroke = '#000000', strokealpha = 0, fill = '#eeeeff', fillalpha = 1;
        var d = new drawing.CanvasDrawing();
        d.createGraphics(width, height);
        drawRect(d, rootRect, strokewidth, stroke, strokealpha, fill, fillalpha);
        fill = '#ffffff';
        stroke = '#cccccc';
        strokewidth = 1;
        strokealpha = 1;
        var yCount = 5;
        if (deltaYValue % 7 === 0) {
            yCount = 7;
        } else if (deltaYValue % 6 === 0) {
            yCount = 6;
        } else if (deltaYValue % 5 === 0) {
            yCount = 5;
        } else if (deltaYValue % 4 === 0) {
            yCount = 4;
        } else if (deltaYValue % 3 === 0) {
            yCount = 3;
        }
        drawGrid(d, plotAreaRect, xAxis, 3, yAxis, yCount,
                strokewidth, stroke, strokealpha, fill, fillalpha);

        fillalpha = 0;
        strokewidth = 2;
        strokealpha = 1;
        for (i = datasets.getCount() - 1; i >= 0; i -= 1) {
            stroke = themeColors[4 + i];
            drawDataSetValues(d, datasets.getItem(i).getValues(), xAxis, yAxis,
                    strokewidth, stroke, strokealpha, fill, fillalpha);
        }

        for (i = 0, leni = datasets.getCount(); i < leni; i += 1) {
            stroke = themeColors[4 + i];
            drawLegend(d, datasets.getItem(i).getName(), i, leni, legendRect,
                    strokewidth, stroke, strokealpha, fill, fillalpha);
        }

        d.renderGraphics(document.getElementById(id));
    }

    return {
        draw: draw
    };

});