'use strict';

const greeter = require('../source/greeter');

describe('sayHello', () => {
    test('Undefined name greet', () => {
        const greet = greeter.sayHello();
        expect(greet).toBe('Hello World!');
    });

    test('Empty name greet', () => {
        const greet = greeter.sayHello('');
        expect(greet).toBe('Hello World!');
    });

    test('Null name greet', () => {
        const greet = greeter.sayHello(null);
        expect(greet).toBe('Hello World!');
    });

    test('With a name', () => {
        const greet = greeter.sayHello('Marcia');
        expect(greet).toBe('Hello Marcia');
    });
});