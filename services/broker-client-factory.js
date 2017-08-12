const amqp = require('amqplib/callback_api');

var BrokerClient = function(endpoint, queue){
 	this.channel = null;	
	this.setupBrokerConnection = () => {
		var self = this;		
		return new Promise((resolve, reject) => {			
			amqp.connect(endpoint, function(err, conn) {			
				conn.createChannel(function(err, ch) {
					self.channel = ch;
					ch.assertQueue(queue, {durable: false});
					resolve();		
				});
			});			
		});
	 };
	 
	this.publishMessage = (message) => {
		this.channel.sendToQueue(queue, new Buffer(message));
	};
 }
 
 var clientFactory = {
	getMessagingBrokerClient: async (config) => {
		var client = new BrokerClient(config.rabbitMqEndpoint, config.messagingQueueName);
		await client.setupBrokerConnection();
		return client;
	},
	
	getAccountsBrokerClient: async (config) => {
		var client = new BrokerClient(config.rabbitMqEndpoint, config.accountQueueName);
		await client.setupBrokerConnection();
		return client;
	},
 }
 
 module.exports = clientFactory;