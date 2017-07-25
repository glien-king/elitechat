const http = require('http');
const config = require('./config.js');
var connectedClients = [];

var webSocketServer = {
	setupWebSocketServer: () => {
		var server = http.createServer(function(request, response) {});

		server.listen(config.webSocketServerPort, function() {
			console.log('web socket server is now running on port: ' + config.webSocketServerPort);
		});

		wsServer = new (require('websocket').server)({
			httpServer: server
		});

		wsServer.on('request', function(r){
			var connection = r.accept('echo-protocol', r.origin);
			connectedClients.push(connection);
		});
	},
	broadcast: (message) => {
		for(var i in connectedClients){
			connectedClients[i].sendUTF(message);
		}
	}
};

module.exports = webSocketServer;