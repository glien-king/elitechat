var client = require('./data/mongo-client.js');

var Routes = function(app, brokerClient){
	this.messagingService = null;
	this.userService = null;
	
	this.resetServices = () => {
		this.messagingService = new (require('./services/messaging-service.js'))(brokerClient, client.getContext());
		this.userService = new (require('./services/user-service.js'))(client.getContext());
	}
	
	app.get('/', (request, response) => {
		response.send("Welcome to the Elite chat");
	});
	
	app.post('/private/send', (request, response) => {
		resetServices();
		messagingService.sendMessage(request.body);
		response.send("OK");
	});
	
	app.post('/private/decodeMessage', async (request, response) => {
		resetServices();
		var body = request.body;
		response.send(await messagingService.verifyMessageRecipient(body.recipientUserIdentifier, body.token, body.content));	
	});
}

module.exports = Routes;