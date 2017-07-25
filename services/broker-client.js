var BrokerClient = function(amqp, config, socketServer){
 	this.channel = null;	
	this.setupBrokerConnection = () => {
		var self = this;		
		return new Promise((resolve, reject) => {			
			amqp.connect(config.rabbitMqEndpoint, function(err, conn) {
				conn.createChannel(function(err, ch) {
					self.channel = ch;
					ch.assertQueue(config.messagingQueueName, {durable: false});
					ch.consume(config.messagingQueueName, self.consumeMessage, {noAck: true});					
					resolve();					
				});

			});			
		});
	 };
	 
	this.publishMessage = (message) => {
		this.channel.sendToQueue(config.messagingQueueName, new Buffer(message));
	};
	
	this.consumeMessage = (message) => {
		var content = message.content.toString();
		socketServer.broadcast(content);
	}
 } 
 
 module.exports = BrokerClient;