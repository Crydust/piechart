//>>excludeStart("prod", pragmas.prod);
require.config({
    baseUrl: 'js/vendor',
    paths: {
        'app': '../app',
        'json': 'vendor/json3'
    }
});
//>>excludeEnd("prod");

require(['app/drawing', 'domready!'], function (drawing) {
    'use strict';
    var strokewidth = 1, stroke = '#000000', strokealpha = 1, fill = '#6666CC', fillalpha = 1;
    var d = new drawing.CanvasDrawing();
    d.createGraphics(400, 300);
    //x1, y1, x2, y2, ...
    d.drawShape('poly', [134, 10, 165, 15, 170, 46, 142, 60, 120, 38], strokewidth, stroke, strokealpha, fill, fillalpha);
    //x, y, radius
    d.drawShape('circle', [85, 35, 25], strokewidth, stroke, strokealpha, fill, fillalpha);
    //tlx, tly, brx, bry
    d.drawShape('rect', [10, 10, 50, 60], strokewidth, stroke, strokealpha, fill, fillalpha);
    //x, y, radius, startAngle, endAngle
    d.drawShape('arc', [200, 35, 25, Math.PI * 0.0, Math.PI * 0.5], strokewidth, stroke, strokealpha, fill, fillalpha);
    d.drawShape('arc', [200, 35, 25, Math.PI * 0.5, Math.PI * 1.0], strokewidth, stroke, strokealpha, fill, fillalpha);
    d.drawShape('arc', [200, 35, 25, Math.PI * 1.0, Math.PI * 1.5], strokewidth, stroke, strokealpha, fill, fillalpha);
    d.drawShape('arc', [200, 35, 25, Math.PI * 1.5, Math.PI * 1.9], strokewidth, stroke, strokealpha, fill, fillalpha);
    //text, x, y
    d.fillText('text', 20, 100, fill, fillalpha);
    d.renderGraphics(document.getElementById('root'));
});