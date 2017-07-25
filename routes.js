var client = require('./data/mongo-client.js');

var Routes = function(app, brokerClient){
	this.messagingService = null;
	this.userService = null;
	
	this.resetServices = () => {
		this.messagingService = new (require('./services/messaging-service.js'))(brokerClient, client.getContext());
		this.userService = new (require('./services/user-service.js'))(client.getContext());
	}
	
	app.use(function(req, res, next) { //CORS
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		next();
	});
	
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
		var verificationResponse = await messagingService.verifyMessageRecipient(body.senderUserIdentifier, body.recipientUserIdentifier, body.sentOn, body.token, body.content);
		response.send(verificationResponse);
	});
}

module.exports = Routes;