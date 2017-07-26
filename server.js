const bodyParser= require('body-parser');
const config = require('./config.js');
const express = require('express');
const app = express();
const handleRoutes = require('./routes.js');
const amqp = require('amqplib/callback_api');
const webSocketServer = require('./websocket-server.js');
const favicon = require('serve-favicon');
const brokerClient = new (require('./services/broker-client.js'))(amqp, config, webSocketServer);
const path = require('path')

var mongoClient = require('./data/mongo-client');

setupServer = async () => {
	app.use(bodyParser.json());
	app.use("/styles", express.static(__dirname + '/views/css'));
	app.use("/scripts", express.static(__dirname + '/views/js'));
	app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
	await brokerClient.setupBrokerConnection();
	await mongoClient.initializeDbConnection(config);	
	webSocketServer.setupWebSocketServer();
	await app.listen(config.port);
	console.log('elite-chat: listening to connections on port: ' + config.port);
	handleRoutes(app, brokerClient);
}

setupServer();

