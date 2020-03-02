const assert = require('assert');
const bookControllerFactory = require('../../src/controllers/bookController');

describe('Book controller', () => {
  it('create or update happy path', async () => {
    // given
    const req = {
      body: {
        isbn: 'ISBN',
      },
    };
    const res = {
      redirect(url) {
        res.redirect.invokedWith = url;
      },
    };
    const bookService = {
      // eslint-disable-next-line no-empty-function
      async createOrUpdate() {},
    };
    const bookController = bookControllerFactory({ bookService });

    // when
    await bookController.createOrUpdate(req, res);

    // then
    assert.deepStrictEqual(res.redirect.invokedWith, '/book/ISBN');
  });
});
