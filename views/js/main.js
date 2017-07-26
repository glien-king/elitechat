	var webSocketHost = "localhost:3172";
	var applicationHost = "http://localhost:4381";
  	var ws = new WebSocket('ws://' + webSocketHost, 'echo-protocol');
	
	ws.addEventListener("message", function(e) {
		var msgObj = JSON.parse(e.data);
		debugger;
		var body = {
			recipientIdentifier: msgObj.recipientIdentifier,
			token: document.getElementById("TokenPlaceholder").value,
			content: msgObj.content,
			senderIdentifier: msgObj.senderIdentifier,
			sentOn: msgObj.queuedOn
		};
		var url = applicationHost + "/private/decodeMessage";
		var callBack = (xhttp) => {
			var responseObj = JSON.parse(xhttp.response);
			if(responseObj == {} || xhttp.response == "{}") return;
			var sender = document.createElement("span"); 
			sender.innerText = responseObj.sender;
			document.getElementById("Feed").appendChild(sender);
			document.getElementById("Feed").appendChild(document.createElement("br"));
			
			var date = document.createElement("span"); 
			date.innerText = responseObj.sentOn;
			document.getElementById("Feed").appendChild(date);
			document.getElementById("Feed").appendChild(document.createElement("br"));
			
			var content = document.createElement("span"); 
			content.innerText = responseObj.content;
			document.getElementById("Feed").appendChild(content);
			document.getElementById("Feed").appendChild(document.createElement("br"));
			document.getElementById("Feed").appendChild(document.createElement("br"));
		};
		postRequest(url, body, callBack);	
	});
	
	function subscribeUser(){
		var userName = document.getElementById("UserName").value;
		if(userName == '' || userName == undefined) return;
		var url = applicationHost + "/user/subscribe";
		var callBack = (xhttp) => {
			var responseObject = JSON.parse(xhttp.response);
			var token = responseObject.token;
			var identifier = responseObject.identifier;
			document.getElementById("TokenPlaceholder").value = token;
			document.getElementById("IdentifierPlaceholder").value = identifier;
			document.getElementById('Subscribe').style.display = 'none';
			document.getElementById('Message').style.display = 'block';
			showUsers();
		};
		var body = {
			name: userName
		}
		postRequest(url, body, callBack);
	}
	
	setInterval(showUsers, 7000);

	function sendMessage() {
		var url = applicationHost + "/private/send";
		var messageContent = document.getElementById("MessageContent").value;
		var recipientIdentifier = document.getElementById("TargetUserIdentifier").value;
		var allUsers = document.getElementById("AllUsers").childNodes;
		var body = {
			senderUserIdentifier: document.getElementById("IdentifierPlaceholder").value,
			content: messageContent,
			recipientUserIdentifier: recipientIdentifier
		}
		var callBack = (xhttp) => {alert("sent successfully")};
		postRequest(url, body, callBack);
	}
	
	function showUsers() {
		var url = applicationHost + "/user/getAllUsers";
		var callBack = (xhttp) => {	
			var responseJson = JSON.parse(xhttp.response);
			document.getElementById("AllUsers").innerHTML = "";
			for(var i in responseJson){
				var user = responseJson[i];
				var node = document.createElement("span"); 
				node.setAttribute("identifier", user.uniqueidentifier);
				node.setAttribute("onclick", "document.getElementById('TargetUserIdentifier').value = '" + user.uniqueidentifier + "';document.getElementById('TargetUserName').value = '"+ user.name + "'");
				node.innerText = user.name;
				document.getElementById("AllUsers").appendChild(node);
				document.getElementById("AllUsers").appendChild(document.createElement("br"));
			}
		}
		getRequest(url, callBack);
	}
	
	//Helper Functions
	
	function getRequest(url, callBack) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			  callBack(xhttp);
			}
		};
		xhttp.open("GET", url, true);
		xhttp.send();	
	}
	
	function postRequest(url, body, callBack){
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
			  callBack(xhttp);
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhttp.send(JSON.stringify(body));	
	}