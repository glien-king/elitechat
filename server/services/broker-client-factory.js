const amqp = require('amqplib/callback_api');

class BrokerClient {

	constructor(endpoint, queue) {
		this.channel = null;
		this.enpoint = endpoint;
		this.queue = queue;
	}

	setupBrokerConnection() {
		return new Promise((resolve, reject) => {			
			amqp.connect(this.endpoint, (err, conn) => {			
				conn.createChannel((err, ch) => {
					this.channel = ch;
					ch.assertQueue(this.queue, {durable: false});
					resolve();		
				});
			});			
		});
	 }

	 publishMessage(message) {
		this.channel.sendToQueue(this.queue, new Buffer(message));
	}
	
}
 
let clientFactory = {
	getMessagingBrokerClient: async (config) => {
		let client = new BrokerClient(config.rabbitMqEndpoint, config.messagingQueueName);
		await client.setupBrokerConnection();
		return client;
	},
	
	getAccountsBrokerClient: async (config) => {
		let client = new BrokerClient(config.rabbitMqEndpoint, config.accountQueueName);
		await client.setupBrokerConnection();
		return client;
	},
 }
 
 module.exports = clientFactory;