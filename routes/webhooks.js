const express = require('express');
const router = express.Router();
const webhooksCache = require("../utils/cache");
const moment = require("moment");
const braintree = require('braintree');

// load the configs
const config = require('config');
const creds = config.get("keys");

// log out the inbound URI
router.use(function (req, res, next) {
    console.log(req.originalUrl + " body: ", req.body);
    next()
});

router.post('/bt', function (req, res, next) {

    try {
        // get a client handle
        const gateway = braintree.connect(creds);
        console.log("Parsing the inbound message from Braintree.")

        gateway.webhookNotification.parse(
            req.body.bt_signature,
            req.body.bt_payload,
            function (err, webhookNotification) {
                if (err) {
                    console.error("Error parsing BT webhook:", err);
                    res.status(500).send("Error parsing webhook.");
                }
                try {
                    console.log("[Webhook Received " + webhookNotification.timestamp + "] | Kind: " + webhookNotification.kind);

                    // Example values for webhook notification properties
                    console.log(webhookNotification.kind); // "subscriptionWentPastDue"
                    console.log(webhookNotification.timestamp); // Sun Jan 1 00:00:00 UTC 2012
            
                    // create a key
                    const key = moment().toISOString();
            
                    // add to the cache
                    webhooksCache.addValue(key, webhookNotification);
                    res.status(201).send();
                }
                catch(error) {
                    console.error(error);
                    res.status(500).send("Error processing webhook.");
                }
                
            }
        );

    }
    catch (err) {
        console.log("Error in post: ", err);
        res.status(500).send(err);
    }
});

router.post('/', function (req, res, next) {

    try {
        // get the body of the request
        const body = req.body;

        // create a key
        const key = moment().toISOString();

        // add to the cache
        webhooksCache.addValue(key, body);

        res.status(201).send("created");
    }
    catch (err) {
        console.log("Error in post: ", err);
        res.status(500).send(err);
    }
});

router.get('/', function (req, res, next) {

    try {
        // get the cache values
        if (webhooksCache.cacheStats().keys && parseInt(webhooksCache.cacheStats().keys) > 0) {
            const values = webhooksCache.getValuesWithKeys();
            res.status(200).send(values);
        }
        else {
            res.status(200).send({"message": "no values present in cache."});
        }
    }
    catch (err) {
        console.log("Error in get: ", err);
        res.status(500).send(err);
    }
});

router.get('/stats', function (req, res, next) {

    try {
        // get the cache values
        const stats = webhooksCache.cacheStats();
        res.status(200).send(stats);
    }
    catch (err) {
        console.log("Error in get: ", err);
        res.status(500).send(err);
    }
});

module.exports = router;