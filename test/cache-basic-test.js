const assert = require("assert");
const NodeCache = require("node-cache");


describe('Cache Test', function () {
    let myCache;

    before("setting up the cache", function () {
        console.log("create a new cache.");
        myCache = new NodeCache();
    });

    beforeEach("flush the cache", function () {
        console.log("flushing the cache.");
        myCache.flushAll();

    });

    after("close the cache.", function () {
        console.log("close the cache.");;
        myCache.close();
    });

    describe("Single item", function () {
        it("should set and get a single item from the cache and compare.", function () {

            const key = "myKey";
            const value = "simple string value";

            console.log("seting the value into cache.");
            myCache.set(key, value);

            console.log("getting the value from cache.");

            let retrieved = myCache.get(key);
            assert.equal(value, retrieved);
        })
    });

    describe("Object value", function () {
        it("should set/get an object and compare values.", function () {
            const key = "myKey";
            const obj = {
                id: 123,
                value: "my value is here"
            }

            console.log("seting the obj into cache.");
            myCache.set(key, obj);

            console.log("getting the obj from cache.");

            let retrieved = myCache.get(key);
            assert.equal(obj.id, retrieved.id);
            assert.equal(obj.value, retrieved.value);
            // assert.equal(obj, retrieved);
        });
    });

    describe("Mulitple simple values", function () {
        it("should set/get of multiple simple values.", function () {

            const keys = ["one", "two", "three", "four", "five"];
            let value = "value_";

            console.log("Setting the keys.");
            for (var key of keys) {
                myCache.set(key, value + key);
            }

            for (const key of keys) {
                let retreived = myCache.get(key);
                console.log("retreived: ", retreived);
                assert.equal(value + key, retreived);
            }
        });
    });

    describe("Multiple object values", function () {
        it("should set/get multiple object type values", function () {

            const keys = ["one", "two", "three", "four", "five"];
            function generateObj() {
                return {
                    id: null,
                    value: "value_"
                }
            };

            console.log("setting the keys.");
            let id = 1;
            for (const key of keys) {
                let obj = generateObj();
                obj.id = id;
                obj.value = obj.value + key;

                console.log("key: ", key);
                console.log("obj: ", obj);

                myCache.set(key, obj);
                id++;
            }

            console.log("getting the keys")
            let newId = 1;
            for (const key of keys) {
                let cacheObj = myCache.get(key);

                console.log("retreived using key: ", key);
                console.log("retreived: ", cacheObj);

                assert.equal(newId, cacheObj.id);
                assert.equal("value_" + key, cacheObj.value);
                newId++;
            }
        });
    });
});