'use strict';

const init = require('./utils/init');
const steps = require('./utils/steps');
const tearDown = require('./utils/tearDown')

const axios = require('axios');

describe('When we invoke the hello API', () => {  
    beforeAll(() => {
        init();
      });

    test('With a name', async () => {
        const response = await axios.get(process.env.BASE_URL + 'hello?name=Marcia');
        expect(response.status).toBe(200);
        expect(response.data).toBe('Hello Marcia');
    });

    test('Without name', async () => {
        const response = await axios.get(process.env.BASE_URL + 'hello');
        expect(response.status).toBe(200);
        expect(response.data).toBe('Hello World!');
    });
});


describe('When we invoke the moi API', () => {
    beforeAll(() => {
        init();
      });

    test('With a name', async () => {
        const response = await axios.get(process.env.BASE_URL + 'moi?name=Marcia');
        expect(response.status).toBe(200);
        expect(response.data).toBe('Hello Marcia')
    });

    test('Without name', async () => {
        const response = await axios.get(process.env.BASE_URL + 'moi');
        expect(response.status).toBe(200);
        expect(response.data).toBe('Hello World!');
    });

    afterAll(async () => {
        await tearDown.removeDataFromTable('Marcia');
    })
});

describe('When we invoke the greet API with a name it exists', () => {
    beforeAll(async () => {
        init();
        await steps.invokeGetMoi('Marcia')
      });

      test('With a name that exists', async () => {
        const response = await axios.get(process.env.BASE_URL + 'greet?name=Marcia');
        expect(response.status).toBe(200);
        expect(response.data).toBe('Greet found')
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
        try {
            await axios.get(process.env.BASE_URL + 'greet?name=Juan');
        } catch (error) {         
            expect(error.response.status).toBe(404);
            expect(error.response.data).toBe('Greet not found')
        }
    });
})