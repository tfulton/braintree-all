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

    // get a client handle
    var gateway = braintree.connect(creds);

    // create the p. method
    gateway.paymentMethod.create(req.body,
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

    // update the p. method
    console.log("updating payment method with:  ", JSON.stringify(req.body, null, 4));
    gateway.paymentMethod.update(id, req.body,
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

router.get('/:id', function (req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var id = req.params.id;
    console.log("id: ", id);

    // create the p. method
    gateway.paymentMethod.find(id,
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

router.delete('/:id', function (req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var id = req.params.id;
    console.log("id: ", id);

    // create the p. method
    gateway.paymentMethod.delete(id,
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

module.exports = router;