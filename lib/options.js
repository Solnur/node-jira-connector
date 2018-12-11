const setBaseAuth = (user, pass) => {
    return "Basic " + Buffer.from(user + ':' + pass).toString('base64');
};

const getOptions = (url, user, pass) => {
    const auth = setBaseAuth(user, pass);

    return {
        method: 'GET',
        url: url,
        headers: {
            Authorization: auth
        }
    }
};

module.exports = {setBaseAuth, getOptions};