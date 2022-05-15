const { Room, Switch, Aircon, Induction, House } = require('../model/model');

const listRoom = {
	// [POST]
	addRoom: async (req, res) => {
		try {
			const newRoom = new Room(req.body);
			const savedRoom = await newRoom.save();

			if (req.body.host) {
				const house = await House.findById(req.body.host);
				if (house != null) {
					await House.updateOne({ $push: { rooms: savedRoom._id } });
				}
			}

			res.status(200).json(savedRoom);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getAllRoom: async (req, res) => {
		try {
			const rooms = await Room.find();

			// function lọc thông tin cần thiết
			let filterStatus = (rooms) => {
				let arr = [];
				for (var i = 0; i < rooms.length; i++) {
					const { switches, aircons, inductions, doorbells, host, ...others } = rooms[i]._doc;
					arr.push({ ...others });
				}
				return arr;
			};

			// lấy room của các thiết bị thôi thôi
			let result = filterStatus(rooms);

			res.status(200).json(result);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET]
	getMyRoom: async (req, res) => {
		try {
			const room = await Room.findById(req.params.id)
				.populate('switches')
				.populate('aircons')
				.populate('inductions');

			res.status(200).json(room);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteRoom: async (req, res) => {
		try {
			const room = await Room.findById(req.params.id);
			let switchLength = room.switches.length;
			let airconLength = room.aircons.length;
			let inductionLength = room.inductions.length;
			let doorbellLength = room.doorbells.length;

			// xóa room này trong house
			await House.updateMany({ rooms: req.params.id }, { $pull: { rooms: req.params.id } });

			// xóa room này trong thông tin của các thiết bị
			if (switchLength) {
				await Switch.findByIdAndDelete(room.switches);
			}
			if (airconLength) {
				await Aircon.findByIdAndDelete(room.aircons);
			}
			if (inductionLength) {
				await Induction.findByIdAndDelete(room.tables);
			}
			if (doorbellLength) {
				await Doorbell.findByIdAndDelete(room.doorbells);
			}
			await Room.findByIdAndDelete(req.params.id);

			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE]
	deleteAllRoom: async (req, res) => {
		try {
			var allRoom = await Room.find();

			// xóa tất cả các room trong tất cả các nhà
			for (let i = 0; i < allRoom.length; i++) {
				await House.updateMany({ rooms: allRoom[i]._id }, { $pull: { rooms: allRoom[i]._id } });
			}

			await Room.remove();
			await Switch.remove();
			await Aircon.remove();
			await Induction.remove();

			res.status(200).json('Delete All Room Successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = listRoom;
