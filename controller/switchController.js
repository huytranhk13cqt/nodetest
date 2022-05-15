const { Room, Switch } = require('../model/model');
// const setupDate = require('../1');
// const sendDataToGateway = require('../indexgate');

// const serverSendDataToGateWay = require('../function/serverSendGateway');

// const eventsModule = require('events');
// const config = require('../config').config;
// const SerialPort = require('serialport').SerialPort;
// const port = new SerialPort({ path: config.serial.port2, baudRate: config.serial.baud });

// const slip = require('slip');

// const sendDataToGateway = require('../index');

const switchCtr = {
	// [POST]
	addSwitch: async (req, res) => {
		try {
			const newSwitch = new Switch(req.body);
			const savedSwitch = await newSwitch.save();

			if (req.body.room) {
				const room = await Room.findById(req.body.room);
				if (room != null) {
					await room.updateOne({ $push: { switches: savedSwitch._id } });
				} else {
					savedSwitch.room = 'Phòng trống';
					await savedSwitch.save();
				}
			}

			res.status(200).json(savedSwitch);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getSwitch: async (req, res) => {
		try {
			const switches = await Switch.findById(req.params.id);

			res.status(200).json(switches);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getallSwitch: async (req, res) => {
		try {
			const switches = await Switch.find();
			res.status(200).json(switches);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [PUT]
	updateSwitch: async (req, res) => {
		try {
			const switches = await Switch.findById(req.params.id);
			console.log(req.body);
			// console.log(switches);
			// sendDataToGateway(req.body);

			// ---------- || ---------- || ---------- //

			// TH : trong body có thông tin của room
			if (req.body.room) {
				const room = await Room.findById(req.body.room);

				// TH : thông tin room sai
				if (room == null) {
					return res.status(404).json('Room không tồn tại');
				}
				// TH : thông tin room đúng
				else {
					// TH : đổi room cho thiết bị
					if (switches.room != req.body.room) {
						await Room.updateMany(
							{ switches: switches._id },
							{ $pull: { switches: switches._id } }
						);

						await room.updateOne({ $push: { switches: switches._id } });

						switches.room = req.body.room;
						await switches.save();

						console.log('Đổi room thành công');

						// [UPDATE] : trong DB
						await switches.updateOne({
							$set: req.body,
						});

						// [UPDATE] : đổ dữ liệu về cho gateway
						return res.status(200).json('update successfully !');
					}

					// TH : không đổi room
					else {
						await switches.updateOne({
							$set: req.body,
						});

						return res.status(200).json('update successfully !');
					}
				}
			}
			// TH : trong body không có thông tin của room
			else {
				await switches.updateOne({
					$set: req.body,
				});
				return res.status(200).json('update successfully !');

				// Timer
				// nếu có timer thì hết timer mới trả về kết quả
				// if (req.body.timer) {
				// 	setTimeout(async () => {
				// 		console.log('Có timer');
				// 		req.body.timer = 0;
				// 		await switches.updateOne({
				// 			$set: req.body,
				// 		});
				// 		const switches2 = await Switch.findById(req.params.id);
				// 		res.status(200).json(switches2.status);
				// 	}, req.body.timer);
				// } else {
				// 	console.log('Không có timer');
				// 	await switches.updateOne({
				// 		$set: req.body,
				// 	});
				// 	const switches2 = await Switch.findById(req.params.id);
				// 	//sendDataToGateway(switches2);
				// 	res.status(200).json(switches2.status);
				// }
			}
		} catch (error) {
			return res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteSwitch: async (req, res) => {
		try {
			await Room.updateMany({ switches: req.params.id }, { $pull: { switches: req.params.id } });

			await Switch.findByIdAndDelete(req.params.id);

			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// updateSwitchFollowCalendar: async (req, res) => {
	// 	try {
	// 		const arrayIdSwitches = req.body.arraySwitch;
	// 		const arrayInput = req.body.arrayDay;
	// 		const hourInput = req.body.hour;
	// 		const minuteInput = req.body.minute;
	// 		const milisInput = req.body.milis;

	// 		const arraySwitches = [];

	// 		for (let i = 0; i < arrayIdSwitches.length; i++) {
	// 			const switches = await Switch.findById(arrayIdSwitches[i]);
	// 			arraySwitches.push(switches);
	// 		}

	// 		let str = setupDate(arrayInput, hourInput, minuteInput, milisInput);

	// 		res.status(200).json(str);
	// 	} catch (error) {
	// 		res.status(500).json(error);
	// 	}
	// },

	// updateSwitch1: async (req, res) => {
	// 	try {
	// 		// tìm switch
	// 		const switches = await Switch.findById('s1');
	// 		var obj = {
	// 			_id: 's1',
	// 			name: 'Công tắc extra',
	// 			typeDevice: 'Switch',
	// 			status: {
	// 				button1: true,
	// 				button2: true,
	// 				both: true,
	// 			},
	// 		};
	// 		await switches.updateOne({
	// 			$set: obj,
	// 		});

	// 		res.status(200).json('success');
	// 	} catch (error) {
	// 		res.status(500).json(error);
	// 	}
	// },
};

module.exports = switchCtr;
