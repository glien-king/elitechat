var routes = function(app){
	
	app.get('/', (request, response) => {
		
	});
	
	app.get('/private/:uid', (request, response) => {
		var targetUserIdentifier = request.params.uid;
	});
}


module.exports = routes;