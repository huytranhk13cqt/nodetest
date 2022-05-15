const { House, Room } = require('../model/model');

// function create random name for house
const randomName = (dodai, kytu) => {
	kytu = kytu || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';

	for (let i = 0; i < dodai; i++) {
		let getString = Math.floor(Math.random() * kytu.length);
		randomString += kytu.substring(getString, getString + 1);
	}

	return randomString;
};

/*|==============================================================================================| 
	| First House will be create by Gateway - deleteGateway to delete gateway and all room together|
	|==============================================================================================| */

const listHouse = {
	// [POST] : Create new house
	addHouse: async (req, res) => {
		try {
			const newHouse = new House(req.body);

			if (!newHouse.houseName) {
				newHouse.houseName = 'House ' + randomName(5, '0123456789');
			}

			const savedHouse = await newHouse.save();
			res.status(200).json(savedHouse);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET] : get info all house
	getAllHouse: async (req, res) => {
		try {
			const houses = await House.find();

			res.status(200).json(houses);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [GET] : get info my house
	getMyHouse: async (req, res) => {
		try {
			const house = await House.findById(req.params.id);

			console.log(house);

			res.status(200).json(house);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE] : delete 1 house follow by id
	deleteGateway: async (req, res) => {
		try {
			const house = await House.findById(req.params.id);

			// delete all room of house being deleting
			for (let i = 0; i < house.rooms.length; i++) {
				var roomarr = house.rooms[i]; // chỗ này ra id của room rồi
				await Room.findByIdAndDelete(roomarr);
			}

			await House.findByIdAndDelete(req.params.id);
			res.status(200).json('Delete successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	// [DELETE] : delele all house
	deleteAllGateway: async (req, res) => {
		try {
			await House.remove();
			await Room.remove();
			res.status(200).json('Delete all successfully !');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = listHouse;
