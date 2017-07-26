var assert = require('assert');
var helpers = require('../services/helpers.js');
var config = require('../config.js');
var mongoClient = require('../data/mongo-client');

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
		var user = await userService.subscribeUser('TESTING USER1');
		var token = user.token;
		var identifier = user.identifier;
		var retrievedToken = await userService.getTokenByIdentifier(user.identifier);
		await userService.deleteUser(identifier);
		assert.equal(token, retrievedToken);
    });
  });
});

describe('UserService', function() {
  describe('#getAllUserNamesAndIdentifiers()', function() {
    it('should return TESTING USER NAME as one of the users', async function() {	
		var userService = await getUserService();
		var user = await userService.subscribeUser('TESTING USER NAME');
		var identifier = user.identifier;
		var retrievedUsers = await userService.getAllUserNamesAndIdentifiers();
		var found = false;
		for(var i in retrievedUsers) {
			if(retrievedUsers[i].name == "TESTING USER NAME") {
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
		var user = await userService.subscribeUser('TESTING USER3');
		var identifier = user.identifier;
		var token = user.token;
		var verificationResult = await messagingService.verifyMessageRecipient(identifier, identifier, null, token, 'Test');
		console.log(verificationResult);
		await userService.deleteUser(identifier);
		var verified = !(Object.keys(verificationResult).length === 0 && verificationResult.constructor === Object);
		assert.equal(true, verified);
    });
  });
});

describe('UserService', function() {
  describe('#getUserNameByIdentifier()', function() {
    it('should return TESTING USER2', async function() {	
		var userService = await getUserService();
		var user = await userService.subscribeUser('TESTING USER2');
		var identifier = user.identifier;
		var retrievedName = await userService.getUserNameByIdentifier(user.identifier);
		await userService.deleteUser(identifier);
		assert.equal('TESTING USER2', retrievedName);
    });
  });
});