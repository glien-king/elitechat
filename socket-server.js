const cookie = require('cookie');
const factories = require('./services/factories');
const global = require('./services/global-fields');
const userSocketMappingKeyName = "users_socket_map";

class SocketServer {

	constructor(redisClient){
		this.redisClient = redisClient;
	}

	initializeSocketServer(io, messagingBrokerClient) {
		io.on('connection', async (socket) => {
			let socketId = socket.id;
			let userIdentifier = cookie.parse(socket.handshake.headers['cookie']).UserIdentifier;
			this.redisClient.storeHashSetField(userSocketMappingKeyName, userIdentifier, socketId);
			
			let handleMessage = async (content) => {		
				this.redisClient.getHashSetField(userSocketMappingKeyName, content.targetIdentifier, async (err, reply) => {
					let targetSocket = reply.toString();	
					await io.to(targetSocket).emit('msg', content.payload);
				});
				
				let messagingQueuePayload = factories.constructMessagingPayLoad(
				{
					content: content.payload, 
					senderIdentifier: userIdentifier, 
					recipientIdentifier: content.targetIdentifier
				}, global.messagingPayloadType.addMessage);
				
				await messagingBrokerClient.publishMessage(JSON.stringify(messagingQueuePayload));
			}

			socket.on('msg', handleMessage);			
		});
	}	
}

module.exports = SocketServer;