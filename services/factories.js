var factories = {
	constructMessagingPayLoad(messageDetails) {
		return {
			version: "1.0.0",
			recipientIdentifier: messageDetails.recipientUserIdentifier,
			senderIdentifier: messageDetails.senderUserIdentifier,
			content: messageDetails.content
		}	
	},
};

module.exports = factories;