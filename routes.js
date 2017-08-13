const factories = require('./services/factories.js');
const global = require('./services/global-fields');

var Routes = function(app, accountsBrokerClient){
	
	app.get('/', (request, response) => {
		response.sendFile(__dirname + '/views/index.html');
	});
				
	app.post('/user/subscribe', async (request, response) => {
		var body = request.body;
		var payload = factories.constructAccountPayLoad(body, global.accountsPayloadType.addUser);
		await accountsBrokerClient.publishMessage(JSON.stringify(payload));
		response.send("OK");
	});
}

module.exports = Routes;