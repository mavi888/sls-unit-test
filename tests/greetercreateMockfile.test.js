'use strict';

const greeter = require('../source/greeter');
jest.mock('../source/dynamoDBConnector');

describe('sayHelloAndRecord', () => {
    test('name and save it', async () => {
        const greet = await greeter.sayHelloAndRecord('Marcia');
        expect(greet).toBe('Hello Marcia');
      });
});

describe('getGreeting', () => {
    test('get greeting', async () => {
        const result = await greeter.wasGreeted('Marcia');  
        expect(result).toBe(true)
      });
});