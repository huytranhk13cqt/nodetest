// ----------------------------------------------- [START LIBRARY] ----------------------------------------------- //
const express = require('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');

let bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
// ----------------------------------------------- [ENDED LIBRARY] ----------------------------------------------- //
// ----------------------------------------------- [START APP.USE] ----------------------------------------------- //
app.use(
	bodyParser.json({
		limit: '50mb',
	})
);
app.use(cookieParser()); // create cookie and attach cookie
app.use(express.json());
app.use(cors()); // fix cors origin error
app.use(morgan('common'));
dotenv.config();

// DATABASE
mongoose.connect(process.env.MONGODB_LOCAL_URL, () => {
	console.log(200, 'Successfully --> Database');
});
// ----------------------------------------------- [ENDED APP.USE] ----------------------------------------------- //
// ----------------------------------------------- [START ROUTES] ------------------------------------------------ //
const houseRouter = require('./router/houseRouter');
const roomRouter = require('./router/roomRouter');

const switchRouter = require('./router/switchRouter');
const inductionRouter = require('./router/inductionRouter');
const airconRouter = require('./router/airconRouter');
const doorbellRouter = require('./router/doorbellRouter');

const deviceRouter = require('./router/deviceRouter');

const authRouter = require('./router/authRouter');
const userRouter = require('./router/userRouter');

app.use('/', houseRouter);
app.use('/', roomRouter);

app.use('/', switchRouter);
app.use('/', inductionRouter);
app.use('/', airconRouter);
app.use('/', doorbellRouter);

app.use('/', deviceRouter);

app.use('/auth', authRouter);
app.use('/', userRouter);
// ----------------------------------------------- [ENDED ROUTES] ------------------------------------------------ //

// ----------------------------------------------- [GATEWAY PROCESSING] ------------------------------------------------ //
const { Induction, Doorbell, Switch, Aircon, Room, House } = require('./model/model');

const eventsModule = require('events');

const config = require('./config').config;
const SerialPort = require('serialport').SerialPort;
const porthuy = new SerialPort({ path: config.serial.port, baudRate: config.serial.baud });

const slip = require('slip');
const decoder = new slip.Decoder({});

const checkDiff = require('./function/checkDiff');
const autoAdd = require('./function/autoAdd');
const autoUpdate = require('./function/autoUpdate');

// m???ng c??c thi???t b??? ??ang c?? trong gateway
var deviceElement = {};

// m???ng c??c thi???t b??? ????? add (t??? deviceElement) t???n t???i unique
var arrObjectFromGatewayForAdd = [];

var numAdd = 0;

// h??m t??m m???ng _id thi???t b??? ??ang c?? trong Phong trong
let findDeviceOfEmptyRoom = async () => {
	try {
		const arrIdDeviceOfEmptyRoom = [];

		const emptyRoom = await Room.findById('Phong trong');

		for (let i = 0; i < emptyRoom.switches.length; i++) {
			await arrIdDeviceOfEmptyRoom.push(emptyRoom.switches[i]);
		}

		for (let i = 0; i < emptyRoom.aircons.length; i++) {
			await arrIdDeviceOfEmptyRoom.push(emptyRoom.aircons[i]);
		}

		for (let i = 0; i < emptyRoom.inductions.length; i++) {
			await arrIdDeviceOfEmptyRoom.push(emptyRoom.inductions[i]);
		}
		return arrIdDeviceOfEmptyRoom;
	} catch (error) {
		return error;
	}
};

// ?????c d??? li???u t??? gateway --> l???y ???????c deviceElement
porthuy.on('data', (dataCatch) => {
	try {
		dataFromNode = decoder.decode(dataCatch);

		if (dataFromNode) {
			var dataObjectStr = String.fromCharCode.apply(null, dataFromNode);

			var dataObjectParseLevel1 = JSON.parse(dataObjectStr);

			var dataObjectParse = JSON.parse(dataObjectParseLevel1.topic);

			deviceElement = dataObjectParse;
		} else {
			// do nothing !
		}
	} catch (error) {
		return console.log(404, `---------- || Data Read At Port On Error Format || ----------`);
	}
});

// [AUTO ADD PROCESSING]
setInterval(() => {
	var acceptToAutoAdd = false;

	if ([deviceElement].length) {
		if (checkDiff([deviceElement], arrObjectFromGatewayForAdd, '_id').length) {
			arrObjectFromGatewayForAdd.push(deviceElement);
			acceptToAutoAdd = true;
		}

		// s??? thi???t b??? ??ang c?? m???t
		console.log(200, 'Devices: ', arrObjectFromGatewayForAdd.length);

		if (acceptToAutoAdd) {
			findDeviceOfEmptyRoom().then(async (result) => {
				const arrReference = []; // t??? m???ng _id t??m ra m???ng thi???t b??? trong Phong trong ????? l??m tham chi???u

				for (let index = 0; index < result.length; index++) {
					const switchOfEmptyRoom = await Switch.findById(result[index]);
					if (switchOfEmptyRoom) {
						arrReference.push(switchOfEmptyRoom);
					}
				}

				for (let index = 0; index < result.length; index++) {
					const airconOfEmptyRoom = await Aircon.findById(result[index]);
					if (airconOfEmptyRoom) {
						arrReference.push(airconOfEmptyRoom);
					}
				}

				for (let index = 0; index < result.length; index++) {
					const inductionOfEmptyRoom = await Induction.findById(result[index]);
					if (inductionOfEmptyRoom) {
						await arrReference.push(inductionOfEmptyRoom);
					}
				}

				// m???ng nh???ng thi???t b??? ??ang c?? ??? gateway nh??ng ch??a t???ng t???n t???i trong Phong trong (kh??c nhau)
				let arrNewDevice = checkDiff(arrObjectFromGatewayForAdd, arrReference, '_id');

				if (arrNewDevice.length) {
					for (let index = 0; index < arrNewDevice.length; index++) {
						autoAdd(arrNewDevice);
					}
				}
				acceptToAutoAdd = false;
			});
		}
	} else {
	}
}, 10000);

