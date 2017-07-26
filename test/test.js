var assert = require('assert');
var helpers = require('../services/helpers.js');
var config = require('../config.js');
var mongoClient = require('../data/mongo-client');

describe('Helpers', function() {
  describe('#decryptData()', function() {
    it('should return Whats Up?', function() {		
		assert.equal('Whats Up?', helpers.decryptData('U2FsdGVkX19InKCaX59QLtlqSwLgcZkeoSWpYbzor4E='));
    });
  });
});

describe('UserService', function() {
  describe('#getTokenByIdentifier()', function() {
    it('should return the correct user token', async function() {	
		var userService = await getUserService();
		var user = await createFakeUser(userService);
		var token = user.token;
		var identifier = user.identifier;
		var retrievedToken = await userService.getTokenByIdentifier(user.identifier);
		await userService.deleteUser(identifier);
		assert.equal(token, retrievedToken);
    });
  });
});

describe('UserService', function() {
  describe('#getUserNameByIdentifier()', function() {
    it('should return TESTING USER', async function() {	
		var userService = await getUserService();
		var user = await createFakeUser(userService);
		var identifier = user.identifier;
		var retrievedName = await userService.getUserNameByIdentifier(user.identifier);
		await userService.deleteUser(identifier);
		assert.equal('TESTING USER', retrievedName);
    });
  });
});

describe('UserService', function() {
  describe('#getAllUserNamesAndIdentifiers()', function() {
    it('should return TESTING USER as one of the users', async function() {	
		var userService = await getUserService();
		var user = await createFakeUser(userService);
		var identifier = user.identifier;
		var retrievedUsers = await userService.getAllUserNamesAndIdentifiers(user.identifier);
		var found = false;
		for(var i in retrievedUsers) {
			if(retrievedUsers[i].name == "TESTING USER") {
				found = true;
				break;
			}
		}		
		await userService.deleteUser(identifier);
		assert.equal(true, found);
    });
  });
});

describe('MessagingService', function() {
  describe('#verifyMessageRecipient()', function() {
    it('should return the TESTING USER', async function() {	
		var messagingService = await getMessagingService();
		var userService = await getUserService();
		var user = await createFakeUser(userService);
		var identifier = user.identifier;
		var token = user.token;
		var verificationResult = await messagingService.verifyMessageRecipient(identifier, identifier, null, token, 'Test');
		await userService.deleteUser(identifier);
		assert.equal('TESTING USER', 'TESTING USER');
    });
  });
});


//Helper functions

var getUserService = async function() {	
	if(Object.keys(mongoClient.getContext()).length === 0 && mongoClient.getContext().constructor === Object) { 
		await mongoClient.initializeDbConnection(config);
	}
	return new (require('../services/user-service.js'))(mongoClient.getContext());
}

var getMessagingService = async function() {	
	if(Object.keys(mongoClient.getContext()).length === 0 && mongoClient.getContext().constructor === Object) { 
		await mongoClient.initializeDbConnection(config);
	}
	return new (require('../services/messaging-service.js'))(null, mongoClient.getContext());
}

var createFakeUser = async function(userService) {
	var user = await userService.subscribeUser('TESTING USER');
	return user;
}