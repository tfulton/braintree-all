const assert = require("assert");
const braintree = require("braintree");

describe('BT Test Data Suite', function() {
  describe('Confirm the test card data is available.', function() {
    it("should have the card numbers objecdt", function() {
        const cardNumbers = braintree.Test.CreditCardNumbers;
        assert.equal(true, cardNumbers != null && cardNumbers != undefined, "CardNumbers not found.");
    });

    it("should have the card type indicators", function() {
        const cardTypeIndicators = braintree.Test.CreditCardNumbers.CardTypeIndicators;
        assert.equal(true, cardTypeIndicators != null && cardTypeIndicators != undefined, "CardTypeIndicators not found.");
        
        let size = 0;
        for (let item in cardTypeIndicators) {
            console.log("item: ", item);
            size++;
        }
        assert.equal(13, size, "We were looking for a different number of items in the CardTypeIndicators object.");
    });

    it("sould have the amex card info", function() {
        const amexInfo = braintree.Test.CreditCardNumbers.AmexPayWithPoints;
        assert.equal(true, amexInfo != null && amexInfo != undefined, "AmexPayWithPoints not found.");
    
        let size = 0;
        for (let item in amexInfo) {
            console.log("item: ", item);
            size++;
        }
        assert.equal(3, size, "We were looking for a different number of items in the AmexPayWithPoints object.");
    });

    it("should have the dispute card info", function() {
        const disputeCard = braintree.Test.CreditCardNumbers.Dispute;
        assert.equal(true, disputeCard != null && disputeCard != undefined, "Dispute does not exist.");
        assert.ok(disputeCard.Chargeback, "Chargeback does not exist.");
    });
  })
});
