const amqp = require('amqplib/callback_api');
const config = require('../config.js');
const mongoClient = new (require('../data/mongo-client.js'))(config);
const factories = require('../services/factories.js');
const helpers = require('../services/helpers.js');
const mailer = new (require('../services/mailer.js'))();
const fs = require('fs');
const accountsPayloadType = require('../services/global-fields').accountsPayloadType;

setupBrokerConnection = async () => {
	await mongoClient.initializeDatabaseConnection(config);

	amqp.connect(config.rabbitMqEndpoint, function(err, conn) {			
		conn.createChannel(function(err, ch) {
			ch.assertQueue(config.accountQueueName, {durable: false});
			ch.consume(config.accountQueueName, consumeMessage, {noAck: true});
		});
	});	
};

consumeMessage = (message) => {
	let payload = JSON.parse(message.content.toString());	
	let context = mongoClient.getContext();	
	
	switch(payload.payloadType){
		case accountsPayloadType.addUser: addUser(payload, context); break;
		default: break;
	}
}

addUser = (payload, context) => {
	let userIdentifier = helpers.generateGuid();
	let userDocument = factories.constructUserDocument(payload.name, userIdentifier, payload.email, payload.password, payload.birthdate, payload.gender);
	context.users.insert(userDocument);
	fs.readFile('../views/mail/welcome_email.html', 'utf8', (oErr, sText) => {
		mailer.sendMail(payload.email, 'Welcome to Elite Chat', sText);
	});
}

setupBrokerConnection();