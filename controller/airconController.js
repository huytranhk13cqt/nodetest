const { Aircon, Room } = require('../model/model');

const airconCtr = {
	// [POST]
	addAircon: async (req, res) => {
		try {
			const newAircon = new Aircon(req.body);
			const savedAircon = await newAircon.save();

			if (req.body.room) {
				const room = await Room.findById(req.body.room);
				if (room != null) {
					await room.updateOne({ $push: { aircons: savedAircon._id } });
				} else {
					savedAircon.room = 'Phòng trống';
					await savedAircon.save();
				}
			}

			res.status(200).json(savedAircon);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getAircon: async (req, res) => {
		try {
			const aircon = await Aircon.findById(req.params.id);

			res.status(200).json(aircon);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getallAircon: async (req, res) => {
		try {
			const aircons = await Aircon.find();
			res.status(200).json(aircons);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [PUT]
	updateAircon: async (req, res) => {
		try {
			const aircon = await Aircon.findById(req.params.id);
			// console.log(req.body.status);
			// await aircon.updateOne({
			// 	$set: req.body.status,
			// });
			// res.status(200).json('Update successfully !');

			if (req.body.room) {
				const room = await Room.findById(req.body.room);

				if (room == null) {
					return res.status(404).json('ROOM NOT FOUND');
				} else {
					if (aircon.room != req.body.room) {
						await room.updateMany({ aircons: aircon._id }, { $pull: { aircons: aircon._id } });

						await room.updateOne({ $push: { aircons: aircon._id } });

						aircon.room = req.body.room;
						await aircon.save();

						console.log('CHANGE ROOM SUCCESSFULLY');
						await aircon.updateOne({
							$set: req.body,
						});
						res.status(200).json('Update successfully !');
					} else {
						await aircon.updateOne({
							$set: req.body,
						});

						res.status(200).json('Update successfully !');
					}
				}
			} else {
				await aircon.updateOne({
					$set: req.body,
				});
				console.log('Đã update');
				res.status(200).json('Update successfully !');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteAircon: async (req, res) => {
		try {
			await Room.updateMany({ aircons: req.params.id }, { $pull: { aircons: req.params.id } });

			await Aircon.findByIdAndDelete(req.params.id);

			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = airconCtr;
