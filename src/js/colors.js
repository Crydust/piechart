/**
 * @private
 * @param {!string} hexColor
 * @param {!number} alpha
 * @returns {!string}
 */
export function hexToRgba(hexColor, alpha) {
    var color = parseInt(hexColor.substr(1, 6), 16);
    var r = (color >> 16) & 0xFF;
    var g = (color >> 8) & 0xFF;
    var b = color & 0xFF;
    /*
     var r = parseInt(hexColor.substr(1, 2), 16);
     var g = parseInt(hexColor.substr(3, 2), 16);
     var b = parseInt(hexColor.substr(5, 2), 16);
     */
    if (alpha < 1) {
        return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
    }
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}
