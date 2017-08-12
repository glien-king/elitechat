var Routes = function(app, brokerClient){
	
	app.get('/', (request, response) => {
		response.sendFile(__dirname + '/views/index.html');
	});
				
	app.post('/user/subscribe', async (request, response) => {
		var body = request.body;
	});
}

module.exports = Routes;