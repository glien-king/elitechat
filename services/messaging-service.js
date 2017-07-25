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
		
	this.verifyMessageRecipient = async (senderUserIdentifier, recipientUserIdentifier, sentOn, userToken, content) => {
		var recipientToken = await this.userService.getTokenByIdentifier(recipientUserIdentifier);
		if(userToken == recipientToken){
			var sender = await this.userService.getUserNameByIdentifier(senderUserIdentifier);
			return {
				content: helpers.decryptData(content),
				sender: sender,
				sentOn: sentOn
			}
		} else {
			return {};
		}
	}

}

module.exports = MessagingService;