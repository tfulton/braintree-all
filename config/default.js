const braintree = require("braintree");

/** 
 * Contains the minimum configuration -- used largely for remote deployment.
 */
module.exports = {
    keys: {
        environment: braintree.Environment.Sandbox,
        graphQLEndpoint:  'https://payments.sandbox.braintree-api.com'
    }
}