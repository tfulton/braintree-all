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
    console.log("Getting all merchant accounts.")

    gateway.merchantAccount.all(function (error, result) {
        console.log("gateway.merchantAccount.all", result)
        if (result) {
            console.log("sending success")
            res.status(200).send(result);
        } else {
            console.log("sending 500 error: ", error)
            res.status(500).send(error);
        }
    });
});

router.get('/:merchantAccountId', function (req, res, next) {

    // get a client handle
    const gateway = braintree.connect(creds);
    const merchantAccountId = req.params.merchantAccountId;
    console.log("Getting merchant accounts: ", merchantAccountId);

    gateway.merchantAccount.find(merchantAccountId, function (error, result) {
        console.log("gateway.merchantAccount.find", result)
        if (result) {
            console.log("sending success")
            res.status(200).send(result);
        } else {
            console.log("sending 500 error: ", error)
            res.status(500).send(error);
        }
    });
});

module.exports = router;