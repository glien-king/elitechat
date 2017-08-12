const amqp = require('amqplib/callback_api');
const config = require('../config.js');
const mongoClient = require('../data/mongo-client.js');

setupBrokerConnection = async () => {
	await mongoClient.initializeDbConnection(config);

	amqp.connect(config.rabbitMqEndpoint, function(err, conn) {			
		conn.createChannel(function(err, ch) {
			ch.assertQueue(config.messagingQueueName, {durable: false});
			ch.consume(config.messagingQueueName, consumeMessage, {noAck: true});
		});
	});	
};


consumeMessage = (message) => {
	var content = message.content.toString();
}

setupBrokerConnection();