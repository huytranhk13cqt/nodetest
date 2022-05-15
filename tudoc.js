// // const eventsModule = require('events');
// // const { Switch } = require('./model/model');
// const config = require('./config').config;
// const SerialPort = require('serialport').SerialPort;
// const port = new SerialPort({ path: config.serial.port, baudRate: config.serial.baud });
// const slip = require('slip');
// const decoder = new slip.Decoder({});

// port.on('data', async (dataCatch) => {
// 	try {
// 		data = decoder.decode(dataCatch);
// 		if (data) {
// 			console.log(1, 'Exist');
// 			let dataObject = String.fromCharCode.apply(null, data);
// 		}
// 	} catch (error) {}
// });
