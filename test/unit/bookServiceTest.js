const assert = require('assert');
const inMemoryBookRepository = require('../../src/repositories/inMemoryBookRepository')();
const bookService = require('../../src/services/bookService')(inMemoryBookRepository);

describe('Book service', () => {
  it('should add slug', async () => {
    // given
    const book = {
      title: 'JavaScript in Action',
      authors: ['James Smith', 'Kate Donovan'],
      isbn: '0123456789',
      description: 'The ultimate JS book!',
    };

    // when
    bookService.createOrUpdate(book);

    // then
    assert.deepStrictEqual(await inMemoryBookRepository.findOne(book.isbn), { slug: 'javascript-in-action', ...book });
  });
});
