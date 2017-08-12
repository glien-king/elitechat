const amqp = require('amqplib/callback_api');
const config = require('../config.js');
const mongoClient = require('../data/mongo-client.js');
const factories = require('../services/factories.js');
const helpers = require('../services/helpers.js');

setupBrokerConnection = () => {
	amqp.connect(config.rabbitMqEndpoint, function(err, conn) {			
		conn.createChannel(function(err, ch) {
			ch.assertQueue(config.accountQueueName, {durable: false});
			ch.consume(config.accountQueueName, consumeMessage, {noAck: true});
		});
	});	
};


consumeMessage = (message) => {
	var context = mongoClient.getContext();
	var content = JSON.parse(message.content.toString());
	var userIdentifier = helpers.generateGuid();
	var userDocument = factories.constructUserDocument(content.name, identifier, content.email, content.password, content.birthdate, content.gender);
	context.users.insert(userDocument);
}

setupBrokerConnection();