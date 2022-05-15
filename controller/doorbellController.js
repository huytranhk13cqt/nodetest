const { Doorbell, Room } = require('../model/model');

const makeImage = require('../function/makeImage');

/*|========================================================================================================| 
	| Doorbell communicate with Androi via Websocket, when connected -> Android make [GET/POST] API to Server|
	|========================================================================================================|*/

const doorbellCtr = {
	// [POST]
	addDoorbell: async (req, res) => {
		try {
			const newDoorbell = new Doorbell(req.body);
			const savedDoorbell = await newDoorbell.save();

			if (req.body.room) {
				const host = await Room.findById(req.body.room);
				await host.updateOne({ $push: { doorbells: savedDoorbell._id } });
			}

			// CREATE IMAGE FIRST IF EXIST
			// if (newDoorbell.status.numberImg) {
			// 	let num = newDoorbell.status.numberImg;
			// 	makeImage(
			// 		newDoorbell.status.Img[num - 1].codeImg,
			// 		10,
			// 		'abcdefghijklmnopqrstuvwxyz0123456789'
			// 	);
			// }

			res.status(200).json(savedDoorbell);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getdDoorbell: async (req, res) => {
		try {
			console.log('vào');
			const doorbell = await Doorbell.findById(req.params.id);

			res.status(200).json(doorbell);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [POST] - SHOOT NEW PICTURE
	shootPicture: async (req, res) => {
		try {
			const doorbell = await Doorbell.findById(req.params.id);

			// PUSH NEW IMAGE TO IMG ARRAY
			doorbell.status.picture.push(req.body.status.picture);

			// INCREASE NUMBER OF IMAGE IN STATUS OF DOORBELL
			doorbell.status.numberPicture += 1;

			// SURE NEW IMAGE MAKED, SO NUMBER OF IMGAME INCREASE AND SERVER SAVE IMAGE TO LOCAL STORAGE
			let num = doorbell.status.numberImg;

			// makeImage(doorbell.status.Img[num - 1].codeImg, 10, 'abcdefghijklmnopqrstuvwxyz0123456789');

			await doorbell.save();

			res.status(200).json('Save image successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteDoorbell: async (req, res) => {
		try {
			await Room.updateMany({ doorbells: req.params.id }, { $pull: { doorbells: req.params.id } });

			await Doorbell.findByIdAndDelete(req.params.id);

			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = doorbellCtr;
