var SocketServer = function(io, broker) {	
	
	this.clients = [];	
	
	this.initializeSocketServer = () => {
		var self = this;
		io.on('connection', function(socket){
			var socketId = socket.id;
			
			self.clients.push(socketId);
			
			socket.on('msg', async (content) => {
				await io.to(self.clients.indexOf(content.target)).emit('msg', content.payload);
				await broker.publishMessage(content.payload);
			});
			
			socket.on('disconnect', async () => {
				await self.clients.splice(self.clients.indexOf(socketId), 1);
			}); 
		});
	}
		
	
}

module.exports = SocketServer;