var connectionProperties = {
	channel: null
};

var brokerClient = function(amqp, config){
 	 
	this.setupBrokerConnection = () => {			
		return new Promise((resolve, reject) => {			
			amqp.connect(config.rabbitMqEndpoint, function(err, conn) {
				connectionProperties.connection = conn;				
				conn.createChannel(function(err, ch) {
					connectionProperties.channel = ch;
					ch.assertQueue(config.messagingQueueName, {durable: false});
					resolve();					
				});

			});			
		});
		 
	 };
	 
	this.publishMessage = (message) => {
		connectionProperties.channel.sendToQueue(config.messagingQueueName, new Buffer(message));
	}
	 
 } 
 
 module.exports = brokerClient;