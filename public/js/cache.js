const NodeCache = require("node-cache");

const myCache = new NodeCache({
    stdTTL: 0,
    checkperiod: 0,
    maxkey: -1
});

const cache = {
    /* Creating a new cache object. */

    saveKey: function (key, obj, ttl) {
        success = myCache.set(key, obj, ttl || 0);
    },

    getKey: function (key) {
        if (myCache.has(key)) return myCache.get(key);
        return null;
    },

    //TODO: check if this works in case only part of the keys are found.
    getKeys: function (keys) {
        value = myCache.mget(keys);
        value ? value : null;
    },

    has: function (key) {
        return myCache.has(key);
    },

    flushAll: function () {
        myCache.flushAll();
    },

    printCache: function () {
        console.log(myCache.keys());
    }
}

module.exports = {
    cache
}