const express = require('express');
const router = express.Router();
const braintree = require('braintree');
const fetch = require('node-fetch');
const { GraphQLClient } = require('graphql-request');
const { buildHeader } = require('../utils/authUtils');

// load the configs
const config = require('config');
const creds = config.get("keys");

// log out the inbound URI
router.use(function (req, res, next) {
    console.log(req.originalUrl + " body: ", req.body);
    next()
});

/**
 * Use GraphQL to retreive the token
 */
router.get('/token', function (req, res, next) {

    // build the request options
    try {
        const URI = `${creds.graphQLEndpoint}/graphql`;
        console.log(`Request URI ${URI}`);

        const query = `mutation CreateClientToken {
            createClientToken {clientToken}
        }`;

        const client = new GraphQLClient(URI, {
            headers: buildHeader(),
        })

        client.rawRequest(query)
            .then(data => {
                console.log(data);
                res.status(201).send(data.data.createClientToken.clientToken);
            })
            .catch(error => {
                console.log("ERROR: ", error);
                res.status(400).send(JSON.stringify(error.response));
            })

    }
    catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send("ERROR: ", JSON.stringify(error));
    }
});

/**
 * Use GraphQL to retreive the token
 */
router.get('/token/:merchantAccountId', function (req, res, next) {

    // build the request options
    try {
        const merchantAccountId = req.params.merchantAccountId;
        console.log(`Getting client token with merchantAccountId: ${merchantAccountId}`);

        const URI = `${creds.graphQLEndpoint}/graphql`;
        console.log(`Request URI: ${URI}`);

        const query = "mutation CreateClientToken ($input: CreateClientTokenInput) {createClientToken(input: $input) {clientToken}}";
        const variables = {
            "input": {
                "clientMutationId": "3277dabc-a3ab-4f43-b3d6-7b3afed80d7c",
                "clientToken": {
                    "merchantAccountId": merchantAccountId
                }
            }
          };

        const body = JSON.stringify({query: query, variables: variables});
        console.log("body: ", body);
        
        fetch(URI, {
            method: 'POST',
            headers: buildHeader(),
            body: body
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log("Fetch json response: ", json);
            res.status(201).send(json.data.createClientToken.clientToken);
        }).catch(function (error) {
            console.log("Error in fetch: ", error);
            res.status(400).send(JSON.stringify(new Error('Message rejected by endpoint.', error)));
        });

    }
    catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send("ERROR: ", JSON.stringify(error));
    }
});

/**
 * Vault a payment method
 */
router.get('/method/:nonce', function (req, res, next) {

    // build the request options
    try {
        const nonce = req.params.nonce;
        console.log(`Create payment method using nonce: ${nonce}`);

        const URI = `${creds.graphQLEndpoint}/graphql`;
        console.log(`Request URI: ${URI}`);

        const query = "mutation VaultPaymentMethod($input: VaultPaymentMethodInput!) {vaultPaymentMethod(input: $input) {clientMutationId paymentMethod {id legacyId customer {id}}}}";
        const variables = {
            "input": {
                "clientMutationId": "3277dabc-a3ab-4f43-b3d6-7b3afed80d7c",
                "paymentMethodId": nonce
            }
          };

        const body = JSON.stringify({query: query, variables: variables});
        console.log("body: ", body);
        
        fetch(URI, {
            method: 'POST',
            headers: buildHeader(),
            body: body
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            console.log("Fetch json response: ", json);
            res.status(201).send(json);
        }).catch(function (error) {
            console.log("Error in fetch: ", error);
            res.status(400).send(JSON.stringify(new Error('Message rejected by endpoint.', error)));
        });

    }
    catch (error) {
        console.log("ERROR: ", error);
        res.status(500).send("ERROR: ", JSON.stringify(error));
    }
});

module.exports = router;