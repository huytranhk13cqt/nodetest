const fs = require('fs');

function randomString(len, charSet) {
	charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var randomString = '';
	for (var i = 0; i < len; i++) {
		var randomPoz = Math.floor(Math.random() * charSet.length);
		randomString += charSet.substring(randomPoz, randomPoz + 1);
	}
	return randomString;
}

let create = async (data, len, charChoose) => {
	const content = `${data}`;

	let buffer = Buffer.from(content, 'base64').toString('binary');

	await fs.writeFile(
		`./picture/${randomString(len, charChoose).toString().concat('.jpg')}`,
		buffer,
		'binary',
		function (err) {
			console.log(err);
		}
	);

	console.log('dones');
};

module.exports = create;
