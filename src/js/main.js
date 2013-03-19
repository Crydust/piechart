//>>excludeStart("prod", pragmas.prod);
require.config({
    baseUrl: 'js/vendor',
    paths: {
        'app': '../app'
    }
});
//>>excludeEnd("prod");

require(['app/drawing', 'app/piechart', 'domready!'], function (drawing, piechart) {
    'use strict';

    piechart.draw(
            'root', 400, 400,
            [20, 20, 20, 20, 20, 20, 20, 20, 20],
            'KN,LC,AA,BB,CC,DD,EE,FF,GG'.split(','));

});