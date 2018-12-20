const fs = require('fs');
const req = require('request-promise');
const configs = require('./options');

class JiraConnector {

    constructor(options) {
        this.host = options.host || '';
        this.username = options.username || '';
        this.password = options.password || '';
    }

   async getIssue (key) {
        const url = encodeURI(`${this.host  + 'issue/' + key}`);
        const options = configs.getOptions(url, this.username, this.password);
        return await req(options).then(data => JSON.parse(data));
    };

    async search (queries) {
        const url = encodeURI(`${this.host + queries}`);
        const options = configs.getOptions(url, this.username, this.password);
        return await req(options).then(data => JSON.parse(data));
    };

    async createIssue (body) {
        const url = `${this.host + 'issue/'}`;
        const auth = configs.setBaseAuth(this.username, this.password);

        const options = {
            method: 'POST',
            url: url,
            headers:
                {
                    Authorization: auth,
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(body),
        };

        return await req(options).then(data => JSON.parse(data));
    };

    async attachFile(params) {
        const url = encodeURI(`${this.host}issue/${params.key}/attachments`);
        const auth = configs.setBaseAuth(this.username, this.password);

        const options = {
            method: 'POST',
            url: url,
            headers: {
                Authorization: auth,
                'X-Atlassian-Token': 'nocheck',
                'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
            },
            formData: {
                file: {
                    value: fs.createReadStream(params.path),
                    options: {
                        filename: params.name,
                        contentType: null
                    }
                }
            }
        };

        return await req(options).then(data => JSON.parse(data));
    };
}

module.exports = JiraConnector;