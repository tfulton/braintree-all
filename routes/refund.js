var express = require('express');
var router = express.Router();
var braintree = require('braintree');

// load the configs
const config = require('config');
const creds = config.get("keys");

// log out the inbound URI
router.use(function (req, res, next) {
    console.log(req.originalUrl + " body: ", req.body);
    console.log(req.originalUrl + " query: ", req.query);
    next()
});

router.post('/:tranId/partial', function (req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var tranId = req.params.tranId;
    console.log("transId: ", tranId);
    console.log("amount: ", req.body.amount);

    // create a new transaction
    gateway.transaction.refund(tranId, req.body.amount,
        function (error, result) {
            console.log("gateway.transaction.refund(partial) result: ", result)
            if (result) {
                console.log("sending success")
                res.status(200).send(result);
            } else {
                console.log("sending 500 error: ", error)
                res.status(500).send(error);
            }
        });
});

router.post('/:tranId', function (req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var tranId = req.params.tranId;
    console.log("transId: ", tranId);

    // create a new transaction
    gateway.transaction.refund(tranId,
        function (error, result) {
            console.log("gateway.transaction.refund result: ", result)
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