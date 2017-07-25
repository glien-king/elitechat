var factories = require('./factories.js');
var userService = require('./user-service.js');
var helpers = require('./helpers.js');

var MessagingService = function(broker, dataContext){
	
	this.dataContext = dataContext;
	this.userService = new userService(dataContext);
	
	this.sendMessage = (messageDetails) => {	
		var payload = factories.constructMessagingPayLoad(messageDetails);
		broker.publishMessage(JSON.stringify(payload));
	}
		
	this.verifyMessageRecipient = async (recipientUserIdentifier, userToken, content) => {
		var recipientToken = await this.userService.getTokenByIdentifier(recipientUserIdentifier);
		if(userToken == recipientToken){
			return helpers.decryptData(content);
		} else {
			return '';
		}
	}

}

module.exports = MessagingService;