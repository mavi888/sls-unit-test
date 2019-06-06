'use strict';

const databaseManager = require('./dynamoDBPort');

module.exports.sayHello = name => {
    if (name !== undefined && name !== null && name !== '') {
        return `Hello ${name}`;
    } else {
        return 'Hello World!';
    }
}

module.exports.sayHelloAndRecord = async name => {
    if (name !== undefined && name !== null && name !== '') {
        await recordGreeting(name);
    }
    return this.sayHello(name);
}

async function recordGreeting(name) {
    const item = {
        name: name,
        timestamp: Date.now()
    };

    return await databaseManager.saveItem(item);
}

module.exports.wasGreeted = async name => {
    const item = await databaseManager.getItem(name);
    return (item !== undefined) ? true : false
}