'use strict';

const AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient();

module.exports.saveItem = async params => {
    return await dynamo
        .put(params)
        .promise();
}

module.exports.getItem = async params => {
    return await dynamo
        .get(params)
        .promise()
        .then(result => {
            return result.Item;
        });
}
