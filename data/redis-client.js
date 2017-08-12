var redis = require('redis');

var RedisClient = function(config){
	
	this.client = redis.createClient(config.redisPort, config.redisEndpoint, {no_ready_check: true});
	
	this.client.auth(config.redisPassword);
		
	this.storeString = (key, value) => {
		this.client.set(key, value);
	},
	
	this.getString = (key) => {
		return this.client.get(key);
	},
	
	this.storeHashSet = (key, hashTable) => {
		this.client.hmset(key, hashTable);
	},
	
	this.getHashSet = (key) => {
		return this.client.hgetall(key);
	},
	
	this.keyExists = async (key) => {
		return (await this.client.exists(key)) == 1;
	}
};

module.exports = RedisClient;