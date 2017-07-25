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
	constructUserModel(name, token, identifier) {
		return {
			name: name,
			uniqueidentifier: identifier,
			token: token,
		}	
	}
};

module.exports = factories;