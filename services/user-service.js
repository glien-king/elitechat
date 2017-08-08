var helpers = require('./helpers.js');
var factories = require('./factories.js');

var UserService = function(dataContext){
	
	this.dataContext = dataContext;
		
	this.subscribeUser = async(name) => {
		var identifier = helpers.generateGuid();
		var user = factories.constructUserModel(name, identifier);
		dataContext.users.insert(user);
	}
	
	this.deleteUser = async(identifier) => {
		return (await dataContext.users.remove({uniqueidentifier: identifier}));
	}
}

module.exports = UserService;