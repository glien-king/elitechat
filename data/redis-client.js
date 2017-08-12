var redis = require('redis');

var RedisClient = function(config){
	
	this.client = redis.createClient(config.redisPort, config.redisEndpoint, {no_ready_check: true});
	
	this.client.auth(config.redisPassword);
		
	this.storeString = (key, value) => {
		this.client.set(key, value);
	}
	
	this.getString = (key, callback) => {
		return this.client.get(key, callback);
	}
	
	this.storeHashSet = (key, hashTable) => {
		this.client.hmset(key, hashTable);
	}
	
	this.storeHashSetField = (key, field, value) => {
		this.client.hmset(key, field, value);
	}
	
	this.getHashSet = (key, callback) => {
		return this.client.hgetall(key, callback);
	}
	
	this.getHashSetField = (key, field, callback) => {
		return this.client.hget(key, field, callback);
	}
	
	this.keyExists = async (key, callback) => {
		return (await this.client.exists(key, callback));
	}
	
	this.deleteKey = (key) => {
		this.client.del(key);
	}
	
	this.deleteHashField = (key, field) => {
		this.client.hdel(key, field);
	}
};

module.exports = RedisClient;