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
	var content = JSON.parse(message.content.toString());	
	var context = mongoClient.getContext();	
	
	switch(content.payloadType){
		case 1: addUser(content, context); break;
		default: break;
	}
}

addUser = (content, context) => {
	var userIdentifier = helpers.generateGuid();
	var userDocument = factories.constructUserDocument(content.name, userIdentifier, content.email, content.password, content.birthdate, content.gender);
	context.users.insert(userDocument);
	fs.readFile('../views/mail/welcome_email.html', 'utf8', (oErr, sText) => {
		mailer.sendMail(content.email, 'Welcome to Elite Chat', sText);
	});
}

setupBrokerConnection();