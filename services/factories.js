var helpers = require('./helpers.js');

var factories = {
	constructMessagingPayLoad(messageDetails) {
		var encryptedMessage = helpers.encryptData(messageDetails.content);		
		return {
			version: "1.0.0",
			recipientIdentifier: messageDetails.recipientIdentifier,
			senderIdentifier: messageDetails.senderIdentifier,
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
	},
	constructMessageDocument(sender, recipient, content, queuedOn) {
		return {
			sender: sender,
			recipient: recipient,
			content: content,
			queuedOn: queuedOn
		}	
	},
};

module.exports = factories;