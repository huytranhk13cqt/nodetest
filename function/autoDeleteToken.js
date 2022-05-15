const User = require('../model/user');
const { Doorbell } = require('../model/model');

// xóa token tự động với user được chỉ định
let xoaToken = async (nameUser) => {
	try {
		console.log('xóa token');
		const usercanxoa = await User.find({ userName: nameUser });
		console.log(usercanxoa);

		await User.updateMany(
			{ longToken: usercanxoa[0].longToken[0] },
			{ $pull: { longToken: usercanxoa[0].longToken[0] } }
		);
		console.log(`ĐÃ XÓA TOKEN CỦA USER ${nameUser}`);
	} catch (error) {
		console.log(error);
	}
};

// xóa tất cả các ảnh của chuông cửa được chỉ định
let xoaAnh = async (nameDoorbell) => {
	try {
		const anhcanxoa = await Doorbell.findOne({ name: nameDoorbell });
		anhcanxoa.status.numberPicture = 0;
		anhcanxoa.status.picture = null;
		await anhcanxoa.save();

		console.log(`ĐÃ XÓA ẢNH CỦA DOORBELL ${nameDoorbell}`);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { xoaAnh, xoaToken };
