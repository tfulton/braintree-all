const express = require('express');
const router = express.Router();
const braintree = require('braintree');

// load the configs
const config = require('config');
const creds = config.get("keys");

// log out the inbound URI
router.use(function (req, res, next) {
    console.log(req.originalUrl + " body: ", req.body);
    next()
});

router.get('/', function (req, res, next) {

    // get a client handle
    const gateway = braintree.connect(creds);
    console.log("Getting client token - no merchantAccountId specified.")

    gateway.clientToken.generate({
    }, function (error, result) {
        console.log("gateway.clientToken.generate result: ", result)
        if (result) {
            console.log("sending success")
            res.status(200).send(result.clientToken);
        } else {
            console.log("sending 500 error: ", error)
            res.status(500).send(error);
        }
    });
});

/**
 * Utilize a merchant ID in generating the token.
 */
router.get('/:merchantAccountId', function (req, res, next) {

    // get a client handle
    const gateway = braintree.connect(creds);
    const merchantAccountId = req.params.merchantAccountId;
    console.log(`Getting client token with merchantAccountId: ${merchantAccountId}`);

    gateway.clientToken.generate({
        merchantAccountId: merchantAccountId
    }, function (error, result) {
        console.log("gateway.clientToken.generate result: ", result)
        if (result) {
            console.log("sending success")
            res.status(200).send(result.clientToken);
        } else {
            console.log("sending 500 error: ", error)
            res.status(500).send(error);
        }
    });
});

module.exports = router;