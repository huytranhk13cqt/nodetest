// // const setDate = (arrayInput, hourInput, minuteInput, milisInput, func) => {
// // 	/*|========================================================================================|
// // 	| hourInput 	 	: giờ android gửi lên 																									 |
// // 	| minuteInput  	: phút android gửi lên 																									 |
// // 	| milisInput 	 	: giây android gửi lên 																									 |
// // 	| arrayInput 	 	: các thứ android gửi lên 																							 |
// // 	| serverDate 		: ngày giờ hiện tại của máy tính 																				 |
// // 	| nowYear 	 		: năm hiện tại của máy tính 																						 |
// // 	| nowMonth 	 		: tháng hiện tại của máy tính 																					 |
// // 	| 																	 																									 	 |
// // 	| dayName			  : tìm ra thứ của 1 day bất kỳ 																   				 |
// // 	| numberDayOfMonth	: tìm ra số ngày của 1 tháng và 1 năm bất kỳ 									   		 |
// // 	| 																	 																									   |
// // 	| soNgay				: số ngày của 1 tháng và 1 năm bất kỳ 									           			 |
// // 	|	arrayDate			: mảng chứa các ngày của 1 tháng									           			 			 |
// // 	| arrayDay			: mảng chứa các thứ của 1 tháng chưa cộng 1									           	 |
// // 	| 																	 																									   |
// // 	| t2[]...			: mảng chứa các ngày ứng với thứ 2/3/4/5/6/7/cn 									         |
// // 	| arrayMilis  : mảng chứa số milis của 1 ngày giờ bất kỳ 									       			   |
// // 	|========================================================================================|*/

// // 	// current times on desktop
// // 	var serverDate = new Date();
// // 	var nowYear = serverDate.getFullYear(); // 2022
// // 	var nowMonth = serverDate.getMonth() + 1; // 4

// // 	var arrayDate = [];
// // 	var arrayDay = [];

// // 	var t2 = [];
// // 	var t3 = [];
// // 	var t4 = [];
// // 	var t5 = [];
// // 	var t6 = [];
// // 	var t7 = [];
// // 	var cn = [];

// // 	var obj = {
// // 		t2: t2,
// // 		t3: t3,
// // 		t4: t4,
// // 		t5: t5,
// // 		t6: t6,
// // 		t7: t7,
// // 		cn: cn,
// // 	};

// // 	let arrayMilis = [];

// // 	// FUNCTION TÌM THỨ CỦA 1 NGÀY BẤT KỲ
// // 	const dayName = (currentDay) => {
// // 		var dayName = '';
// // 		switch (currentDay) {
// // 			case 0:
// // 				dayName = 'cn';
// // 				break;
// // 			case 1:
// // 				dayName = 't2';
// // 				break;
// // 			case 2:
// // 				dayName = 't3';
// // 				break;
// // 			case 3:
// // 				dayName = 't4';
// // 				break;
// // 			case 4:
// // 				dayName = 't5';
// // 				break;
// // 			case 5:
// // 				dayName = 't6';
// // 				break;
// // 			case 6:
// // 				dayName = 't7';
// // 		}
// // 		return dayName;
// // 	};

// // 	// FUNCTION TÌM SỐ NGÀY CÓ TRONG 1 THÁNG BẤT KỲ TRONG 1 NĂM BẤT KỲ
// // 	const numberDayOfMonth = (month, year) => {
// // 		return new Date(year, month, 0).getDate();
// // 	};

// // 	// SỐ NGÀY CỦA THÁNG HIỆN TẠI
// // 	let currentNumberDay = numberDayOfMonth(nowMonth, nowYear); // tháng 4 có 30 ngày

