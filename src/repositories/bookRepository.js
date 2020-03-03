module.exports = db => {
  const books = db.collection('books');

  return {
    getList: async () => books.find({}).toArray(),

    createOrUpdate: async book => {
      await books.updateOne({ isbn: book.isbn }, { $set: book }, { upsert: true });
    },

    findOne: async isbn => {
      const book = await books.findOne({ isbn }, { projection: { _id: false } });
      return book;
    },
  };
};
