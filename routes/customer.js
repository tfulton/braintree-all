var express = require('express');
var router = express.Router();
var braintree = require('braintree');

// load the configs
const config = require('config');
const creds = config.get("keys");

// log out the inbound URI
router.use(function (req, res, next) {
    console.log(req.originalUrl + " body: ", req.body);
    next()
});

router.post('/', function (req, res, next) {

    // extract some values from the HTTP request
    var nonceFromTheClient = req.body.paymentMethodNonce;

    // get a client handle
    var gateway = braintree.connect(creds);

    // create a new customer
    gateway.customer.create(req.body,
        function (error, result) {
            console.log("gateway.customer.create result: ", result)
            if (result) {
                console.log("sending success")
                res.status(200).send(result);
            } else {
                console.log("sending 500 error: ", error)
                res.status(500).send(error);
            }
        });
});

router.get('/:id', function (req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var id = req.params.id;
    console.log("id: ", id);

    // create the p. method
    gateway.customer.find(id,
        function (err, result) {
            if (result) {
                console.log("sending success")
                res.status(200).send(result);
            } else {
                console.log("sending 500 error: ", err)
                res.status(500).send(err);
            }
        });
});

router.put('/:id', function (req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var id = req.params.id;
    console.log("id: ", id);

    // create a new customer
    gateway.customer.update(id, req.body,
        function (error, result) {
            console.log("gateway.customer.update result: ", result);
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