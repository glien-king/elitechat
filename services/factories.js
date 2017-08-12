var helpers = require('./helpers.js');

var factories = {
	constructMessagingPayLoad(messageDetails, type) {
		var encryptedMessage = helpers.encryptData(messageDetails.content);		
		return {
			payloadType: type,
			version: "1.0.0",
			recipientIdentifier: messageDetails.recipientIdentifier,
			senderIdentifier: messageDetails.senderIdentifier,
			content: encryptedMessage,
			queuedOn: new Date()
		}
	},
	constructAccountPayLoad(userDetails, type) {
		var hashedPassword = helpers.hashData(userDetails.password);
		return {
			payloadType: type,
			version: "1.0.0",
			name: userDetails.name,
			email: userDetails.email,
			gender: userDetails.gender,
			birthdate: userDetails.birthdate,
			password: hashedPassword,
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