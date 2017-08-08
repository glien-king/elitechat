const bodyParser= require('body-parser');
const config = require('./config.js');
const express = require('express');
const app = express();
const handleRoutes = require('./routes.js');
const amqp = require('amqplib/callback_api');
const favicon = require('serve-favicon');
const brokerClient = new (require('./services/broker-client.js'))(amqp, config);
const path = require('path');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoClient = require('./data/mongo-client');
const socketServer = new (require('./socket-server.js'))(io);

setupServer = async () => {
	app.use(bodyParser.json());
	app.use("/styles", express.static(__dirname + '/views/css'));
	app.use("/scripts", express.static(__dirname + '/views/js'));
	app.use(favicon(path.join(__dirname, '/', 'favicon.ico')));
	await brokerClient.setupBrokerConnection();
	await mongoClient.initializeDbConnection(config);
	socketServer.initializeSocketServer();
	await http.listen(config.port, () => console.log('elite-chat: listening to connections on port: ' + config.port));
	handleRoutes(app, brokerClient);
}

setupServer();

