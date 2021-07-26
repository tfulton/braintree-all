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

// accept a dispute
router.post("/:disputeId/accept", function (req, res, next) {

    // get a client handle
    const gateway = braintree.connect(creds);
    const disputeId = req.params.disputeId;
    console.log(`Accepting a dispute with disputeId: ${disputeId}`);

    gateway.dispute.accept(disputeId)
        .then((response) => {
            if (response.success) {
                // dispute successfully accepted
                console.log("sending success")
                res.status(200).send(response);
            } else {
                console.log("sending 422 error: ", response.errors)
                res.status(422).send(response.errors);
            }
        }).catch((reason) => {
            console.log("sending 422 error from catch: ", reason);
            res.status(422).send({
                name: reason.name,
                type: reason.type,
                message: reason.message
            });
        });
});

// add file evidence

// add text evidence
router.post("/:disputeId/evidence/text", function (req, res, next) {

    // get a client handle
    const gateway = braintree.connect(creds);
    const disputeId = req.params.disputeId;
    console.log(`Adding text evidence for disputeId: ${disputeId}`);
    console.log('Req Body: ', req.body);

    gateway.dispute.addTextEvidence(
        disputeId,
        req.body
    ).then((response) => {
        console.log("Response: ", response);
        if (response.success) {
            // text based evidence added successfully
            console.log("sending success")
            res.status(200).send(response);
        } else {
            console.log("sending 422 error: ", response.errors)
            res.status(422).send(response.errors);
        }
    }).catch((reason) => {
        console.log("sending 422 error fro catch: ", reason);
        res.status(500).send({
            name: reason.name,
            type: reason.type,
            message: reason.message
        });
    });
});

// remove evidence
router.delete("/:disputeId/evidence/:evidenceId", function (req, res, next) {

    // get a client handle
    const gateway = braintree.connect(creds);
    const disputeId = req.params.disputeId;
    const evidenceId = req.params.evidenceId;
    console.log(`Removing evidence for disputeId: ${disputeId}`);
    console.log(`Removings evidenceId: ${evidenceId}`);

    gateway.dispute.removeEvidence(
        disputeId,
        evidenceId
    ).then((response) => {
        console.log("Response: ", response);
        if (response.success) {
            // text based evidence added successfully
            console.log("sending success")
            res.status(200).send(response);
        } else {
            console.log("sending 422 error: ", response.errors)
            res.status(422).send(response.errors);
        }
    }).catch((reason) => {
        console.log("sending 422 error fro catch: ", reason);
        res.status(500).send({
            name: reason.name,
            type: reason.type,
            message: reason.message
        });
    });
});

// finalize a dispute (i.e. submit the chargeback for dispute)
router.post("/:disputeId/finalize/", function (req, res, next) {

    // get a client handle
    const gateway = braintree.connect(creds);
    const disputeId = req.params.disputeId;
    console.log(`Finalizing a dispute with disputeId: ${disputeId}`);

    gateway.dispute.finalize(disputeId)
        .then((response) => {
            if (response.success) {
                // dispute successfully finalized
                console.log("sending success")
                res.status(200).send(response);
            } else {
                console.log("sending 422 error: ", response.errors)
                res.status(422).send(response.errors);
            }
        }).catch((reason) => {
            console.log("sending 422 error from catch: ", reason);
            res.status(422).send({
                name: reason.name,
                type: reason.type,
                message: reason.message
            });
        });
});

// find a dispute
router.get("/:disputeId", function (req, res, next) {

    const gateway = braintree.connect(creds);
    const disputeId = req.params.disputeId;

    gateway.dispute.find(disputeId)
        .then((response) => {
            console.log("Response: ", response);
            res.status(200).send(response);
        })
        .catch((reason) => {
            console.log("Error reason: ", reason);
            res.status(422).send(reason);
        })
});

// search for a dispute







module.exports = router;