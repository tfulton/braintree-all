const express = require('express');
const router = express.Router();
const os = require('os');

// load the configs
const config = require('config');
const creds = config.get("keys");

// log out the inbound URI
router.use(function (req, res, next) {
    console.log(req.originalUrl + " body: ", req.body);
    next()
});

router.get('/', function (req, res, next) {

    try {
        let body = {};

        let url = req.protocol + '://' + req.get('host') + req.originalUrl;
        body.url = url;
        body.hostname = os.hostname();
        body.merchantId = creds.merchantId;
        res.status(200).send(body);
    }
    catch (error) {
        console.log("sending 500 error: ", error);
        res.status(500).send(error);
    }

});

module.exports = router;