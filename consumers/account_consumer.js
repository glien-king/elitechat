const amqp = require('amqplib/callback_api');
const config = require('../config.js');
const mongoClient = require('../data/mongo-client.js');
const factories = require('../services/factories.js');
const helpers = require('../services/helpers.js');
const mailer = new (require('../services/mailer.js'))();
const fs = require('fs');

setupBrokerConnection = async () => {
	await mongoClient.initializeDbConnection(config);

	amqp.connect(config.rabbitMqEndpoint, function(err, conn) {			
		conn.createChannel(function(err, ch) {
			ch.assertQueue(config.accountQueueName, {durable: false});
			ch.consume(config.accountQueueName, consumeMessage, {noAck: true});
		});
	});	
};

consumeMessage = (message) => {
	var payload = JSON.parse(message.content.toString());	
	var context = mongoClient.getContext();	
	
	switch(payload.payloadType){
		case 1: addUser(payload, context); break;
		default: break;
	}
}

addUser = (payload, context) => {
	var userIdentifier = helpers.generateGuid();
	var userDocument = factories.constructUserDocument(payload.name, userIdentifier, payload.email, payload.password, payload.birthdate, payload.gender);
	context.users.insert(userDocument);
	fs.readFile('../views/mail/welcome_email.html', 'utf8', (oErr, sText) => {
		mailer.sendMail(payload.email, 'Welcome to Elite Chat', sText);
	});
}

setupBrokerConnection();