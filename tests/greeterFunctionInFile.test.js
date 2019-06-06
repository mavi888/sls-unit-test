'use strict';

const greeter = require('../source/greeter');
const databaseManagerMock = require('../source/dynamoDBPort');


describe('sayHelloAndRecord', () => {
    test('With a name', () => {
        databaseManagerMock.saveItem = jest.fn();

        return greeter.sayHelloAndRecord('Juan').then(greet => {
            expect(databaseManagerMock.saveItem).toBeCalledTimes(1);
            expect(greet).toBe('Hello Juan');
        });
    });
});

describe('getGreeting', () => {
    test('get greeting', async () => {
        const item = {
            name: 'Kilo',
            timestamp: Date.now()
        };
        databaseManagerMock.getItem = jest.fn().mockReturnValue(item);

        const result = await greeter.wasGreeted('Kilo');
        expect(result).toBe(true);
    });

    test('was greeted non existing name', async () => {       
        databaseManagerMock.getItem = jest.fn().mockReturnValue(undefined);

        const result = await greeter.wasGreeted('Kilo');
        expect(result).toBe(false);
    });
});