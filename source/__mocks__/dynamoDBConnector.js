'use strict';

module.exports.saveItem = params => {
    return Promise.resolve();
}

module.exports.getItem = params => {
    const item = {
        name: params.Key.name,
        timestamp: Date.now()
    };

    return Promise.resolve(item);
}