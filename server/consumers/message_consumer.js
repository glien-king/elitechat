const amqp = require('amqplib/callback_api');
const config = require('../config.js');
const mongoClient = new (require('../data/mongo-client.js'))(config);
const factories = require('../services/factories.js');
const messagingPayloadType = require('../services/global-fields').messagingPayloadType;

setupBrokerConnection = async () => {
	await mongoClient.initializeDatabaseConnection(config);

	amqp.connect(config.rabbitMqEndpoint, function(err, conn) {			
		conn.createChannel(function(err, ch) {
			ch.assertQueue(config.messagingQueueName, {durable: false});
			ch.consume(config.messagingQueueName, consumeMessage, {noAck: true});
		});
	});	
};

consumeMessage = async (message) => {
	let payload = JSON.parse(message.content.toString());	
	let context = mongoClient.getContext();
	
	switch(payload.payloadType){
		case messagingPayloadType.addMessage: await addMessage(payload, context); break;
		default: break;
	}
}

addMessage = async (payload, context) => {
	let sender = (await context.users.filter({identifier: payload.senderIdentifier}).query())[0];
	let recipient = (await context.users.filter({identifier: payload.recipientIdentifier}).query())[0];
	let messageDocument = factories.constructMessageDocument(sender, recipient, payload.content, payload.queuedOn);
	context.messages.insert(messageDocument);
}

setupBrokerConnection();