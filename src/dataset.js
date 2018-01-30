export class DataSet {

	constructor(name, dateValues, yValues) {
		this._name = name;
		this._dateValues = dateValues;
		this._yValues = yValues;
	}

	getExtremeDates() {
		let i, leni;
		let minDate = Date.UTC(2100, 0, 1, 0, 0, 0, 0);
		let maxDate = Date.UTC(1970, 0, 1, 0, 0, 0, 0);
		for (i = 0, leni = this._dateValues.length; i < leni; i++) {
			const date = this._dateValues[i];
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
	}

	getMinDate() {
		return this.getExtremeDates()[0];
	}

	getMaxDate() {
		return this.getExtremeDates()[1];
	}

	getExtremeYValues() {
		let i, leni;
		let minYValue = 1000000;
		let maxYValue = -1000000;
		for (i = 0, leni = this._yValues.length; i < leni; i++) {
			const yValue = this._yValues[i];
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
	}

	getMinYValue() {
		return this.getExtremeYValues()[0];
	}

	getMaxYValue() {
		return this.getExtremeYValues()[1];
	}

	getName() {
		return this._name;
	}

	getValues() {
		let i, leni;
		const result = [];
		for (i = 0, leni = this._dateValues.length; i < leni; i++) {
			result.push({
				x: this._dateValues[i],
				y: this._yValues[i]
			});
		}
		return result;
	}

}

export class DataSetCollection {
	constructor(rawdatasets) {
		let i, leni, j, lenj;
		this._datasets = [];
		for (i = 0, leni = rawdatasets.length; i < leni; i++) {
			const name = rawdatasets[i].Name;
			const dateValues = [];
			const rawDateValues = rawdatasets[i].DateValues.split(',');
			for (j = 0, lenj = rawDateValues.length; j < lenj; j++) {
				const rawDateValueParts = rawDateValues[j].split('/');
				let year = parseInt(rawDateValueParts[2], 10);
				if (year < 70) {
					year = 2000 + year;
				} else if (year < 100) {
					year = 1900 + year;
				}
				const month = parseInt(rawDateValueParts[1], 10) - 1;
				const day = parseInt(rawDateValueParts[0], 10);
				//console.log(rawDateValues[j], year, month, day);
				dateValues.push(Date.UTC(year, month, day, 0, 0, 0, 0));
			}
			const yValues = [];
			const rawYValues = rawdatasets[i].YValues.split(',');
			for (j = 0, lenj = rawYValues.length; j < lenj; j++) {
				const yValue = parseFloat(rawYValues[j]);
				//console.log(rawYValues[j], yValue);
				yValues.push(yValue);
			}
			this._datasets.push(new DataSet(name, dateValues, yValues));
		}
	}

	getExtremeDates() {
		let i, leni;
		let minDate = Date.UTC(2100, 0, 1, 0, 0, 0, 0);
		let maxDate = Date.UTC(1970, 0, 1, 0, 0, 0, 0);
		for (i = 0, leni = this._datasets.length; i < leni; i++) {
			const extremes = this._datasets[i].getExtremeDates();
			minDate = Math.min(minDate, extremes[0]);
			maxDate = Math.max(maxDate, extremes[1]);
		}
		return [minDate, maxDate];
	}

	getMinDate() {
		return this.getExtremeDates()[0];
	}

	getMaxDate() {
		return this.getExtremeDates()[1];
	}

	getExtremeYValues() {
		let i, leni;
		let minYValue = 1000000;
		let maxYValue = -1000000;
		for (i = 0, leni = this._datasets.length; i < leni; i++) {
			const extremes = this._datasets[i].getExtremeYValues();
			minYValue = Math.min(minYValue, extremes[0]);
			maxYValue = Math.max(maxYValue, extremes[1]);
		}
		return [minYValue, maxYValue];
	}

	getMinYValue() {
		return this.getExtremeYValues()[0];
	}

	getMaxYValue() {
		return this.getExtremeYValues()[1];
	}

	getCount() {
		return this._datasets.length;
	}

	getItem(index) {
		return this._datasets[index];
	}

}

