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

router.get("/cards", function(req, res, next){
    res.status(200).send(braintree.Test.CreditCardNumbers);
});

module.exports = router;