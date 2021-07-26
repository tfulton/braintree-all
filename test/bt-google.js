// Make sure to have https://pay.google.com/gp/p/js/pay.js loaded on your page

// You will need a button element on your page styled according to Google's brand guidelines
// https://developers.google.com/pay/api/web/guides/brand-guidelines
var button = document.querySelector('#google-pay-button');
var paymentsClient = new google.payments.api.PaymentsClient({
    environment: 'TEST' // Or 'PRODUCTION'
});

braintree.client.create({
    authorization: CLIENT_AUTHORIZATION
}).then(function (clientInstance) {
    return braintree.googlePayment.create({
        client: clientInstance,
        googlePayVersion: 2,
        googleMerchantId: 'merchant-id-from-google' // Optional in sandbox; if set in sandbox, this value must be a valid production Google Merchant ID
    });
}).then(function (googlePaymentErr, googlePaymentInstance) {
    return paymentsClient.isReadyToPay({
        // see https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
        existingPaymentMethodRequired: true // Optional
    });
}).then(function (response) {
    if (response.result) {
        button.addEventListener('click', function (event) {
            event.preventDefault();

            var paymentDataRequest = googlePaymentInstance.createPaymentDataRequest({
                transactionInfo: {
                    currencyCode: 'USD',
                    totalPriceStatus: 'FINAL',
                    totalPrice: '100.00' // Your amount
                }
            });

            // We recommend collecting billing address information, at minimum
            // billing postal code, and passing that billing postal code with all
            // Google Pay card transactions as a best practice.
            // See all available options at https://developers.google.com/pay/api/web/reference/object
            var cardPaymentMethod = paymentDataRequest.allowedPaymentMethods[0];
            cardPaymentMethod.parameters.billingAddressRequired = true;
            cardPaymentMethod.parameters.billingAddressParameters = {
                format: 'FULL',
                phoneNumberRequired: true
            };

            paymentsClient.loadPaymentData(paymentDataRequest).then(function (paymentData) {
                return googlePaymentInstance.parseResponse(paymentData);
            }).then(function (result) {
                // Send result.nonce to your server
                // result.type may be either "AndroidPayCard" or "PayPalAccount", and
                // paymentData will contain the billingAddress for card payments
            }).catch(function (err) {
                // Handle errors
            });
        });
    }
}).catch(function (err) {
    // Handle creation errors
});