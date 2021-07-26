const NodeCache = require("node-cache");
const assert = require("assert");
const webhooksCache = new NodeCache({ stdTTL: 3600 });

const addValue = function (key, value) {

    if (typeof key === 'string' || key instanceof String) {
        webhooksCache.set(key, value);
    }
    else {
        throw new Error("Key must be a string.");
    }

    return;
}

const getValue = function (key) {

    const value = webhooksCache.get(key);
    if (value) { return value; }
    else { return null; }
}

const getAllValues = function () {
    const keys = webhooksCache.keys();
    if (keys) {
        let values = [];
        for (const key of keys) {
            values.push(webhooksCache.get(key));
        }

        assert(keys.length, values.length, "Values length does not equal keys length.");
        return values;
    }
    else {
        return [];
    }
}

const getValuesWithKeys = function () {
    const keys = webhooksCache.keys();
    if (keys) {
        let values = [];
        for (const key of keys) {
            const obj = {
                receivedAt: key,
                payload: webhooksCache.get(key)
            }
            values.unshift(obj);
        }

        assert(keys.length, values.length, "Values length does not equal keys length.");
        return values;
    }
    else {
        return [];
    }
}

const removeValue = function (key) {
    if (webhooksCache.has(key)) {
        webhooksCache.del(key);
    }

    return;
}

const removeAll = function() {
    webhooksCache.flushAll();
}

const cacheStats = function() {
    return webhooksCache.getStats();
}

module.exports = {
    addValue,
    getValue,
    getAllValues,
    getValuesWithKeys,
    removeValue,
    removeAll,
    cacheStats
}