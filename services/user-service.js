var UserService = function(dataContext){
	
	this.dataContext = dataContext;
	
	this.getTokenByIdentifier = async (identifier) => {
		return (await dataContext.users.filter({uniqueidentifier: identifier}).project({token: 1, _id: 0}).query())[0].token;
	}
}

module.exports = UserService;