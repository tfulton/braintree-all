const assert = require("assert");
const validator = require("validator");
const {uuidv4} = require("../utils/misc")

describe("UUID Testing", function() {
    describe("Test that UUID is formatted correct", function() {
        it("Must have the correct formatting", function() {
            const uuid = uuidv4();
            assert.ok(validator.isUUID(uuid), "Is not a UUID 4 compliant value.");
        });
    });

    describe("Confirm the formatting over numerous iterations", function() {
        it("Must have the correct formatting no matter how many times we do it", function() {
            for (let i=0; i < 100000; i++) {
                const uuid = uuidv4();
                assert.equal(true, validator.isUUID(uuid), "Is not a UUID 4 compliant value.");
            }
        })
    });

    describe("Confirm that the UUID function does not repeat within a reasonble number of iterations", function() {
        it("Must not have the same value twice", function(done) {
            this.timeout(10000);
            let map = new Map();
            const iterations = 1000000;
            for (let i=0; i < iterations; i++) {
                const uuid = uuidv4();
                assert.equal(true, validator.isUUID(uuid), "Is not a UUID 4 compliant value.");
                assert.equal(false, map.has(uuid));

                // add to the map
                map.set(uuid, uuid);
                
            }

            console.log("map.length: ", map.size);
            assert.ok(iterations, map.length, "Map must contain the same number of items as indicated:  ", iterations);
            done();
        });
    });
})