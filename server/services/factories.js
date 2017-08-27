const helpers = require('./helpers.js');

const factories = {
	constructMessagingPayLoad(messageDetails, type) {
		let encryptedMessage = helpers.encryptData(messageDetails.content);		
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
		let hashedPassword = helpers.hashData(userDetails.password);
		let userIdentifier = helpers.generateGuid();
		return {
			payloadType: type,
			version: "1.0.0",
			name: userDetails.name,
			email: userDetails.email,
			gender: userDetails.gender,
			birthdate: userDetails.birthdate,
			password: hashedPassword,
			userIdentifier: userIdentifier,
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