// // 	// TÌM RA CÁC MẢNG (NGÀY TRONG THÁNG / THỨ CỦA NGÀY ĐÓ / TỪNG MẢNG THỨ LÀ NGÀY NÀO)
// // 	for (let index = 1; index <= currentNumberDay; index++) {
// // 		// nowDate = kiểu Date ứng với từng ngày của tháng hiện tại
// // 		let nowDate = new Date(nowYear, nowMonth - 1, index, 00, 00, 00);

// // 		arrayDate.push(nowDate.getDate()); // mảng chứa các ngày trong tháng hiện tại
// // 		arrayDay.push(dayName(nowDate.getDay())); // mảng chứa các thứ trong tháng hiện tại

// // 		let kq = arrayDay[index - 1];

// // 		if (kq == 't2') {
// // 			t2.push(arrayDate[index - 1]);
// // 		}
// // 		if (kq == 't3') {
// // 			t3.push(arrayDate[index - 1]);
// // 		}
// // 		if (kq == 't4') {
// // 			t4.push(arrayDate[index - 1]);
// // 		}
// // 		if (kq == 't5') {
// // 			t5.push(arrayDate[index - 1]);
// // 		}
// // 		if (kq == 't6') {
// // 			t6.push(arrayDate[index - 1]);
// // 		}
// // 		if (kq == 't7') {
// // 			t7.push(arrayDate[index - 1]);
// // 		}
// // 		if (kq == 'cn') {
// // 			cn.push(arrayDate[index - 1]);
// // 		}
// // 	}

// // 	// INPUT : OJBECT VÀ STR (TÊN CỦA KEY) -> OUTPUT : GIÁ TRỊ CỦA KEY ĐÓ
// // 	const getObjectValue = (obj, str) => {
// // 		const huy = Object.keys(obj).reduce((object, key) => {
// // 			if (key == str) {
// // 				object[key] = obj[key];
// // 			}
// // 			return object;
// // 		}, {});
// // 		return Object.values(huy)[0];
// // 	};

// // 	// TÌM MẢNG CHỨA MILIS CỦA TIMER
// // 	const findArrayTimer = (
// // 		valueRef,
// // 		obj,
// // 		nowYear,
// // 		nowMonth,
// // 		hourInput,
// // 		minuteInput,
// // 		milisInput,
// // 		serverDate
// // 	) => {
// // 		let valueRefArray = Object.keys(obj);

// // 		if (valueRefArray.includes(valueRef)) {
// // 			let valueRefArrayTrue = getObjectValue(obj, valueRef);

// // 			for (let i = 0; i < valueRefArrayTrue.length; i++) {
// // 				let androidDate = new Date(
// // 					nowYear,
// // 					nowMonth - 1,
// // 					valueRefArrayTrue[i],
// // 					hourInput,
// // 					minuteInput,
// // 					milisInput
// // 				);

// // 				if (
// // 					!arrayMilis.includes(androidDate.getTime()) &&
// // 					androidDate.getTime() >= serverDate.getTime()
// // 				) {
// // 					arrayMilis.push(androidDate.getTime());
// // 				}
// // 			}
// // 		}

// // 		return arrayMilis;
// // 	};

// // 	// TÌM RA MẢNG CHỨA MILIS CỦA TẤT CẢ TIMER
// // 	for (let index = 0; index < arrayInput.length; index++) {
// // 		var arrayMilisTrue = findArrayTimer(
// // 			arrayInput[index],
// // 			obj,
// // 			nowYear,
// // 			nowMonth,
// // 			hourInput,
// // 			minuteInput,
// // 			milisInput,
// // 			serverDate
// // 		);
// // 		// Tạo hàm so sánh
// // 		let hamSoSanh = (a, b) => a - b;

// // 		// Sắp xếp mảng
// // 		arrayMilisTrue.sort(hamSoSanh);
// // 	}

// // 	console.log('THÁNG', nowMonth, 'NĂM', nowYear);
// // 	console.log(arrayMilisTrue);

