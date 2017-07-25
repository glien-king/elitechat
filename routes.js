var routes = function(app, brokerClient){
	
	app.get('/', (request, response) => {
		
	});
	
	app.get('/private/:uid', (request, response) => {
		var targetUserIdentifier = request.params.uid;
	});
}


module.exports = routes;