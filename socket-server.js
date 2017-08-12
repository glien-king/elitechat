const cookie = require('cookie');
const factories = require('./services/factories');
const userSocketMappingKeyName = "users_socket_map";

var SocketServer = function(redisClient) {	
	this.redisClient = redisClient;
	
	this.initializeSocketServer = (io, messagingBrokerClient) => {
		var self = this;
		io.on('connection', async function(socket){
			var socketId = socket.id;
			var userIdentifier = cookie.parse(socket.handshake.headers['cookie']).UserIdentifier;
			self.redisClient.storeHashSetField(userSocketMappingKeyName, userIdentifier, socketId);	
			
			socket.on('msg', async (content) => {
				self.redisClient.getHashSetField(userSocketMappingKeyName, content.targetIdentifier, async (err, reply) => {
					var targetSocket = reply.toString();					
					await io.to(targetSocket).emit('msg', content.payload);
				});
				var messagingQueuePayload = factories.constructMessagingPayLoad({content: content.payload, senderIdentifier: userIdentifier, recipientIdentifier: content.targetIdentifier}, 1)
				await messagingBrokerClient.publishMessage(JSON.stringify(messagingQueuePayload));
			});
			
			socket.on('disconnect', () => {
				//self.redisClient.deleteHashField(userSocketMappingKeyName, userIdentifier);
			});
		});
	}
		
	
}

module.exports = SocketServer;