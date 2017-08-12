const amqp = require('amqplib/callback_api');
const config = require('../config.js');
const mongoClient = require('../data/mongo-client.js');

setupBrokerConnection = () => {
	amqp.connect(config.rabbitMqEndpoint, function(err, conn) {			
		conn.createChannel(function(err, ch) {
			ch.assertQueue(config.accountQueueName, {durable: false});
			ch.consume(config.accountQueueName, consumeMessage, {noAck: true});
		});
	});	
};


consumeMessage = (message) => {
	var content = message.content;
}

setupBrokerConnection();