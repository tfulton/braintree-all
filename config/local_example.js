const braintree = require("braintree");

/**
 * NOTE:  place your specific configs in this file and rename to "local.js" to run on a local development environment.
 */
module.exports = {
    keys: {
        environment: braintree.Environment.Sandbox,
        merchantId: "",
        publicKey: "",
        privateKey: ""
    }
}