var client = require('./data/mongo-client.js');

var Routes = function(app, brokerClient){
	this.messagingService = null;
	this.userService = null;
	
	this.resetServices = () => {
		this.messagingService = new (require('./services/messaging-service.js'))(brokerClient, client.getContext());
		this.userService = new (require('./services/user-service.js'))(client.getContext());
	}
		
	app.get('/', (request, response) => {
		response.sendFile(__dirname + '/views/index.html');
	});
		
	app.post('/private/send', (request, response) => {
		resetServices();
		messagingService.sendMessage(request.body);
		response.send("OK");
	});
		
	app.post('/private/decodeMessage', async (request, response) => {
		resetServices();
		var body = request.body;  
		var verificationResponse = await messagingService.verifyMessageRecipient(body.senderIdentifier, body.recipientIdentifier, body.sentOn, body.token, body.content);
		response.send(verificationResponse);
	});
		
	app.post('/user/subscribe', async (request, response) => {
		resetServices();
		var body = request.body; 
		var subscriptionInfo = await this.userService.subscribeUser(body.name);
		response.send(subscriptionInfo);
	});
	
	app.get('/user/getAllUsers', async (request, response) => {
		resetServices();
		var users = await this.userService.getAllUserNamesAndIdentifiers();
		response.send(users);
	});
}

module.exports = Routes;