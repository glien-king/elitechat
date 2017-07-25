const bodyParser= require('body-parser');
const config = require('./config.js');
const app = require('express')();
const handleRoutes = require('./routes.js');
const amqp = require('amqplib/callback_api');
const webSocketServer = require('./websocket-server.js');
const brokerClient = new (require('./services/broker-client.js'))(amqp, config, webSocketServer);
var mongoClient = require('./data/mongo-client');

setupServer = async () => {
	app.use(bodyParser.json());
	await brokerClient.setupBrokerConnection();
	await mongoClient.initializeDbConnection(config);	
	webSocketServer.setupWebSocketServer();
	await app.listen(config.port);
	console.log('elite-chat: listening to connections on port: ' + config.port);
	handleRoutes(app, brokerClient);
}

setupServer();

