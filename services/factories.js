var helpers = require('./helpers.js');

var factories = {
	constructMessagingPayLoad(messageDetails) {
		var encryptedMessage = helpers.encryptData(messageDetails.content);		
		return {
			version: "1.0.0",
			recipientIdentifier: messageDetails.recipientUserIdentifier,
			senderIdentifier: messageDetails.senderUserIdentifier,
			content: encryptedMessage,
			queuedOn: new Date()
		}	
	},
	constructUserDocument(name, identifier, email, password, birthdate, gender) {
		return {
			name: name,
			identifier: identifier,
			email: email,
			password: password,
			birthdate: birthdate,
			gender: gender,
			createdOn: new Date()
		}	
	}
};

module.exports = factories;