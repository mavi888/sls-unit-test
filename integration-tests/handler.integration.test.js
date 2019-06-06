'use strict';

const init = require('./utils/init');
const steps = require('./utils/steps');
const tearDown = require('./utils/tearDown')

describe('When we invoke the hello function', () => {  
    test('With a name', async () => {
        var result =  await steps.invokeGetHello('Marcia');
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe('Hello Marcia');
    });
});

describe('When we invoke the moi function', () => {
    beforeAll(() => {
        init();
      });

    test('With a name', async () => {
        var result = await steps.invokeGetMoi('Marcia');
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe('Hello Marcia')
    });

    afterAll(async () => {
        await tearDown.removeDataFromTable('Marcia');
    })
});


describe('When we invoke the greet function with a name it exists', () => {
    beforeAll(async () => {
        init();
        await steps.invokeGetMoi('Marcia')
      });

      test('With a name that exists', async () => {
        var result = await steps.invokeWasGreeted('Marcia');
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe('Greet found')
    });

    afterAll(async () => {
        await tearDown.removeDataFromTable('Marcia');
    })
})


describe('When we invoke the greet function with a name it doesnt exists', () => {
    beforeAll(async () => {
        init();
      });

      test('With a name that doesnt exists', async () => {
        var result = await steps.invokeWasGreeted('Juan');
        expect(result.statusCode).toBe(404);
        expect(result.body).toBe('Greet not found')
    });
})