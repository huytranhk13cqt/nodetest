const { Induction, Doorbell, Switch, Aircon } = require('../model/model');

const deviceCtr = {
	/*| ============================================================|
		| trả về tất cả các loại thiết bị (object) vào 1 mảng (array) | 
	 	| ============================================================| */
	getAllDevice: async (req, res) => {
		try {
			// Find all device
			const switches = await Switch.find();
			const aircons = await Aircon.find();
			const inductions = await Induction.find();
			const doorbells = await Doorbell.find();

			// Function support
			let filterStatus = (devices) => {
				let arr = [];
				for (var i = 0; i < devices.length; i++) {
					const { status, ...others } = devices[i]._doc;
					arr.push({ ...others });
				}
				return arr;
			};

			// array includes some devices
			let resultSwitches = filterStatus(switches);
			let resultAircons = filterStatus(aircons);
			let resultInductions = filterStatus(inductions);
			let resultDoorbells = filterStatus(doorbells);

			// push all devices to 1 array : arayResult[]
			let arrayResult = [];

			for (let i = 0; i < resultSwitches.length; i++) {
				arrayResult.push(resultSwitches[i]);
			}
			for (let i = 0; i < resultAircons.length; i++) {
				arrayResult.push(resultAircons[i]);
			}
			for (let i = 0; i < resultInductions.length; i++) {
				arrayResult.push(resultInductions[i]);
			}
			for (let i = 0; i < resultDoorbells.length; i++) {
				arrayResult.push(resultDoorbells[i]);
			}

			// RESPOND
			return res.status(200).json(arrayResult);
		} catch (error) {
			// ERROR
			res.status(500).json(error);
		}
	},
};

module.exports = deviceCtr;
