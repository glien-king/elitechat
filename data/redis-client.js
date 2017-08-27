const redis = require('redis');

class RedisClient {
	
	constructor(config) {
		this.client = redis.createClient(config.redisPort, config.redisEndpoint, {no_ready_check: true});
		this.client.auth(config.redisPassword);
	}

	storeString(key, value) {
		this.client.set(key, value);
	}
	
	getString(key) {
		return new Promise((resolve, reject) => {this.client.get(key, () => {resolve()})})
	}
	
	storeHashSet(key, hashTable) {
		this.client.hmset(key, hashTable);
	}
	
	storeHashSetField(key, field, value) {
		this.client.hmset(key, field, value);
	}
	
	getHashSet(key) {
		return new Promise((resolve, reject) => {this.client.hgetall(key, () => {resolve()})})
	}
	
	getHashSetField(key, field) {
		return new Promise((resolve, reject) => {this.client.hget(key,() => {resolve()})})
	}
		
	deleteKey(key) {
		this.client.del(key);
	}
	
	deleteHashField(key, field) {
		this.client.hdel(key, field);
	}
}

module.exports = RedisClient;