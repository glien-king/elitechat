const helpers = require('./helpers.js');
const factories = require('./factories.js');
const global = require('./global-fields');

class UserService {

    constructor(dataContext, accountsBrokerClient) {
        this.dataContext = dataContext;
        this.accountsBrokerClient = accountsBrokerClient;
    }

    async subscribe(user) {
        let payload = factories.constructAccountPayLoad(user, global.accountsPayloadType.addUser);
        await this.accountsBrokerClient.publishMessage(JSON.stringify(payload));
        return {userIdentifier: payload.userIdentifier};
    }
}

module.exports = UserService;