var helpers = require('./helpers.js');
var factories = require('./factories.js');

var UserService = function(dataContext){
	
	this.dataContext = dataContext;
	
	this.getTokenByIdentifier = async (identifier) => {
		return (await dataContext.users.filter({uniqueidentifier: identifier}).project({token: 1, _id: 0}).query())[0].token;
	}
	
	this.getUserNameByIdentifier = async (identifier) => {
		return (await dataContext.users.filter({uniqueidentifier: identifier}).project({name: 1, _id: 0}).query())[0].name;
	}
	
	this.subscribeUser = async(name) => {
		var token = helpers.generateGuid(), identifier = helpers.generateGuid();
		var user = factories.constructUserModel(name, token, identifier);
		dataContext.users.insert(user);
		return {
			token: token, 
			identifier: identifier
		};
	}
	
	this.getAllUserNamesAndIdentifiers = async() => {
		return (await dataContext.users.project({uniqueidentifier: 1, name: 1, _id: 0}).query());
	}
}

module.exports = UserService;