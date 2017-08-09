var socket = io();



socket.on('msg', function(msg){
      alert(msg);
});
	
sendMessage = () => {
	var payload = document.getElementById("MessageBox").value;
	socket.emit('msg', {target:"Ahmed", payload: payload});
}