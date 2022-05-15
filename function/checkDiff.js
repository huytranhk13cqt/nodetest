let checkDiff = (array1, array2, thamchieu) => {
	Array.prototype.diff = function (a) {
		return this.filter(function (i) {
			return a.indexOf(i) < 0;
		});
	};
	let arr1 = [];
	let arr2 = [];
	let arr3 = [];

	for (let index = 0; index < array1.length; index++) {
		for (let key in array1[index]) {
			if (key == thamchieu) {
				arr1.push(array1[index][key]);
			}
		}
	}

	for (let index = 0; index < array2.length; index++) {
		for (let key in array2[index]) {
			if (key == thamchieu) {
				arr2.push(array2[index][key]);
			}
		}
	}

	let differ = arr1.diff(arr2);

	for (let index = 0; index < array1.length; index++) {
		// index = 0
		for (let key in array1[index]) {
			// có 1 chữ _id
			if (key == thamchieu) {
				for (i = 0; i < differ.length; i++) {
					// i = 0
					if (arr1.includes(differ[i]) && array1[index]._id == differ[i]) {
						arr3.push(array1[index]);
					}
				}
			}
		}
	}
	return arr3;
};

module.exports = checkDiff;
