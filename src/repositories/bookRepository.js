const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/booksapi';

const booksPromise = MongoClient
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => client.db().collection('books'));

module.exports = {
  async createOrUpdate(book) {
    const books = await booksPromise;

    await books.updateOne({ isbn: book.isbn }, { $set: book }, { upsert: true });
  },
  async findOne(isbn) {
    const books = await booksPromise;
    const book = await books.findOne({ isbn }, { projection: { _id: false } });
    return book;
  },
};
