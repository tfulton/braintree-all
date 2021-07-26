const express = require('express');
const router = express.Router();
const braintree = require('braintree');
const validator = require("validator");

// load the configs
const config = require('config');
const creds = config.get("keys");

// log out the inbound URI
router.use(function (req, res, next) {
    console.log(req.originalUrl + " body: ", req.body);
    next()
});

router.post('/:tranId', function (req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    try {
        var tranId = req.params.tranId;
        console.log("transId: ", tranId);

        console.log("req.body: ", req.body);
        // const amount = validator.isNumeric(req.body.amount + "") ? req.body.amount : null;
        const orderId = !validator.isEmpty(req.body.orderId + "") ? req.body.orderId : "";


        // submit the capture
        gateway.transaction.submitForSettlement(tranId, null, { "orderId": orderId },
            function (err, result) {
                if (result) {
                    console.log("sending success")
                    res.status(200).send(result);
                } else {
                    console.log("sending 500 error: ", err)
                    res.status(500).send(err);
                }
            });
    }
    catch (error) {
        console.log("Error in catch: ", error);
        res.status(500).send("Error:  ", error.message);
    }
});

router.post('/:tranId/partial', function (req, res, next) {

    var gateway = braintree.connect(creds);

    try {

        // get a client handle
        var tranId = req.params.tranId;
        console.log("tranId: ", tranId);

        console.log("req.body: ", req.body);
        const amount = validator.isNumeric(req.body.amount + "") ? req.body.amount : null;
        const orderId = !validator.isEmpty(req.body.orderId + "") ? req.body.orderId : "";

        console.log(`Amount for partial capture: ${amount}`);
        console.log(`Order ID for partial capture: ${orderId}`);

        // submit the capture
        gateway.transaction.submitForPartialSettlement(tranId, "4.00", { "orderId": orderId },
            function (err, result) {
                console.log("submitForPartialSettlement.err: ", err);
                console.log("submitForPartialSettlement.result: ", result);
                if (result) {
                    console.log("sending success");
                    res.status(200).send(result);
                } else {
                    console.log("sending 500 error: ", err);
                    res.status(500).send(err);
                }
            }
        );
    }
    catch (error) {
        console.log("Error in catch: ", error);
        res.status(500).send("Error:  ", error.message);
    }
});

module.exports = router;