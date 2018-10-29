const req = require('request-promise');

class JiraConnector {

    constructor(options) {
        this.host = options.host || '';
        this.username = options.username || '';
        this.password = options.password || '';
        this.auth = this.setBaseAuth();
    }

    setBaseAuth = () => {
        return "Basic " + new Buffer(config.username + ":" + this.password).toString('base64');
    };

    getIssue = async (key) => {
        const url = encodeURI(`${this.host + key}`);

        const options = {
            method: 'GET',
            url: url,
            headers: {Authorization: this.auth}
        };

        return await req(options);
    };
}

module.exports = JiraConnector;