// // 	// RUN TIMER VỚI MẢNG VỪA TÌM ĐƯỢC
// // 	for (let i = 0; i < arrayMilisTrue.length; i++) {
// // 		setTimeout(() => {
// // 			func();
// // 		}, arrayMilisTrue[i] - serverDate.getTime());
// // 	}

// // 	return 'timer nè';
// // };

// // const func = () => {
// // 	console.log('huy');
// // };

// // setDate(['t3', 't4', 't6'], 18, 9, 15, func);

// // module.exports = setDate;

// let array = [
// 	{
// 		_id: 19009091,
// 		name: 'Ổ cắm phòng ngủ',
// 		typeDevice: 'Socket',
// 		status: {
// 			button1: true,
// 			button2: false,
// 			both: false,
// 		},
// 		room: 'Phòng trống',
// 	},
// 	{
// 		_id: 19009092,
// 		name: 'Ổ cắm phòng khách',
// 		typeDevice: 'Socket',
// 		status: {
// 			button1: false,
// 			button2: false,
// 			both: false,
// 		},
// 		room: 'Phòng trống',
// 	},
// 	{
// 		_id: 29008088,
// 		name: 'Công tắc phòng khách',
// 		typeDevice: 'Switch',
// 		status: {
// 			button1: false,
// 			button2: false,
// 			both: false,
// 		},
// 	},
// 	{
// 		_id: 29008198,
// 		name: 'Công tắc phòng ngủ',
// 		typeDevice: 'Switch',
// 		status: {
// 			button1: true,
// 			button2: true,
// 			both: true,
// 		},
// 		room: 'Phòng trống',
// 	},
// 	{
// 		_id: 88881212,
// 		name: 'Bàn ăn',
// 		typeDevice: 'Induction',
// 		status: {
// 			power: false,
// 			powerLevel: 3,
// 			cooking: false,
// 			stirfry: false,
// 			keepWarm: false,
// 			timer: 0,
// 		},
// 		room: 'Phòng trống',
// 	},
// 	{
// 		_id: 99991234,
// 		name: 'Điều hòa phòng ngủ',
// 		typeDevice: 'Aircon',
// 		status: {
// 			on: false,
// 			brand: 'Toshiba',
// 			mode: 'fan',
// 			fanSpeed: 3,
// 			temp: 32,
// 			humid: 80,
// 			swing: false,
// 		},
// 		room: 'Phòng trống',
// 	},
// 	{
// 		_id: 99993987,
// 		name: 'Điều hòa phòng khách',
// 		typeDevice: 'Aircon',
// 		status: {
// 			on: true,
// 			brand: 'Samsung',
// 			mode: 'crazy',
// 			fanSpeed: 5,
// 			temp: 29,
// 			humid: 90,
// 			swing: true,
// 		},
// 		room: 'Phòng trống',
// 	},
// ];

// let array2 = [
// 	{
// 		_id: 19009091,
// 		name: 'Ổ cắm phòng ngủ',
// 		typeDevice: 'Socket',
// 		status: {
// 			button1: true,
// 			button2: false,
// 			both: false,
// 		},
// 		room: 'Phòng trống',
// 	},
// 	{
// 		_id: 19009092,
// 		name: 'Ổ cắm phòng khách',
// 		typeDevice: 'Socket',
// 		status: {
// 			button1: false,
// 			button2: false,
// 			both: false,
// 		},
// 		room: 'Phòng trống',
// 	},
// 	{
// 		_id: 11122233,
// 		name: 'Ổ cắm phòng khách',
// 		typeDevice: 'Socket',
// 		status: {
// 			button1: true,
// 			button2: false,
// 			both: false,
// 		},
// 		room: 'Phòng trống',
// 	},
// ];

// var mang = [];
// var mang2 = [];
// for (let i = 0; i < array.length; i++) {
// 	mang.push(array[i]._id);
// }
// for (let i = 0; i < array2.length; i++) {
// 	mang2.push(array2[i]._id);
// }

