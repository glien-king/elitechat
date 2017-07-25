
var routes = function(app, brokerClient){
	this.messagingService = new (require('./services/messaging-service.js'))(brokerClient);
	
	app.get('/', (request, response) => {
		
	});
	
	app.post('/private/:uid', (request, response) => {
		var targetUserIdentifier = request.params.uid;
		var messageData = request.body;
		messagingService.sendMessage(messageData, targetUserIdentifier);
	});
}

module.exports = routes;