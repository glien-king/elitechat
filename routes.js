var client = require('./data/mongo-client.js');

var Routes = function(app, brokerClient){
	this.userService = null;
	
	this.resetServices = () => {
		this.userService = new (require('./services/user-service.js'))(client.getContext());
	}
		
	app.get('/', (request, response) => {
		response.sendFile(__dirname + '/views/index.html');
	});
				
	app.post('/user/subscribe', async (request, response) => {
		resetServices();
		var body = request.body; 
		var subscriptionInfo = await this.userService.subscribeUser(body.name);
		response.send(subscriptionInfo);
	});
}

module.exports = Routes;