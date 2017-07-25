var factories = {
	constructMessagingPayLoad(messageDetails, recipient) {
		return {
			version: "1.0.0",
			recipient: recipient,
			sender: messageDetails.senderUserIdentifier,
			content: messageDetails.content
		}	
	},
};


module.exports = factories;