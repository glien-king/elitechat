function MongoSet(name, db){
	this.name = name;
	this.projection = {};	
	this.filteration = {};
	this.sort = {};
	this.skip = 0;
	this.limit = 0;

	this.filter = (criteria) => {
		this.filteration = criteria;
		return this;
	};

	this.project = (criteria) => {
		this.projection = criteria;
		return this;
	};

	this.skip = (skip) => {
		this.skip = skip;
		return this;
	};

	this.limit = (limit) => {
		this.limit = limit;
		return this;
	};

	this.sort = (sort) => {
		this.sort = sort;
		return this;
	};

	this.query = () => {
		var promise = db.collection(this.name).find(this.filteration, this.projection).toArray();
		this.reset();
		return promise;
	};

	this.insert = (obj) => {
		return db.collection(this.name).insert(obj);
	};

	this.count = (obj) => {
		return db.collection(this.name).count(obj);
	};

	this.exists = async (obj) => {
		return parseInt(await this.count(obj)) > 0;
	};

	this.reset = () => {
		this.projection = {};	
		this.filteration = {};
		this.sort = {};
		this.skip = 0;
		this.limit = 0;
	}
}

module.exports = MongoSet;