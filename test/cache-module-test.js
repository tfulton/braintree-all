const assert = require("assert");
const webhooksCache = require("../utils/cache");

describe("Webhooks Cache Test", function () {

    beforeEach("getting a handle to the webhooks cache", function () {
        webhooksCache.removeAll();
    });

    describe("Non string key", function () {
        it("should throw an error with a non string key", function () {
            assert.throws(() => webhooksCache.addValue(1, { value: "whatevs" }), Error, "Error was not thrown.");
        })
    });

    describe("Get an object value.", function () {
        const key = "myKey";
        const obj = {
            id: 1,
            value: "a value"
        };

        it("should return the object", function () {
            webhooksCache.addValue(key, obj);
            const newObj = webhooksCache.getValue(key);
            assert.equal(obj.id, newObj.id, "id doesn't match");
            assert.equal(obj.value, newObj.value, "value doesn't match");
        })
    });

    describe("Get all the values in the cache.", function () {
        const keys = ["one", "two", "three", "four", "five"];

        console.log("setting the keys.");
        let values = [];
        for (const key of keys) {
            const value = key + "_value";
            values.push(value);

            console.log("key: ", key);
            console.log("value: ", value);

            webhooksCache.addValue(key, value);
        }

        console.log("getting the values");
        const retrievedVals = webhooksCache.getAllValues();

        // confirm that each value exists in the results
        it("should contain all of our values", function () {
            for (const val of values) {
                const index = retrievedVals.indexOf(val);
                const newVal = retrievedVals[index];

                console.log("val: ", val);
                console.log("newVal: ", newVal);

                assert.equal(val, newVal, "value does not exist or match");
            }
        });
    });

    describe("Flush the cache.", function () {

        // check that the values are in there
        it("should have the values we just added", function () {
            // put some values in the cache
            const count = 10000;
            for (var i = 0; i < count; i++) {
                webhooksCache.addValue(i + "", "value_" + i);
            }

            const stats = webhooksCache.cacheStats();
            const values = webhooksCache.getAllValues();
            assert.equal(stats.keys, values.length, "not the same number of values that we were expecting");
            assert.equal(stats.keys, count, "stats should equal the number of items we just added");
        });

        // flush and confirm
        it("should no longer have any values", function () {
            webhooksCache.removeAll();
            const stats = webhooksCache.cacheStats();
            assert.equal(0, stats.keys, "we were expecting zero values");
        })
    });
})