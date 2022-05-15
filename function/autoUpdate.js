const { House, Room, Aircon, Induction, Doorbell, Switch } = require('../model/model');

let autoUpdate = async (objectDevice) => {
	let updateSwitch = async (objectDevice) => {
		try {
			console.log(200, 'ID Feedback Switch', objectDevice._id);
			const switches = await Switch.findById(objectDevice._id);
			await switches.updateOne({
				$set: objectDevice,
			});
		} catch (error) {
			console.log(400, 'Error Feedback Switch');
		}
	};

	// UPDATE AIRCON
	let updateAircon = async (objectDevice) => {
		try {
			console.log('ID Feedback Aircon', objectDevice._id);

			const aircons = await Aircon.findById(objectDevice._id);
			await aircons.updateOne({
				$set: objectDevice,
			});
		} catch (error) {
			console.log(400, 'Error Feedback Aircon');
		}
	};

	// UPDATE INDUCTION
	let updateInduction = async (objectDevice) => {
		try {
			console.log('ID Feedback Induction', objectDevice._id);

			const inductions = await Induction.findById(objectDevice._id);
			await inductions.updateOne({
				$set: objectDevice,
			});
		} catch (error) {
			console.log(400, 'Error Feedback Induction');
		}
	};

	for (var i = 0; i < objectDevice.length; i++) {
		const typeD = objectDevice[i].typeDevice;

		switch (typeD) {
			case 'Switch':
				updateSwitch(objectDevice[i]);
				break;
			case 'Socket':
				updateSwitch(objectDevice[i]);
				break;
			case 'Aircon':
				updateAircon(objectDevice[i]);
				break;
			case 'Induction':
				updateInduction(objectDevice[i]);
				break;
			default:
				console.log(500, 'Unknow Type Device For Feedback');
				break;
		}
	}
};
module.exports = autoUpdate;
