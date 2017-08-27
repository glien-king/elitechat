class MongoSet{
	
	constructor(name, db) {
		this.name = name;
		this.database = db;
		this.reset();
	}

	filter(criteria) {
		this.filteration = criteria;
		return this;
	}

	project(criteria) {
		this.projection = criteria;
		return this;
	}

	skip(skip) {
		this.skip = skip;
		return this;
	}

	limit(limit) {
		this.limit = limit;
		return this;
	}

	sort(sort) {
		this.sort = sort;
		return this;
	}

	async query() {
		let result = await (this.database.collection(this.name).find(this.filteration, this.projection).toArray());
		this.reset();
		return result;
	}

	insert(obj) {
		return this.database.collection(this.name).insert(obj);
	}

	count(obj) {
		return this.database.collection(this.name).count(obj);
	}

	async exists (obj) {
		return parseInt(await this.count(obj)) > 0;
	}
	
	remove(criteria) {
		return this.database.collection(this.name).remove(criteria);
	}

	reset() {
		this.projection = {};	
		this.filteration = {};
		this.sort = {};
		this.skip = 0;
		this.limit = 0;
	}
}

module.exports = MongoSet;