var socket = io();



socket.on('msg', function(msg){
      alert(msg);
});
	
sendMessage = () => {
	var payload = document.getElementById("MessageBox").value;
	socket.emit('msg', {targetIdentifier:"343a33d9-9e40-7c12-00e7-67a3c2ea6331", payload: payload});
}