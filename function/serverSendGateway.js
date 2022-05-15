// const eventsModule = require('events');
// const ee = new eventsModule.EventEmitter();

// const serialPort = require('serialport').SerialPort;
// const slip = require('slip');
// const path = require('path');

// const config = require('../config').config;

// const portSerial = new serialPort({ path: config.serial.port, baudRate: config.serial.baud });

// // ----------------------------------------------- [GATEWAY PROCESSING] ------------------------------------------------ //

// //Process......................................... // payload là object từ server gửi xuống gateway -> write

// var serverSendDataToGateWay = async (payloadlv1) => {
// 	payload = payloadlv1;
// 	ee.on('slip_send', async (payload) => {
// 		console.log(100, payload);
// 		try {
// 			var payloadParse = JSON.parse(payload);
// 		} catch (error) {
// 			var payloadParse = payload;
// 		}
// 		// console.log(200, payloadParse);

// 		let payloadParseObject = {
// 			payload: payloadParse,
// 		};
// 		// console.log(300, payloadParseObject);

// 		let strPayLoadParseObject = JSON.stringify(payloadParseObject);
// 		// console.log(400, strPayLoadParseObject);
// 		let payloadSend = new Uint8Array(strPayLoadParseObject.length);
// 		// console.log(500, payloadSend);

// 		for (let index = 0; index < strPayLoadParseObject.length; ++index) {
// 			payloadSend[index] = strPayLoadParseObject.charCodeAt(index);
// 		}

// 		let payloadPacket = slip.encode(payloadSend);
// 		await portSerial.write(payloadPacket);
// 		portSerial.drain();
// 	});
// };

// // ----------------------------------------------- [GATEWAY PROCESSING] ------------------------------------------------ //
// module.exports = serverSendDataToGateWay;
