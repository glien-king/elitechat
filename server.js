const bodyParser= require('body-parser');
const config = require('./config.js');
const app = require('express')();
const handleRoutes = require('./routes.js');
const amqp = require('amqplib/callback_api');
const brokerClient = new (require('./broker-client.js'))(amqp, config);


setupServer = async () => {
	app.use(bodyParser.json());
	await brokerClient.setupBrokerConnection();
	app.listen(config.port);
	console.log('elite-chat: listening to connections on port: ' + config.port);
	handleRoutes(app);
}

setupServer();


