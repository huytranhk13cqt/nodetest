const { Induction, Room } = require('../model/model');

const inductionCtr = {
	// [POST]
	addInduction: async (req, res) => {
		try {
			const newInduction = new Induction(req.body);
			const savedInduction = await newInduction.save();

			if (req.body.room) {
				const host = await Room.findById(req.body.room);
				await host.updateOne({ $push: { inductions: savedInduction._id } });
			}

			res.status(200).json(savedInduction);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getInduction: async (req, res) => {
		try {
			const induction = await Induction.findById(req.params.id);

			res.status(200).json(induction);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [PUT]
	updateInduction: async (req, res) => {
		try {
			const induction = await Induction.findById(req.params.id);

			if (req.body.room) {
				const room = await Room.findById(req.body.room);

				if (room == null) {
					return res.status(404).json('ROOM NOT FOUND');
				} else {
					if (induction.room != req.body.room) {
						await room.updateMany(
							{ inductions: induction._id },
							{ $pull: { inductions: induction._id } }
						);

						// push switch với id này vào cái room trong body vừa tìm được
						await room.updateOne({ $push: { inductions: induction._id } });

						// update thông tin room mới trong switch
						induction.room = req.body.room;
						await induction.save();

						console.log('CHANGE ROOM SUCCESSFULLY');
						await induction.updateOne({ $set: req.body });
						res.status(200).json('Update successfully !');
					} else {
						await induction.updateOne({ $set: req.body });
						res.status(200).json('Update successfully !');
					}
				}
			} else {
				await induction.updateOne({ $set: req.body });
				res.status(200).json('Update successfully !');
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteInduction: async (req, res) => {
		try {
			await Room.updateMany(
				{ inductions: req.params.id },
				{ $pull: { inductions: req.params.id } }
			);

			await Induction.findByIdAndDelete(req.params.id);

			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	getAllInduction: async (req, res) => {
		try {
			const inductions = await Induction.find();
			return res.status(200).json(inductions);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = inductionCtr;
