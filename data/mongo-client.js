const MongoClient = require('mongodb').MongoClient;
const mongoContext = require('./mongo-context.js');
const collectionSet = require('./mongo-set.js');

var client = {
	db: null,
    initializeDbConnection: (config, callback) => {
		var self = this;
		return new Promise((resolve, reject) => {
			if(self.db != null) return;
			MongoClient.connect(config.mongoConnectionString, async (err, database) => {
				self.db = database;
				(await database.listCollections().toArray()).map(col => {
					if(col.name != 'system.indexes') 
						mongoContext[col.name] = new collectionSet(col.name, self.db);
				});	
				resolve();
			});
		});	
    },
    getContext: () => {
		var copy = Object.assign({}, mongoContext); //Cloning mongoContext to a new object
		for (var key in copy) {
			if (copy.hasOwnProperty(key)) {
				copy[key] = new collectionSet(key, this.db);
			}
		}
		return copy;
    }
};

module.exports = client;
