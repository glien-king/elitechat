var Routes = function(app, brokerClient){
	this.messagingService = new (require('./services/messaging-service.js'))(brokerClient);
	
	app.get('/', (request, response) => {
		
	});
	
	app.post('/private/send', (request, response) => {
		var messageData = request.body;
		messagingService.sendMessage(messageData);
	});
	
	app.post('/private/decodeMessage', (request, response) => {
			
	});
}

module.exports = Routes;