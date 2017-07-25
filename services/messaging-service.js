var factories = require('./factories.js');

var MessagingService = function(broker){
	
	this.sendMessage = (messageDetails) => {	
		var payload = factories.constructMessagingPayLoad(messageDetails);
		broker.publishMessage(JSON.stringify(payload));
	}
	
	this.verifyReceiver = () => {
	}

}

module.exports = MessagingService;