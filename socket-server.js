var SocketServer = function(io) {
	
	this.clients = [];
	
	this.initializeSocketServer = () => {
		var self = this;
		io.on('connection', function(socket){
			var socketId = socket.id;
			
			self.clients.push(socketId);
			
			socket.on('msg', (content) => {
				io.to(self.clients.indexOf(content.target)).emit('msg', content.payload)
			});
			
			socket.on('disconnect', () => {
				self.clients.splice(self.clients.indexOf(socketId), 1);
			});
		  
		  
		});
	}
		
	
}

module.exports = SocketServer;