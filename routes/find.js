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

/*
    Use the following with:  http://localhost:3000/find/search/[email goes here]
 */
router.get('/search/:email', function (req, res, next) {

    try {
        // get a client handle
        var gateway = braintree.connect(creds);

        var email = req.params.email;

        var array = [];
        var stream = gateway.transaction.search(function (search) {
            search.customerEmail().is(email);
        });

        var body = [];
        stream.on('ready', function () {
            console.log("Stream ready.")
        });

        stream.on('data', function (chunk) {
            body.push(chunk);
            console.log("Chunk processed.");
        });

        stream.on('end', function () {
            console.log("Array length: ", array.length);
            try {
                console.log("Stream end.  Length: ", body.length);
                res.status(200).send(body);
            }
            catch(error) {
                console.log("Error: ", error);
                res.status(500).send("Error in data processing.");
            }
        });
    }
    catch(error) {
        console.log("Error", error);
        res.status(500).send("Handled Error: ${er.message}");
    }
});

router.get('/:tranId', function(req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var tranId = req.params.tranId;
    console.log("transId: ", tranId);

    // submit the find
    gateway.transaction.find(tranId,
        function (err, result) {
            if (result) {
                console.log("sending success")
                res.status(200).send(result);
            } else {
                console.log("sending 500 error: ", err)
                res.status(500).send(err);
            }
        }
    );
});

router.get('/token/:id', function(req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var id = req.params.id;
    console.log("id: ", id);

    // submit the find
    gateway.transaction.search(function(search) {
            search.paymentMethodToken().is(id);
        },
        function (err, result) {
            var strResult = [];
            result.each(function (err, transaction) {
                console.log(transaction.id);
                console.log(transaction);
            });
            if (result) {
                console.log("sending success")
                res.status(200).send(result);
            } else {
                console.log("sending 500 error: ", err)
                res.status(500).send(err);
            }
        }
    );
});

router.get('/orderid/:id', function(req, res, next) {

    // get a client handle
    var gateway = braintree.connect(creds);

    var id = req.params.id;
    console.log("id: ", id);

    // submit the find
    gateway.transaction.search(function(search) {
            search.orderId().is(id);
        },
        function (err, result) {
            var resultsArray = [];
            result.each(function (err, transaction) {
                resultsArray.push(transaction);
                console.log(transaction.id);
                console.log(transaction.status);
            });
            if (result) {
                console.log("sending success")
                res.status(200).send(resultsArray);
            } else {
                console.log("sending 500 error: ", err)
                res.status(500).send(err);
            }
        }
    );
});

module.exports = router;