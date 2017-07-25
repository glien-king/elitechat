var factories = require('./factories.js');

var messagingService = function(broker){
	
	this.sendMessage = (messageDetails, recipient) => {	
		var payload = factories.constructMessagingPayLoad(messageDetails, recipient);
		broker.publishMessage(JSON.stringify(payload))
	}
	
}

module.exports = messagingService;