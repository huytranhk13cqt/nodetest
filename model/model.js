const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},
	houseName: {
		type: String,
	},
	rooms: [
		{
			type: String,
			ref: 'Room',
		},
	],
});

const roomSchema = new mongoose.Schema({
	_id: {
		type: String,
		required: true,
	},

	switches: [
		{
			type: Number,
			ref: 'Switch',
		},
	],
	aircons: [
		{
			type: Number,
			ref: 'Aircon',
		},
	],
	inductions: [
		{
			type: Number,
			ref: 'Induction',
		},
	],
	doorbells: [
		{
			type: Number,
			ref: 'Doorbell',
		},
	],
	host: {
		type: Number,
		ref: 'House',
		required: true,
	},
});

const switchSchema = new mongoose.Schema({
	// nodeId
	_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		default: 'switch',
	},
	typeDevice: {
		type: String,
		required: true,
	},
	status: {
		// timer: { type: Number, default: 0 },
		button1: { type: Boolean, default: false },
		button2: { type: Boolean, default: false },
		both: { type: Boolean, default: false },
	},
	room: {
		type: String,
		ref: 'Room',
	},
});

const airconSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		default: 'aircon',
	},
	typeDevice: {
		type: String,
		required: true,
	},
	status: {
		on: { type: Boolean, default: false },
		brand: String,
		mode: { type: String, default: 'fan' },
		fanSpeed: Number,
		temp: Number,
		temp_room: Number,
		humid: Number,
		swing: { type: Boolean, default: false },
	},
	room: {
		type: String,
		ref: 'Room',
	},
});

const inductionSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		default: 'induction',
	},
	typeDevice: {
		type: String,
		required: true,
	},
	status: {
		power: { type: Boolean, default: false },
		powerLevel: { type: Number, default: 3 },
		cooking: Boolean,
		stirfry: Boolean,
		keepWarm: Boolean,
		timer: Number,
	},
	room: {
		type: String,
		ref: 'Room',
	},
});

const doorbellSchema = new mongoose.Schema({
	_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	typeDevice: {
		type: String,
		required: true,
	},
	// status: {
	// 	numberPicture: Number,
	// 	picture: [
	// 		{
	// 			code: { type: String, default: null },
	// 			create: { type: Date, default: Date.now },
	// 		},
	// 	],
	// },
	room: {
		type: String,
		ref: 'Room',
	},
});

let House = mongoose.model('House', houseSchema);
let Room = mongoose.model('Room', roomSchema);
let Switch = mongoose.model('Switch', switchSchema);
let Aircon = mongoose.model('Aircon', airconSchema);
let Induction = mongoose.model('Induction', inductionSchema);
let Doorbell = mongoose.model('Doorbell', doorbellSchema);

module.exports = { House, Room, Switch, Aircon, Induction, Doorbell };
