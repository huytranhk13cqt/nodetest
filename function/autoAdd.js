const { House, Room, Aircon, Induction, Doorbell, Switch } = require('../model/model');

/*|======================================================================================| 
	| gatewayCtr : để ta khởi tạo các thiết bị ban đầu (các node) đang kết nối với gateway |
	|======================================================================================|*/

let autoAdd = async (arrayDevice) => {
	let addSwitch = async (arrayDevice) => {
		const newSwitch = new Switch(arrayDevice[i]);
		const saveSwitch = await newSwitch.save();
		if (newSwitch.room) {
			const host = await Room.findById(newSwitch.room);
			await host.updateOne({ $push: { switches: saveSwitch._id } });
			console.log(200, 'Save Switch ID:', saveSwitch._id);
		}
	};

	let addAircon = async (arrayDevice) => {
		const newAircon = new Aircon(arrayDevice[i]);
		const savedAircon = await newAircon.save();
		if (newAircon.room) {
			const host = await Room.findById(newAircon.room);
			await host.updateOne({ $push: { aircons: savedAircon._id } });
			console.log(200, 'Save Aircon ID:', savedAircon._id);
		}
	};

	let addInduction = async (arrayDevice) => {
		const newInduction = new Induction(arrayDevice[i]);
		const saveInduction = await newInduction.save();
		if (newInduction.room) {
			const host = await Room.findById(newInduction.room);
			await host.updateOne({ $push: { inductions: saveInduction._id } });
			console.log(200, 'Save Induction ID:', saveInduction._id);
		}
	};

	for (var i = 0; i < arrayDevice.length; i++) {
		const typeD = arrayDevice[i].typeDevice;

		switch (typeD) {
			case 'Switch':
				addSwitch(arrayDevice);
				break;
			case 'Socket':
				addSwitch(arrayDevice);
				break;
			case 'Aircon':
				addAircon(arrayDevice);
				break;
			case 'Induction':
				addInduction(arrayDevice);
				break;
			default:
				console.log(500, 'Unkow Type Devices For Add');
				break;
		}
	}
};
module.exports = autoAdd;
