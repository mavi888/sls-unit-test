'use strict';

const APP_ROOT = '../../source';
const _ = require('lodash');

function viaHandler(event, functionName) {
    const handler = require(`${APP_ROOT}/handler`);
    var context = {};
    var callback = function(err, response) {
        if (err) {
            reject(err);
        } else {
            let contentType = _.get(
                response,
                'headers.Content-Type',
                'application/json'
            );
            if (response.body && contentType === 'application/json') {
                response.body = JSON.parse(response.body);
            }

            resolve(response);
        }
    };
    return handler[functionName](event, context, callback);
}

let invokeGetHello = inputName => {
    let event = {
        queryStringParameters: {
            name: inputName
        }
    };
    return viaHandler(event, 'hello');
};

let invokeGetMoi = inputName => {
    let event = {
        queryStringParameters: {
            name: inputName
        }
    };
    return viaHandler(event, 'moi');
};

let invokeWasGreeted = inputName => {
    let event = {
        queryStringParameters: {
            name: inputName
        }
    };
    return viaHandler(event, 'wasGreeted');
};

module.exports = {
    invokeGetHello,
    invokeGetMoi,
    invokeWasGreeted
}