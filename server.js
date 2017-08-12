const bodyParser= require('body-parser');
const config = require('./config.js');
const express = require('express');
const app = express();
const handleRoutes = require('./routes.js');
const favicon = require('serve-favicon');
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoClient = require('./data/mongo-client');
const brokerClientFactory = require('./services/broker-client-factory.js');
const redisClient = new (require('./data/redis-client'))(config);
const socketServer = new (require('./socket-server.js'))(redisClient);

setupServer = async () => {
	app.use(bodyParser.json());
	app.use("/styles", express.static(__dirname + '/views/css'));
	app.use("/scripts", express.static(__dirname + '/views/js'));
	app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
	await mongoClient.initializeDbConnection(config);
	await http.listen(config.port, () => console.log('elite-chat: listening to connections on port: ' + config.port));
	
	const messagingBrokerClient = await brokerClientFactory.getMessagingBrokerClient(config);
	const accountsBrokerClient = await brokerClientFactory.getAccountsBrokerClient(config);

	handleRoutes(app, accountsBrokerClient);
	socketServer.initializeSocketServer(io, messagingBrokerClient);
}

setupServer();