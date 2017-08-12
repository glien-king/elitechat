const config = require('../config.js');
const cryptoJs = require("crypto-js");
const SHA256 = require("crypto-js/sha256");


var helpers = {
	encryptData: (data) => {
		return cryptoJs.AES.encrypt(data, config.encryptionKey).toString();
	},
	decryptData: (data) => {
		return cryptoJs.AES.decrypt(data, config.encryptionKey).toString(cryptoJs.enc.Utf8);
	},
	generateGuid: () => {
		var S4 = function() {
		   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
		};
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	},
	hashData: (data) => {
		return SHA256(data).toString();
	}
};

module.exports = helpers;