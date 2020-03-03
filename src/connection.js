const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI || 'mongodb://localhost:27017/booksapi';

const dbPromise = MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(client =>
  client.db(),
);

module.exports = dbPromise;
