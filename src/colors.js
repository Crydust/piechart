/**
 * @param {!string} hexColor
 * @param {!number} alpha
 * @returns {!string}
 */
export function hexToRgba(hexColor, alpha) {
	const color = parseInt(hexColor.substr(1, 6), 16);
	const r = (color >> 16) & 0xFF;
	const g = (color >> 8) & 0xFF;
	const b = color & 0xFF;
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
