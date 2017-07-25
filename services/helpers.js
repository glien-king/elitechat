const config = require('../config.js');
var cryptoJs = require("crypto-js");

var helpers = {
	encryptData: (data) => {
		return cryptoJs.AES.encrypt(data, config.encryptionKey).toString();
	},
	decryptData: (data) => {
		return cryptoJs.AES.decrypt(data, config.encryptionKey).toString(cryptoJs.enc.Utf8);
	},
};

module.exports = helpers;