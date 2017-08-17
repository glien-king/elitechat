const MongoClient = require('mongodb').MongoClient;
const collectionSet = require('./mongo-set.js');

class Client {
	
	constructor(config) {
		this.config = config;
		this.database = null;
		this.context = {};
	}

	async initializeDatabaseConnection() {
		if(this.database != null) return;
		return new Promise((resolve, reject) => MongoClient.connect(this.config.mongoConnectionString, async (err, database) => {
			this.database = database;
			await this.populateContext();
			resolve();
		}));
	}

	async populateContext() {
		(await this.database.listCollections().toArray()).map(col => {
			if(col.name != 'system.indexes') 
				this.context[col.name] = new collectionSet(col.name, this.database);
		});
	}

	getContext() {
		let copy = Object.assign({}, this.context); //Cloning mongoContext to a new object
		for (let key in copy) {
			if (copy.hasOwnProperty(key)) {
				copy[key] = new collectionSet(key, this.db);
			}
		}
		return copy;
	}

}

module.exports = Client;
