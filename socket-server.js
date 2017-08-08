var socketServer = function(io) {
	
	this.clients = [];
	
	this.initializeSocketServer = () => {
		var self = this;
		io.on('connection', function(socket){
			var socketId = socket.id;
			
			self.clients.push(socketId);
			
			socket.on('msg', (content) => {
				console.log(content);
				io.sockets.socket(self.clients[content.target]).emit("msg", content.payload);
			});
			
			socket.on('disconnect', () => {
				self.clients.splice(self.clients.indexOf(socketId), 1);
			});
		  
		  
		});
	}
	
	
}

module.exports = socketServer;