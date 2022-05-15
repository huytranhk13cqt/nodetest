const eventsModule = require('events');
const config = require('./config').config;
const SerialPort = require('serialport').SerialPort;
const port = new SerialPort({ path: config.serial.port, baudRate: config.serial.baud });
const slip = require('slip');
const decoder = new slip.Decoder({});

var sendDataToGateway = async (payload) => {
	//let dataPayload = payload;

	// GÁN GIÁ TRỊ CHO DATAPAYLOAD
	try {
		dataPayload = JSON.parse(payload);
	} catch (e) {
		dataPayload = payload;
	}

	// GÁN GIÁ TRỊ CHO DATA
	let data = {
		payload: dataPayload,
	};

	let strData = JSON.stringify(data);
	let dataSend = new Uint8Array(strData.length);

	for (let i = 0, j = strData.length; i < j; ++i) {
		dataSend[i] = strData.charCodeAt(i);
	}

	let packet = slip.encode(dataSend);

	await port.write(packet);
	console.log('Huy Đã Ghi Thành Công');
	port.drain();
};

// --------------------  -------------------- //
var readDataFromGateway = () => {
	port.on('data', (dataCatch) => {
		data = decoder.decode(dataCatch);

		if (data) {
			// console.log('có data');
			// console.log(data);
			var dataObject = String.fromCharCode.apply(null, data);
			// console.log(2, dataObject);
			var dataObjectParse = JSON.parse(dataObject);
			var huy = JSON.parse(dataObjectParse.topic);
			// console.log(huy);
			// console.log('----------------------------- || --------------------------');
		}
	});
};

var heo = readDataFromGateway();
console.log(heo);
// --------------------  -------------------- //

module.exports = { sendDataToGateway, readDataFromGateway };
