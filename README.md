# JavaScript CRUD for JIRA

## Supported Api calls
* search
* getIssue
* createIssue
* attachFile

### Installing
npm i node-jira-connector

### Usage example
```
const Jira = require('node-jira-connector');

const jiraClient = new Jira({
    host: 'http://localhost:3000/rest/api/latest/'',
    username: 'user',
    password: 'pass',
});

const getIssues = async () => {
    const url = 'search?jql=status=Completed';

    try {
        await jiraClient.search(url);
    } catch (e) {
        console.log('Error: ', e);
    }
};