setInterval(async () => {
	await autoUpdate([deviceElement]);
}, 3000);

// ----------------------------------------------- [WEBSOCKET PROCESSING] ------------------------------------------------ //
const sendDataToGateway = async (payload) => {
	console.log(1000, 'Payload For Send : ', payload);
	try {
		dataPayload = JSON.parse(payload);
	} catch (e) {
		dataPayload = payload;
	}

	// G??N GI?? TR??? CHO DATA
	let data = {
		payload: dataPayload,
	};

	let strData = JSON.stringify(data);
	let dataSend = new Uint8Array(strData.length);

	for (let i = 0, j = strData.length; i < j; ++i) {
		dataSend[i] = strData.charCodeAt(i);
	}

	let packet = slip.encode(dataSend);

	await porthuy.write(packet);
	porthuy.drain();
	console.log(1000, '          [SEND DATA TO GATEWAY DONE]          ');
};

const WebSocket = require('ws');
const port = 1900; // 192.168.2.18:1900
const serverSocket = new WebSocket.Server({ port });

let connectedClients = [];
let acceptToSendDataCam = false;

serverSocket.on('connection', (ws, req) => {
	console.log(1000, '[CONNECTION]');
	connectedClients.push(ws);

	ws.on('message', (data) => {
		console.log('');
		console.log('|| --------------------------------------------------');
		// convert data v??? String
		let dataObject = String.fromCharCode.apply(null, data);

		// [APP CONTROL DEVICES]
		try {
			let dataObjectParse = JSON.parse(dataObject);
			console.log('[DATA OBJECT]');
			console.log('[APP --> GATEWAY --> CONTROL DEVICES]');

			sendDataToGateway(dataObjectParse);
		} catch (error) {}

		// [APP CONTROL ESP32-CAM]
		// [WEB ???? NG??N KH??NG NH???N DATA L?? STRING]
		try {
			console.log('[DATA STRING]');

			if (dataObject == 'onvideo') {
				console.log('[APP --> ESP32 CAM --> TURN ON VIDEO]');

				// b???t cam tr??n server
				acceptToSendDataCam = true;

				// b???t esp32cam
				serverSocket.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						client.send(dataObject);
					}
				});
			}

			if (dataObject == 'offvideo') {
				console.log('[APP --> ESP32 CAM --> TURN OFF VIDEO]');

				// t???t cam tr??n server
				acceptToSendDataCam = false;

				// t???t esp32cam
				serverSocket.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						client.send(dataObject);
					}
				});
			}

			if (dataObject == 'onpir') {
				console.log('[APP --> ESP32 CAM --> TURN ON PIR]');

				// b???t pir esp32cam
				serverSocket.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						client.send(dataObject);
					}
				});
			}

			if (dataObject == 'offpir') {
				console.log('[APP --> ESP32 CAM --> TURN OFF PIR]');

				// t???t pir esp32cam
				serverSocket.clients.forEach(function each(client) {
					if (client !== ws && client.readyState === WebSocket.OPEN) {
						client.send(dataObject);
					}
				});
			}

			if (dataObject == 'Notification') {
				console.log('[ESP32 CAM --> APP --> NOTIFICATION]');

				// b???t notification app
				serverSocket.clients.forEach(function each(client) {
					if ((client !== ws && client.readyState) === WebSocket.OPEN) {
						client.send(dataObject);
					}
				});
			}
		} catch (error) {}

		// [SERVER STREAM TO WEB]
		// [APP ???? NG??N KH??NG NH???N DATA L?? BINARY]
		if (acceptToSendDataCam && data) {
			// esp32cam -> server -> web
			serverSocket.clients.forEach(function each(client) {
				if (client !== ws && client.readyState === WebSocket.OPEN) {
					client.send(data);
				}
			});
		}

		console.log('|| --------------------------------------------------');
		console.log('');
	});

	ws.on('close', () => {
		console.log(1000, '[CLOSE]: LOST ONE CLIENT');
	});
});

app.use(express.static(__dirname + '/public'));
app.get('/client', (req, res) => res.sendFile(path.resolve(__dirname, './client.html')));
app.get('/disconnect', (req, res) => res.sendFile(__dirname + '/public/disconnect.html'));

app.get('/', (req, res) => {
	res.send('OK SERVER RUNNING');
});

app.listen(process.env.EXPRESS_PORT, () => {
	console.log(200, `Server on http://localhost:${process.env.EXPRESS_PORT}`);
});
// ----------------------------------------------- [GATEWAY PROCESSING] ------------------------------------------------ //

// // [NOTE ***]
// 16000 visit/day

// 10 devices - 1 l???n update - 10 request - 5s
// 5s = 10 request
// 60s = 120 request
// 60p = 120 x 60 = 720 request
// 24h = 720 x 24 = 17280 request
// n???u 15s feedback 1 l???n th?? 17280 / 3 = 5760

// gi???i ph??p :
// 1 l?? t??ng th???i gian feedback l??n 10-15s
// 2 websocket - socket io
// 3 d??ng api ????? k??ch ho???t
// 4 vi???t function check s??? thay ?????i gi???a object.status trong database v?? object.status hi???n t???i n???u c?? thay ?????i th?? update ????? feedback
