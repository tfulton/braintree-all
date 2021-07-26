const Base64 = require('js-base64').Base64

// load the configs
const config = require('config');
const creds = config.get("keys");

const buildHeader = function() {

    let headers = {
        'Authorization': 'Basic ' + Base64.encode(creds.publicKey + ":" + creds.privateKey),
        'Content-Type': 'application/json',
        'Braintree-Version': '2019-12-19'
    };

    return headers;
}

module.exports = {
    buildHeader
};