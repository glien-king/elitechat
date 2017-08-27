const UserService = require('./services/user-service');

const handleRoutes = function(app, accountsBrokerClient, mongoClient) {
	
	app.get('/', (request, response) => {
		response.sendFile(__dirname + '/views/index.html');
	});
				
	app.post('/user/subscribe', async (request, response) => {
		let result = await (new UserService(mongoClient.getContext(), accountsBrokerClient)).subscribe(request.body);
		response.send(result);
	});
}

module.exports = handleRoutes;