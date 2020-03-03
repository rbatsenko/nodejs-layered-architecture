const httpClient = require('supertest');
const app = require('../../src/app');

describe('Book catalog', () => {
  it('should support CRUD lifecycle', async () => {
    const db = await require('../../src/connection');
    const request = httpClient(app(db));

    const createResult = await request
      .post('/book')
      .send({
        title: 'JavaScript in Action',
        authors: ['James Smith', 'Kate Donovan'],
        isbn: '0123456789',
        description: 'The ultimate JS book!',
      })
      .set('Content-Type', 'application/json')
      .expect(302);

    await request
      .get(createResult.header.location)
      .set('Accept', 'application/json')
      .expect(200, {
        title: 'JavaScript in Action',
        slug: 'javascript-in-action',
        authors: ['James Smith', 'Kate Donovan'],
        isbn: '0123456789',
        description: 'The ultimate JS book!',
      });
  });
});