// for (let index = 0; index < mang.length; index++) {
// 	if (!mang2.includes(mang[index])) {
// 		if (mang2[index]) {
// 		}
// 	}
// }

// var n = array.includes();
// console.log(n);

// bước 1 : đọc array cũ từ phòng trống - array mới đã có
// bước 2 : tạo 2 mảng rỗng
// bước 3 : chạy 2 vòng for để lấy _id của array cũ và array mới
// bước 4 : chạy vòng for so sánh 2 mảng ở trên
// bước 5 : nếu phần tử nào chưa tồn tại thì chạy hàm autoAdd vào phòng trống

const checkDiff = require('./functionCheck');

let huy = [
	{
		_id: 123,
		name: 'Ổ cắm phòng ngủ',
		typeDevice: 'Socket',
		status: {
			button1: true,
			button2: false,
			both: false,
		},
		room: 'Phòng trống',
	},
	{
		_id: 124,
		name: 'Ổ cắm phòng khách',
		typeDevice: 'Socket',
		status: {
			button1: false,
			button2: false,
			both: false,
		},
		room: 'Phòng trống',
	},
	{
		_id: 125,
		name: 'Công tắc phòng khách',
		typeDevice: 'Switch',
		status: {
			button1: false,
			button2: false,
			both: false,
		},
	},
	{
		_id: 126,
		name: 'Công tắc phòng ngủ',
		typeDevice: 'Switch',
		status: {
			button1: true,
			button2: true,
			both: true,
		},
		room: 'Phòng trống',
	},
	{
		_id: 127,
		name: 'Bàn ăn',
		typeDevice: 'Induction',
		status: {
			power: false,
			powerLevel: 3,
			cooking: false,
			stirfry: false,
			keepWarm: false,
			timer: 0,
		},
		room: 'Phòng trống',
	},
	{
		_id: 128,
		name: 'Điều hòa phòng ngủ',
		typeDevice: 'Aircon',
		status: {
			on: false,
			brand: 'Toshiba',
			mode: 'fan',
			fanSpeed: 3,
			temp: 32,
			humid: 80,
			swing: false,
		},
		room: 'Phòng trống',
	},
	{
		_id: 129,
		name: 'Điều hòa phòng khách',
		typeDevice: 'Aircon',
		status: {
			on: true,
			brand: 'Samsung',
			mode: 'crazy',
			fanSpeed: 5,
			temp: 29,
			humid: 90,
			swing: true,
		},
		room: 'Phòng trống',
	},
];

let huy2 = [
	{
		_id: 123,
		name: 'Ổ cắm phòng ngủ',
		typeDevice: 'Socket',
		status: {
			button1: true,
			button2: false,
			both: false,
		},
		room: 'Phòng trống',
	},
	{
		_id: 124,
		name: 'Ổ cắm phòng khách',
		typeDevice: 'Socket',
		status: {
			button1: false,
			button2: false,
			both: false,
		},
		room: 'Phòng trống',
	},
	{
		_id: 125,
		name: 'Công tắc phòng khách',
		typeDevice: 'Switch',
		status: {
			button1: false,
			button2: false,
			both: false,
		},
	},
	{
		_id: 128,
		name: 'Điều hòa phòng ngủ',
		typeDevice: 'Aircon',
		status: {
			on: false,
			brand: 'Toshiba',
			mode: 'fan',
			fanSpeed: 3,
			temp: 32,
			humid: 80,
			swing: false,
		},
		room: 'Phòng trống',
	},
];

let thamchieu = '_id';

console.log(checkDiff(huy, huy2, thamchieu));

// if (checkDiff(huy2, huy2, thamchieu).length) {
// 	console.log('có sự thay đổi');
// 	console.log(checkDiff(huy2, huy2, thamchieu));
// } else {
// 	console.log('không có sự thay đổi');
// }
// console.log(checkDiff(huy2, huy, thamchieu));
